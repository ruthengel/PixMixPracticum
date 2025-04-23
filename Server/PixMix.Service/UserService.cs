using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PixMix.Core.IRepositories;
using PixMix.Core.IServices;
using PixMix.Core.Models;
using PixMix.Core.ModelsDTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<List<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<string> RegisterUserAsync(UserRegisterDTO userRegisterDTO)
        {
            var item = await _userRepository.GetByEmailAsync(userRegisterDTO.Email);
            if (item != null)
                return null;
            var user = _mapper.Map<User>(userRegisterDTO);
            user.Role = "User";
            user.CreatedAt = DateTime.Now;
            var createdUser = await _userRepository.AddAsync(user);
            var token = GenerateJwtToken(createdUser.Id, createdUser.Name, createdUser.Email, createdUser.Role);
            return token;
        }

        public async Task<string> LoginUserAsync(UserLoginDTO userLoginDTO)
        {

            var user = await _userRepository.GetByEmailAsync(userLoginDTO.Email);
            if (user == null || user.Password != userLoginDTO.Password)
            {
                return null;
            }
            var token = GenerateJwtToken(user.Id, user.Name, user.Email, user.Role);
            return token;
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<string> UpdateUserAsync(int id, UserUpdateDTO userUpdateDTO)
        {
            var userById = await _userRepository.GetByIdAsync(id);
            if (userById == null)
                return null;
            var user = _mapper.Map<User>(userUpdateDTO);
            user.Id = id;
            user.Role = userById.Role;
            var updatedUser = await _userRepository.UpdateAsync(user);
            return GenerateJwtToken(updatedUser.Id,updatedUser.Name,updatedUser.Email,updatedUser.Role);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return false;
            }

            await _userRepository.DeleteAsync(user);
            return true;
        }

        public string GenerateJwtToken(int userId, string username, string email, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Jwt_Key")));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            };
            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("Jwt_Issuer"),
                audience: Environment.GetEnvironmentVariable("Jwt_Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(60 * 24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
