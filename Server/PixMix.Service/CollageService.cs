
using AutoMapper;
using PixMix.Core.IRepositories;
using PixMix.Core.IServices;
using PixMix.Core.Models;
using PixMix.Core.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Service
{
    public class CollageService:ICollageService
    {
        private readonly ICollageRepository _collageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public CollageService(ICollageRepository collageRepository, IUserRepository userRepository, IMapper mapper)
        {
            _collageRepository = collageRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<Collage> AddCollageAsync(CollageDTO collageDTO)
        {
            var user = await _userRepository.GetByIdAsync(collageDTO.UserId);
            if (user == null)
            {
                return null;
            }
            var collage = _mapper.Map<Collage>(collageDTO);
            collage.CreatedAt = DateTime.Now;
            return await _collageRepository.AddCollageAsync(collage);
        }

        public async Task<List<Collage>> GetAllCollagesByUserIdAsync(int userId)
        {
            return await _collageRepository.GetAllCollagesByUserIdAsync(userId);
        }

        public async Task<Collage> GetCollageByIdAsync(int collageId)
        {
            return await _collageRepository.GetCollageByIdAsync(collageId);
        }

        public async Task<Collage> UpdateCollageAsync(int collageId, CollageDTO collageDTO)
        {
            var collage = await _collageRepository.GetCollageByIdAsync(collageId);
            if (collage == null)
            {
                return null;
            }

            collage.Name = collageDTO.Name;
            collage.UserId = collageDTO.UserId;
            collage.UpdatedAt = DateTime.Now;
            return await _collageRepository.UpdateCollageAsync(collage);
        }

        public async Task<bool> DeleteCollageAsync(int collageId)
        {
            return await _collageRepository.DeleteCollageAsync(collageId);
        }

    }
}
