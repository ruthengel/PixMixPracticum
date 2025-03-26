using PixMix.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core.IRepositories
{
    public interface IImageRepository
    {
        Task<Image> AddImageAsync(Image image);
        Task<Image> GetImageByIdAsync(int id);
        Task<List<Image>> GetImagesByCollageIdAsync(int collageId);
        Task<Image> UpdateImageAsync(Image image);
        Task<bool> DeleteImageAsync(int id);
    }
}
