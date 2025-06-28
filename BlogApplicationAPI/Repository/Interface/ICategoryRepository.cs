using BlogApplicationAPI.Models.Domain;

namespace BlogApplicationAPI.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);

    }
}
