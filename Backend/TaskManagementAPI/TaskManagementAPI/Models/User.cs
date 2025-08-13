using TaskManagement.Common.ContractModels;

namespace TaskManagementAPI.Models;

public class User : IUser
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; } = "USER";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string PasswordSalt { get; internal set; }

    public static implicit operator User(UserEntity entity)
    {
        return new User
        {
            Id = entity.Id,
            Username = entity.Username,
            Email = entity.Email,
            PasswordHash = entity.PasswordHash,
            Role = entity.Role,
            CreatedAt = entity.CreatedAt,
            PasswordSalt = entity.PasswordSalt
        };
    }

    public static implicit operator UserEntity(User user)
    {
        return new UserEntity
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            PasswordHash = user.PasswordHash,
            Role = user.Role,
            CreatedAt = user.CreatedAt,
            PasswordSalt = user.PasswordSalt
        };
    }
}