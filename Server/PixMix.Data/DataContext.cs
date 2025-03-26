using Microsoft.EntityFrameworkCore;
using PixMix.Core.Models;
using PixMix.Core.IData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PixMix.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Collage> Collages { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseMySQL("server=bejm7ai6ctqtdbtzeutl-mysql.services.clever-cloud.com;database=bejm7ai6ctqtdbtzeutl;user=uarm8rtw9hcjv7be;password=X7EK8cDP9ICq5dzQktLn;");
        //}
        

    }
}
