using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ConnectFarmer.Database.Models
{
    public partial class ConnectFarmersContext : DbContext
    {
        public ConnectFarmersContext()
        {
        }

        public ConnectFarmersContext(DbContextOptions<ConnectFarmersContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bid> Bids { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductTraded> ProductTradeds { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.;Database=ConnectFarmers;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Bid>(entity =>
            {
                entity.HasKey(e => e.SysSerial);

                entity.ToTable("Bid");

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BidDate).HasColumnType("datetime");

                entity.Property(e => e.Time).HasColumnType("datetime");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.SysSerial);

                entity.ToTable("Product");

                entity.Property(e => e.Area).HasMaxLength(50);

                entity.Property(e => e.Category).HasMaxLength(50);

                entity.Property(e => e.City).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.District).HasMaxLength(50);

                entity.Property(e => e.Expired).HasColumnType("datetime");

                entity.Property(e => e.Latitude).HasColumnType("decimal(12, 6)");

                entity.Property(e => e.Longitude).HasColumnType("decimal(12, 6)");

                entity.Property(e => e.MinBidAmount).HasColumnType("decimal(16, 2)");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Remarks).HasMaxLength(250);

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.Property(e => e.Weight).HasColumnType("decimal(16, 2)");
            });

            modelBuilder.Entity<ProductTraded>(entity =>
            {
                entity.HasKey(e => e.SysSerial);

                entity.ToTable("ProductTraded");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.SysSerial);

                entity.ToTable("User");

                entity.Property(e => e.ActivationCode)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.LoginId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OauthKey)
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("OAuthKey");
            });

            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(e => e.SysSerial);

                entity.ToTable("UserProfile");

                entity.Property(e => e.Contact)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Image)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nic)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("NIC");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
