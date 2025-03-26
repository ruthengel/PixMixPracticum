using Microsoft.EntityFrameworkCore;
using PixMix.Core.IRepositories;
using PixMix.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Data.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly DataContext _context;

        public ImageRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<Image> GetImageByIdAsync(int id)
        {
            return await _context.Images.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<List<Image>> GetImagesByCollageIdAsync(int collageId)
        {
            return await _context.Images
                .Where(img => img.CollageId == collageId)
                .ToListAsync();
        }

        public async Task<Image> AddImageAsync(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<Image> UpdateImageAsync(Image image)
        {
            _context.Images.Update(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<bool> DeleteImageAsync(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
                return false;

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
