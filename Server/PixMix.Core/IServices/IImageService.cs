using PixMix.Core.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core.IServices
{
    public interface IImageService
    {
        Task<ImageDTO> GetImageByIdAsync(int id);
        Task<List<ImageDTO>> GetImagesByCollageIdAsync(int collageId);
        Task<ImageDTO> AddImageAsync(ImageDTO imageDto);
        Task<ImageDTO> UpdateImageAsync(int id, ImageDTO imageDto);
        Task<bool> DeleteImageAsync(int id);
    }
}
