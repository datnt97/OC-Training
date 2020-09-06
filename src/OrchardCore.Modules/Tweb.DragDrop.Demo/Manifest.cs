using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "Drag and Drop Demo",
    Author = "TMT Solutions - Datnt",
    Website = "https://tmtsofts.com",
    Version = "1.0.0",
    Description = "Drag and Drop Demo module for drag and drop content items in the landing page editor.",
    Category = "Training",
    Dependencies = new []
    {
        "Lombiq.VueJs",
        //"OrchardCore.ContentTypes"
    }
)]



