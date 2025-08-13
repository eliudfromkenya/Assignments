namespace TaskManagement.Common.ContractModels
{
    public interface IUser
    {
        DateTime CreatedAt { get; set; }
        string Email { get; set; }
        int Id { get; set; }
        string PasswordHash { get; set; }
        string Role { get; set; }
        string Username { get; set; }
    }
}