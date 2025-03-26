using PixMix.Core.Models;
using PixMix.Core.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core.IServices
{
    public interface ICollageService
    {
        Task<List<Collage>> GetAllCollagesByUserIdAsync(int userId);
        Task<Collage> GetCollageByIdAsync(int collageId);
        Task<Collage> AddCollageAsync(CollageDTO collage);
        Task<Collage> UpdateCollageAsync(int collageId, CollageDTO collage);
        Task<bool> DeleteCollageAsync(int collageId);
    }
}
