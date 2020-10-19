using System;
using System.Collections.Generic;
using System.Text;
using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;
using OrchardCore.Flows.Models;
using OrchardCore.Media.Fields;

namespace Tweb.Boxes.Models
{
    public class Product : ContentPart
    {
        public MediaField Image { get; set; }
        public NumericField Price { get; set; }

        public BagPart Box1 { get; set; }
    }
}
