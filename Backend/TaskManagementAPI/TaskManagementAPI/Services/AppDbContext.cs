using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Entities;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services;

public class AppDbContext : DbContext
{
    public DbSet<TaskEntity> Tasks { get; set; }
    public DbSet<UserEntity> Users { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}