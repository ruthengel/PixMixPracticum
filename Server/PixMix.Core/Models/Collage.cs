using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Core.Models
{
    public class Collage
    {
        public int Id { get; set; }       
        public int UserId { get; set; }    
        public string CollageUrl { get; set; }
        public string Name { get; set; }   
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; } 
        public List<Image> Images { get; set; }

    }
}
