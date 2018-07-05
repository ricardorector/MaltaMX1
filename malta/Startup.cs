using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(malta.Startup))]
namespace malta
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
