using API.Entites;

namespace API.Interfaces
{
    public interface ITokenServices
    {
        public string CreateToken(AppUser user);
    }
}
