namespace HolzraumCatch.Services.ModelDataUtils
{
    public class ModelDataProperty
    {
        public string name { get; set; }
        public string type { get; set; }
        public string label { get; set; }
        public int? order { get; set; }
        public bool visible { get; set; }

        public sealed class PropertyTypes
        {
            public static readonly string Text = "Text";
            public static readonly string Number = "Number";
            public static readonly string Date = "Date";
        }
    }
}