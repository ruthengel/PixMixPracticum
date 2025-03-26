using PixMix.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core.IRepositories
{
    public interface ICollageRepository
    {
        Task<List<Collage>> GetAllCollagesByUserIdAsync(int userId);
        Task<Collage> GetCollageByIdAsync(int collageId);
        Task<Collage> AddCollageAsync(Collage collage);
        Task<Collage> UpdateCollageAsync(Collage collage);
        Task<bool> DeleteCollageAsync(int collageId);
    }
}
