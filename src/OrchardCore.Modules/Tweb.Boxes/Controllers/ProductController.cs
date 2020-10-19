using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraphQL;
using Microsoft.AspNetCore.Mvc;
using OrchardCore;
using Tweb.Boxes.Models;

namespace Tweb.Boxes.Controllers
{
    public class ProductController : Controller
    {
        private readonly IOrchardHelper _orchardHelper;

        public ProductController(IOrchardHelper orchardHelper)
        {
            _orchardHelper = orchardHelper;
        }

        [HttpPost("/api/product/{productId}")]
        public async Task<ObjectResult> GetProductAsync(string productId)
        {
            var product = await _orchardHelper.GetContentItemByIdAsync(productId);

            if (product == null)
            {
                return NotFoundObjectResult(null);
            }

            var productPart = product.As<Product>();

            // you'll get exceptions if any of these Fields are null
            // the null-conditional operator (?) should be used for any fields which aren't required
            return new ObjectResult(new
            {
                Image = productPart.Image.Paths.FirstOrDefault(),
                Price = productPart.Price.Value,
            });
        }

        private ObjectResult NotFoundObjectResult(object p)
        {
            throw new NotImplementedException();
        }
    }
}
