using System.ComponentModel.DataAnnotations;

namespace API.Entites
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }
    }
}
