//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System.Text.Json.Serialization;
//using System.Text.Json;


//namespace PixMix.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ChatBot : ControllerBase
//    {
//        private readonly HttpClient client = new HttpClient();

//        [HttpPost]
//        public async Task<IActionResult> Post([FromBody] ChatPromptRequest request)
//        {
//            try
//            {
//                // הגדרת תוכן מערכת שמכוון את ה-AI לתת המלצה על רקעים
//                var systemContent = @"
//אתה עוזר למשתמש לבחור רקע מתאים לעיצוב קולאז'. אלו הרקעים הקיימים:
//1. ""חגיגי ורוד"" – רקע ורוד עם קונפטי, מתאים לעד 4 תמונות.
//2. ""קלאסי לבן"" – רקע לבן עם מסגרת אפורה, מתאים ל-1-3 תמונות, סגנון אלגנטי.
//3. ""טבע ירוק"" – רקע עם עלים ועצים, מתאים בדיוק ל-2 תמונות, אווירה רגועה.
//4. ""מסיבת ילדים"" – רקע צבעוני עם בלונים, מתאים ל-3-6 תמונות, אווירה שמחה ועליזה.

////בהתאם לתיאור של המשתמש, המלץ על רקע מתאים מתוך הרשימה.";

//                // הוספת הודעת מערכת בראש רשימת ההודעות
//                var messages = new List<ChatMessage>
//                {
//                    new ChatMessage { Role = "system", Content = systemContent }
//                };

//                messages.AddRange(request.Messages);

//                var payload = new
//                {
//                    model = "gpt-4o-mini",
//                    messages = messages
//                };

//                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//                {
//                    Content = JsonContent.Create(payload)
//                };

//                httpRequest.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPENAI_API_KEY")}");

//                var response = await client.SendAsync(httpRequest);
//                if (!response.IsSuccessStatusCode)
//                {
//                    var error = await response.Content.ReadAsStringAsync();
//                    throw new Exception($"OpenAI Error: {response.StatusCode} - {error}");
//                }

//                var json = await response.Content.ReadAsStringAsync();
//                var doc = JsonDocument.Parse(json);
//                var content = doc.RootElement
//                    .GetProperty("choices")[0]
//                    .GetProperty("message")
//                    .GetProperty("content")
//                    .GetString();

//                return Ok(new { reply = content });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Error: {ex.Message}");
//                return StatusCode(500, "אירעה שגיאה בעיבוד הבקשה.");
//            }
//        }
//    }

//    public class ChatPromptRequest
//    {
//        [JsonPropertyName("messages")]
//        public List<ChatMessage> Messages { get; set; }
//    }

//    public class ChatMessage
//    {
//        [JsonPropertyName("role")]
//        public string Role { get; set; }

//        [JsonPropertyName("content")]
//        public string Content { get; set; }
//    }
//}

// ✅ C# Controller: PixMix.Api.Controllers.ChatBotController
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Net.Http.Headers;

namespace PixMix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBotController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public ChatBotController(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> RecommendBackground([FromBody] ChatPromptRequest request)
        {
            var systemMessage = new ChatMessage
            {
                Role = "system",
                Content = @"
        אתה עוזר למשתמש לבחור רקע מתאים לעיצוב קולאז'. אלו הרקעים הקיימים:
        1. ""חגיגי ורוד"" – רקע ורוד עם קונפטי, מתאים לעד 4 תמונות.
        2. ""קלאסי לבן"" – רקע לבן עם מסגרת אפורה, מתאים ל-1-3 תמונות, סגנון אלגנטי.
        3. ""טבע ירוק"" – רקע עם עלים ועצים, מתאים בדיוק ל-2 תמונות, אווירה רגועה.
        4. ""מסיבת ילדים"" – רקע צבעוני עם בלונים, מתאים ל-3-6 תמונות, אווירה שמחה ועליזה.

        //בהתאם לתיאור של המשתמש, המלץ על רקע מתאים מתוך הרשימה."
            };

            var messages = new List<ChatMessage> { systemMessage };
            messages.AddRange(request.Messages);

            var body = new
            {
                model = "gpt-4o",
                messages = messages
            };

            var req = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = JsonContent.Create(body)
            };

            req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

            var res = await _httpClient.SendAsync(req);
            if (!res.IsSuccessStatusCode)
                return StatusCode((int)res.StatusCode, await res.Content.ReadAsStringAsync());

            var json = await res.Content.ReadAsStringAsync();
            Console.WriteLine(">> JSON response from OpenAI:");
            Console.WriteLine(json);
            var reply = JsonDocument.Parse(json).RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();
            Console.WriteLine(">> Extracted reply:");
            Console.WriteLine(reply);
            return Ok(new { reply });
        }
        //private readonly HttpClient client = new HttpClient();

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] ChatPromptRequest request)
        //{
        //    try
        //    {
        //        var payload = new
        //        {
        //            model = "gpt-4o-mini",
        //            messages = request.Messages
        //        };

        //        var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        //        {
        //            Content = JsonContent.Create(payload)
        //        };

        //        httpRequest.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPENAI_API_KEY")}");

        //        var response = await client.SendAsync(httpRequest);
        //        if (!response.IsSuccessStatusCode)
        //        {
        //            var error = await response.Content.ReadAsStringAsync();
        //            throw new Exception($"OpenAI Error: {response.StatusCode} - {error}");
        //        }

        //        var json = await response.Content.ReadAsStringAsync();
        //        var doc = JsonDocument.Parse(json);
        //        var content = doc.RootElement
        //            .GetProperty("choices")[0]
        //            .GetProperty("message")
        //            .GetProperty("content")
        //            .GetString();

        //        return Ok(new { reply = content });
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error: {ex.Message}");
        //        return StatusCode(500, "אירעה שגיאה בעיבוד הבקשה.");
        //    }
        //}
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
