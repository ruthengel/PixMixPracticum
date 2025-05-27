using Microsoft.AspNetCore.Mvc;
using PixMix.Core.IServices;
using PixMix.Core.ModelsDTO;


namespace PixMix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollageController : ControllerBase
    {
        private readonly ICollageService _collageService;

        public CollageController(ICollageService collageService)
        {
            _collageService = collageService;
        }

        [HttpPost]
        public async Task<IActionResult> AddCollage([FromBody] CollageDTO collageDTO)
        {
            if (collageDTO == null)
            {
                return BadRequest("Invalid data.");
            }
            var collage = await _collageService.AddCollageAsync(collageDTO);
            if (collage == null)
                return NotFound("User not found.");
            return Ok(collage);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllCollagesByUserId(int userId)
        {
            var collages = await _collageService.GetAllCollagesByUserIdAsync(userId);

            if (collages == null || !collages.Any())
            {
                return NotFound("No collages found.");
            }
            return Ok(collages);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCollageById(int id)
        {
            var collage = await _collageService.GetCollageByIdAsync(id);
            if (collage == null)
            {
                return NotFound("Collage not found.");
            }

            return Ok(collage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCollage(int id, [FromBody] CollageDTO collageDTO)
        {
            var updatedCollage = await _collageService.UpdateCollageAsync(id, collageDTO);
            if (updatedCollage == null)
            {
                return NotFound("Collage not found.");
            }
            return Ok(updatedCollage);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollage(int id)
        {
            var result = await _collageService.DeleteCollageAsync(id);

            if (!result)
            {
                return NotFound("Collage not found.");
            }

            return Ok("Collage deleted successfully.");
        }
    }
}
