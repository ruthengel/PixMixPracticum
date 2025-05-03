using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace PixMix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBot : ControllerBase
    {
        private readonly HttpClient client = new HttpClient();

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChatPromptRequest request)
        {
            try
            {
                var payload = new
                {
                    model = "gpt-4o-mini",
                    messages = request.Messages
                };

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(payload)
                };

                httpRequest.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPENAI_API_KEY")}");

                var response = await client.SendAsync(httpRequest);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"OpenAI Error: {response.StatusCode} - {error}");
                }

                var json = await response.Content.ReadAsStringAsync();
                var doc = JsonDocument.Parse(json);
                var content = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                return Ok(new { reply = content });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "אירעה שגיאה בעיבוד הבקשה.");
            }
        }
    }

    public class ChatPromptRequest
    {
        [JsonPropertyName("messages")]
        public List<ChatMessage> Messages { get; set; }
    }

    public class ChatMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}
