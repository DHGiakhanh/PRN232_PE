using Microsoft.EntityFrameworkCore;
using PRM.API.Data;
using PRM.API.Entities;

namespace PRM.API.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly AppDbContext _db;
        public MovieRepository(AppDbContext db)
        {
            _db = db;
        }

        public Task<List<Movie>> GetAllAsync() => _db.Movies.AsNoTracking().ToListAsync();
        public Task<Movie?> GetByIdAsync(Guid id) => _db.Movies.FindAsync(id).AsTask();
        public async Task AddAsync(Movie movie) { await _db.Movies.AddAsync(movie); }
        public Task UpdateAsync(Movie movie) { _db.Movies.Update(movie); return Task.CompletedTask; }
        public Task DeleteAsync(Movie movie) { _db.Movies.Remove(movie); return Task.CompletedTask; }
        public Task SaveChangesAsync() => _db.SaveChangesAsync();
    }
}
