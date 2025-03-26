using Microsoft.EntityFrameworkCore;
using PixMix.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PixMix.Core.IData
{
    public interface IDataContext
    {
       public DbSet<User> Users { get; }
       public DbSet<Image> Images { get; }
       public DbSet<Collage> Collages { get; }
    }
}
