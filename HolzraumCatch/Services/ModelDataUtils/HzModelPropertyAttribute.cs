using System;

namespace HolzraumCatch.Services.ModelDataUtils
{
    [AttributeUsage(AttributeTargets.Property)]
    public class HzModelPropertyAttribute : Attribute
    {
        public int? order { get; private set; } = null;
        public bool visible { get; private set; } = false;
        public string label { get; private set; } = null;

        public HzModelPropertyAttribute(string label, int order, bool visible)
        {
            this.order = order;
            this.visible = visible;
            this.label = label;
        }

        public HzModelPropertyAttribute(int order, bool visible)
        {
            this.order = order;
            this.visible = visible;
        }

        public HzModelPropertyAttribute(bool visible)
        {
            this.visible = visible;
        }
    }
}