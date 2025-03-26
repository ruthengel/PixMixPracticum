using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PixMix.Core.IServices;
using PixMix.Core.ModelsDTO;


namespace PixMix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            if (users.Count == 0)
                return Ok(new { message = "No users found. The system currently has no registered users." });
            return Ok(users);
        }


        [HttpGet("{id}")]
        //[Authorize(Roles = "User")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });
            return Ok(user);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO model)
        {
            var result = await _userService.RegisterUserAsync(model);
            if (result != null)
            {
                return Ok(new { token = result, message = "User added successfully." });
            }
            return BadRequest("Registration failed");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO user)
        {
            var result = await _userService.LoginUserAsync(user);
            if (result != null)
            {
                return Ok(new { token = result, message = "User login successfully." });
            }
            return Unauthorized(new { message = "Invalid login credentials" });
        }


        [HttpPut("update/{id}")]
        //[Authorize(Roles = "User")]
        public async Task<IActionResult> Update(int id, [FromBody] UserUpdateDTO user)
        {
            var result = await _userService.UpdateUserAsync(id, user);
            if (result == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(new {token= result ,message= "User updated successfully." });

        }


        [HttpDelete("delete/{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound(new { message = "User not found" });
            return Ok(new { message = "User deleted successfully" });  // מחזירים הודעת הצלחה למחיקת המשתמש
        }


    }
}
