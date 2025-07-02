using BlogApplicationAPI.Models.Domain;

namespace BlogApplicationAPI.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);

        Task<IEnumerable<Category>> GetAllAsync( string? query = null,string? sortBy = null, string? sortDirection = null,
           int? pageNumber = 1, int? pageSize = 100);

    }
}
