using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using PRM.API.Data;
using PRM.API.DTOs;
using PRM.API.Entities;

namespace PRM.API.Services
{
    public class MovieService : IMovieService
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;
        public MovieService(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MovieDto>> GetAllAsync(string? title, string? genre, string? sortBy, bool asc)
        {
            var query = _db.Movies.AsNoTracking().AsQueryable();
            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(m => m.Title.ToLower().Contains(title.ToLower()));
            if (!string.IsNullOrWhiteSpace(genre))
                query = query.Where(m => (m.Genre ?? "").ToLower().Contains(genre.ToLower()));

            query = sortBy?.ToLower() switch
            {
                "rating" => asc ? query.OrderBy(m => m.Rating) : query.OrderByDescending(m => m.Rating),
                _ => asc ? query.OrderBy(m => m.Title) : query.OrderByDescending(m => m.Title)
            };

            return await query.ProjectTo<MovieDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<MovieDto?> GetByIdAsync(Guid id)
        {
            var entity = await _db.Movies.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
            return entity == null ? null : _mapper.Map<MovieDto>(entity);
        }

        public async Task<MovieDto> CreateAsync(CreateMovieDto dto)
        {
            var entity = _mapper.Map<Movie>(dto);
            entity.Id = Guid.NewGuid();
            await _db.Movies.AddAsync(entity);
            await _db.SaveChangesAsync();
            return _mapper.Map<MovieDto>(entity);
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateMovieDto dto)
        {
            var entity = await _db.Movies.FindAsync(id);
            if (entity == null) return false;
            _mapper.Map(dto, entity);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _db.Movies.FindAsync(id);
            if (entity == null) return false;
            _db.Movies.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
