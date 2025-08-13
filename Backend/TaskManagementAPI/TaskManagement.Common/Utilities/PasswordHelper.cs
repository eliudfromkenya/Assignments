using System.Security.Cryptography;
using System.Text;

namespace TaskManagement.Common.Utilities;
public class PasswordHelper
{
    public static (string Hash, string Salt) HashPassword(string password)
    {
        byte[] saltBytes = new byte[16];
        using RandomNumberGenerator rng = RandomNumberGenerator.Create();

        rng.GetBytes(saltBytes);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 100000, HashAlgorithmName.SHA256);
        byte[] hashBytes = pbkdf2.GetBytes(32); // 256-bit

        string hash = Convert.ToBase64String(hashBytes);
        string salt = Convert.ToBase64String(saltBytes);
        return (hash, salt);
    }

    public static bool VerifyPassword(string password, string storedHash, string storedSalt)
    {
        byte[] saltBytes = Convert.FromBase64String(storedSalt);
        byte[] storedHashBytes = Convert.FromBase64String(storedHash);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 100000, HashAlgorithmName.SHA256);
        byte[] computedHash = pbkdf2.GetBytes(32);
        return CryptographicOperations.FixedTimeEquals(computedHash, storedHashBytes);
    }
}