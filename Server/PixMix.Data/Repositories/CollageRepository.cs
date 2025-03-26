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
    public class CollageRepository : ICollageRepository
    {
        private readonly DataContext _context;

        public CollageRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Collage>> GetAllCollagesByUserIdAsync(int userId)
        {
            return await _context.Collages
                .Where(c => c.UserId == userId)
                //.Include(c => c.Images)
                .ToListAsync();
        }

        public async Task<Collage> GetCollageByIdAsync(int collageId)
        {
            //return await _context.Collages.Include(c => c.Images).FirstOrDefaultAsync(c => c.Id == collageId);
            return await _context.Collages.FirstOrDefaultAsync(c => c.Id == collageId);
        }

        public async Task<Collage> AddCollageAsync(Collage collage)
        {
            await _context.Collages.AddAsync(collage);
            await _context.SaveChangesAsync();
            return collage;
        }

        public async Task<Collage> UpdateCollageAsync(Collage collage)
        {
            _context.Collages.Update(collage);
            await _context.SaveChangesAsync();
            return collage;
        }

        public async Task<bool> DeleteCollageAsync(int collageId)
        {
            var collage = await _context.Collages.FindAsync(collageId);
            if (collage == null)
            {
                return false;
            }

            _context.Collages.Remove(collage);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
