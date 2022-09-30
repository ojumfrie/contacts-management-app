using ContactsManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsManagement.API.Data
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options)
            : base(options)
        { 
        
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
