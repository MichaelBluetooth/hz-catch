namespace HolzraumCatch.Services.ModelDataUtils
{
    public interface IModelDataService
    {
        ModelDataDefinition getModelProperties();
        ModelDataView getView(int importId);
    }
}