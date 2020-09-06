using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using OrchardCore.Modules;

namespace Tweb.DragDrop.Demo
{
    public class Startup : StartupBase
    {
        public Startup()
        {
        }

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            // You can put service configuration here as you would do it in other ASP.NET Core applications. If you
            // don't need it you can skip overriding it.
        }

    }
}
