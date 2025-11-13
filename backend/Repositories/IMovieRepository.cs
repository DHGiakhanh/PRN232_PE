using PRM.API.Entities;

namespace PRM.API.Repositories
{
    public interface IMovieRepository
    {
        Task<List<Movie>> GetAllAsync();
        Task<Movie?> GetByIdAsync(Guid id);
        Task AddAsync(Movie movie);
        Task UpdateAsync(Movie movie);
        Task DeleteAsync(Movie movie);
        Task SaveChangesAsync();
    }
}
