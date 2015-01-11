using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SmileMakersApp.Startup))]
namespace SmileMakersApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
