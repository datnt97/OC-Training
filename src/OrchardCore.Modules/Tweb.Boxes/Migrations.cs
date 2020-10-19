using System;
using System.Collections.Generic;
using System.Text;
using OrchardCore.Autoroute.Models;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Flows.Models;

namespace Tweb.Boxes
{
    public class Migrations : DataMigration
    {
        private readonly IContentDefinitionManager _contentDefinitionManager;
        public Migrations(IContentDefinitionManager contentDefinitionManager)
        {
            _contentDefinitionManager = contentDefinitionManager;
        }

        public int Create()
        {

            //_contentDefinitionManager.AlterTypeDefinition("Product");

            _contentDefinitionManager.AlterTypeDefinition("Product", type => type
                // content items of this type can have drafts
                .Draftable()
                // content items versions of this type have saved
                .Versionable()
                // this content type appears in the New menu section
                .Creatable()
                // permissions can be applied specifically to instances of this type
                .Securable()
            );

            _contentDefinitionManager.AlterTypeDefinition("Product", type => type
                .WithPart("TitlePart")
            );

            _contentDefinitionManager.AlterTypeDefinition("Product", type => type
                .WithPart("AutoroutePart", part => part
                    // sets the position among other parts
                    .WithPosition("2")
                    // sets all the settings on the AutoroutePart
                    .WithSettings(new AutoroutePartSettings { Pattern = "{{ ContentItem | display_text | slugify }}" })
                )
            );

            _contentDefinitionManager.AlterTypeDefinition("Product", type => type
                .WithPart("Product")
            );

            _contentDefinitionManager.AlterPartDefinition("Product", part => part
                .WithField("Image", field => field
                    .OfType("MediaField")
                    .WithDisplayName("Main image")
                )
                .WithField("Price", field => field
                    .OfType("NumericField")
                    .WithDisplayName("Price")
                )
            );

            _contentDefinitionManager.AlterTypeDefinition("Product", type => type
                .WithPart("Box1", part => part
                    .WithPosition("3")
                    .WithSetting(new BagPartSettings
                    {
                        ContainedContentTypes = null,
                        DisplayType = "Box1"
                    }))
            );
            return 1;
        }
    }
}
