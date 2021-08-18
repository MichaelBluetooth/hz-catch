using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;
using HolzraumCatch.Models;

namespace HolzraumCatch.Services.Import
{
    public class ModelDataMap : ClassMap<ModelData>
    {
        public ModelDataMap()
        {
            AutoMap(CultureInfo.CurrentCulture);

            //Set by the service
            Map(m => m.importJobId).Ignore();
            Map(m => m.importJob).Ignore();

            //Mapping where the csv header does not match the model property name or needs help converting the value
            Map(m => m.quantity).Name("qty").TypeConverter<EnsureNumeric>();        //some example csv files have "qty"
            Map(m => m.quantity).Name("quantity").TypeConverter<EnsureNumeric>();   //some example csv files have "quantity"
            Map(m => m.width_rough).TypeConverter<EnsureNumeric>();
            Map(m => m.height_rough).TypeConverter<EnsureNumeric>();
            Map(m => m.length_rough).TypeConverter<EnsureNumeric>();
            Map(m => m.part).Name("no._production");
            Map(m => m.applied_at).Name("p_field_or_factory_applied");
            Map(m => m.weight_lbs).Name("weight_real").TypeConverter<EnsureNumeric>();
            Map(m => m.R_value_per_in).Name("p_r_value").TypeConverter<EnsureNumeric>();
            Map(m => m.panel_assembly_type).Name("pa_panel_type");
            Map(m => m.model).Name("p_model");
            Map(m => m.metal_Connector_Type).Name("p_metalconnector_type");
            Map(m => m.manufacturer).Name("p_manufacturer");
            Map(m => m.databaseid).Name("id");
            Map(m => m.noAssemblyList).Name("no._assemply"); //this typo "assemply" exists in the example .csv data files
            Map(m => m.No_parts_list).Name("no._part");
            Map(m => m.Real_width).Name("width_real").TypeConverter<EnsureNumeric>();;
            Map(m => m.Real_Length).Name("length_real").TypeConverter<EnsureNumeric>();;
            Map(m => m.Real_height).Name("height_real").TypeConverter<EnsureNumeric>();;
            Map(m => m.Real_Vol).Name("volume_real").TypeConverter<EnsureNumeric>();;
            Map(m => m.Round_height).Name("rounding_value_height");
            Map(m => m.Round_length).Name("rounding_value_length");
            Map(m => m.Round_width).Name("rounding_value_width");
            Map(m => m.M_MEP_Trunk_Desc).Name("m_mep_trunk_description");

        }
    }

    public class EnsureNumeric : DefaultTypeConverter
    {
        public override object ConvertFromString(string text, IReaderRow row, MemberMapData memberMapData)
        {
            text = text?.Replace("\"", "");

            double result;
            if (double.TryParse(text, out result))
            {
                return result;
            }
            else
            {
                return null;
            }
        }
    }
}