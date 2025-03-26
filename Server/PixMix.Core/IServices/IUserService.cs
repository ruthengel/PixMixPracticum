using PixMix.Core.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core.IServices
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<string> RegisterUserAsync(UserRegisterDTO userRegisterDTO);
        Task<string> LoginUserAsync(UserLoginDTO userLoginDTO);
        Task<string> UpdateUserAsync(int id, UserUpdateDTO userUpdateDTO);
        Task<bool> DeleteUserAsync(int id);
    }
}
