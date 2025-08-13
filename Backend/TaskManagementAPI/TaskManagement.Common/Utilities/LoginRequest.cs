using TaskManagement.Common.ContractDTOs;

namespace TaskManagement.Common.Utilities
{
    public class LoginRequest
    {
        public string Password { get; set; }
        public string Email { get; set; } = string.Empty;
    }
}
