using PRM.API.DTOs;

namespace PRM.API.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDto>> GetAllAsync(string? title, string? genre, string? sortBy, bool asc);
        Task<MovieDto?> GetByIdAsync(Guid id);
        Task<MovieDto> CreateAsync(CreateMovieDto dto);
        Task<bool> UpdateAsync(Guid id, UpdateMovieDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
