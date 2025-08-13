using TaskManagement.Common.ContractModels;

namespace TaskManagementAPI.Models;

public class UserEntity
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; } = "USER";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string PasswordSalt { get; internal set; }
}