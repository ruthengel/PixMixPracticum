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
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly ICollageRepository _collageRepository;
        private readonly IMapper _mapper;

        public ImageService(IImageRepository imageRepository, ICollageRepository collageRepository, IMapper mapper)
        {
            _imageRepository = imageRepository;
            _collageRepository = collageRepository;
            _mapper = mapper;
        }

        public async Task<ImageDTO> GetImageByIdAsync(int id)
        {
            var image = await _imageRepository.GetImageByIdAsync(id);
            return _mapper.Map<ImageDTO>(image);
        }

        public async Task<List<ImageDTO>> GetImagesByCollageIdAsync(int collageId)
        {
            var images = await _imageRepository.GetImagesByCollageIdAsync(collageId);
            return _mapper.Map<List<ImageDTO>>(images);
        }

        public async Task<ImageDTO> AddImageAsync(ImageDTO imageDto)
        {
            var collage = await _collageRepository.GetCollageByIdAsync(imageDto.CollageId);
            if (collage == null)
                return null;
            var image = _mapper.Map<Image>(imageDto);
            var addedImage = await _imageRepository.AddImageAsync(image);
            return _mapper.Map<ImageDTO>(addedImage);
        }

        public async Task<ImageDTO> UpdateImageAsync(int id, ImageDTO imageDto)
        {
            var existingImage = await _imageRepository.GetImageByIdAsync(id);
            if (existingImage == null)
                throw new Exception("Image Not found.");
            var collage = await _collageRepository.GetCollageByIdAsync(imageDto.CollageId);
            if (collage == null)
                throw new Exception("Collage Not found.");
            _mapper.Map(imageDto, existingImage);
            var updatedImage = await _imageRepository.UpdateImageAsync(existingImage);
            return _mapper.Map<ImageDTO>(updatedImage);
        }

        public async Task<bool> DeleteImageAsync(int id)
        {
            return await _imageRepository.DeleteImageAsync(id);
        }
    }
}
