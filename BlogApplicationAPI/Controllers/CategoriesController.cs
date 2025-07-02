using BlogApplicationAPI.Models.Domain;
using BlogApplicationAPI.Models.DTOs;
using BlogApplicationAPI.Repository.Implementation;
using BlogApplicationAPI.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
            // Map DTO to Domain Model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await categoryRepository.CreateAsync(category);

            // Domain model to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        // GET: https://localhost:7226/api/Categories?query=html&sortBy=name&sortDirection=desc
        [HttpGet]
        public async Task<IActionResult> GetAllCategories( [FromQuery] string? query,[FromQuery] string? sortBy,[FromQuery] string? sortDirection,
            [FromQuery] int? pageNumber,[FromQuery] int? pageSize)
        {
            var caterogies = await categoryRepository.GetAllAsync(query, sortBy, sortDirection, pageNumber, pageSize);

            // Map Domain model to DTO

            var response = new List<CategoryDto>();
            foreach (var category in caterogies)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }

            return Ok(response);
        }


        // GET: https://localhost:7226/api/categories/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var existingCategory = "hii";//await categoryRepository.GetById(id);

            if (existingCategory is null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                //Id = existingCategory.Id,
                //Name = existingCategory.Name,
                //UrlHandle = existingCategory.UrlHandle
            };

            return Ok(response);
        }


    }
}
