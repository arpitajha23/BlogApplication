using BlogApplicationAPI.Data;
using BlogApplicationAPI.Models.Domain;
using BlogApplicationAPI.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BlogApplicationAPI.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

    }
}
