using Microsoft.AspNetCore.Mvc;
// .NET Controller
using Amazon.S3;
using Amazon.S3.Model;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PixMix.Api.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {

        private readonly IAmazonS3 _s3Client;

        public UploadController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "ruthproject",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(30),
                ContentType = "image/png"
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }

        [HttpGet("download-url")]
        public async Task<IActionResult> GetDownloadUrl([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "ruthproject",
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30) 
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }

        [HttpGet("delete-url")]
        public async Task<IActionResult> GetDeleteUrl([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "ruthproject",
                Key = fileName,
                Verb = HttpVerb.DELETE,
                Expires = DateTime.UtcNow.AddMinutes(30)
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
    }
}
