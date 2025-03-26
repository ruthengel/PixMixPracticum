using AutoMapper;
using PixMix.Core.Models;
using PixMix.Core.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserRegisterDTO, User>().ReverseMap();
            CreateMap<UserLoginDTO, User>().ReverseMap();
            CreateMap<UserUpdateDTO, User>().ReverseMap();
            CreateMap<ImageDTO, Image>().ReverseMap();
            CreateMap<CollageDTO, Collage>().ReverseMap();
        }

    }
}
