using Microsoft.AspNetCore.Mvc;
using PixMix.Core.IServices;
using PixMix.Core.ModelsDTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PixMix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> AddImage([FromBody] ImageDTO imageDto)
        {
            var newimage = await _imageService.AddImageAsync(imageDto);
            if (newimage == null)
                return NotFound("Collage not found.");
            return Ok(new { image = newimage, message = "Image added successfully." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImageById(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null)
                return NotFound(new { message = "Image not found" });
            return Ok(image);
        }

        [HttpGet("collage/{collageId}")]
        public async Task<IActionResult> GetImagesByCollageId(int collageId)
        {
            var images = await _imageService.GetImagesByCollageIdAsync(collageId);
            return Ok(images);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateImage(int id, [FromBody] ImageDTO imageDto)
        {
            //var updatedImage = await _imageService.UpdateImageAsync(id, imageDto);
            //if (updatedImage == null)
            //    return NotFound(new { message = "Image not found" });

            try
            {
                var updatedImage = await _imageService.UpdateImageAsync(id, imageDto);
                return Ok(updatedImage);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var result = await _imageService.DeleteImageAsync(id);
            if (!result)
                return NotFound(new { message = "Image not found" });
            return Ok(new { message = "Image deleted successfully" });
        }
    }
}
