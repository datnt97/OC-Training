using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "Boxes",
    Website = "https://tmtsofts.com",
    Version = "1.0.0",
    Description = "Tweb Box module for create, edit content box.",
    Category = "Tweb",
    Dependencies = new[]
    {
        "OrchardCore.Contents"
    }
)]
