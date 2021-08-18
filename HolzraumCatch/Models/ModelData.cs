using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HolzraumCatch.Services.ModelDataUtils;

namespace HolzraumCatch.Models
{
    public class ModelData : ModelBase
    {
        [Required]
        [ForeignKey("importJob")]
        public int importJobId { get; set; }
        public ImportJob importJob { get; set; }

        #region START V1 COLUMNS

        [MaxLength(140)]
        [HzModelProperty(2, true)]
        public string name { get; set; }

        [MaxLength(140)]
        [HzModelProperty("Production No", 3, false)]
        public string part { get; set; }

        [MaxLength(140)]
        [HzModelProperty(0, true)]
        public string material { get; set; }

        [HzModelProperty(4, true)]
        public double? quantity { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Width Rough (in)", 5, true)]
        public double? width_rough { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Height Rough (in)", 6, true)]
        public double? height_rough { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Length Rough (in)", 7, true)]
        public double? length_rough { get; set; }

        [MaxLength(40)]
        public string units { get; set; }

        [MaxLength(140)]
        [HzModelProperty("Panel", 8, true)]
        public string group { get; set; }

        [MaxLength(140)]
        [HzModelProperty("Slice", 9, false)]
        public string sub_group { get; set; }

        [MaxLength(140)]
        [HzModelProperty("Scope", 8, true)]
        public string comment { get; set; }

        [MaxLength(140)]
        public string elementtype { get; set; }

        public int databaseid { get; set; }

        [MaxLength(40)]
        [HzModelProperty(10, false)]
        public string applied_at { get; set; }

        [HzModelProperty("Weight (lbs)", 11, true)]
        public double? weight_lbs { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Assembly Type", 12, false)]
        public string panel_assembly_type { get; set; }

        [HzModelProperty("R Value (US)", 13, false)]
        public double? R_value_per_in { get; set; }

        [MaxLength(80)]
        [HzModelProperty(14, false)]
        public string manufacturer { get; set; }

        [MaxLength(40)]
        [HzModelProperty(15, false)]
        public string metal_Connector_Type { get; set; }

        [MaxLength(40)]
        [HzModelProperty(16, false)]
        public string model { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Function", 1, true)]
        public string function_name { get; set; }

        #endregion START V1 COLUMNS

        #region START V2 COLUMNS

        [MaxLength(40)]
        public string Bolt_diameter { get; set; }

        [MaxLength(40)]
        public string D_Design_Note_1 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_2 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_3 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_4 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_5 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_6 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_7 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_8 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_9 { get; set; }
        [MaxLength(40)]
        public string D_Design_Note_10 { get; set; }

        [MaxLength(40)]
        public string H_Internal_Element_Description_1 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_2 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_3 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_4 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_5 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_6 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_7 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_8 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_9 { get; set; }
        [MaxLength(40)]
        public string H_Internal_Element_Description_10 { get; set; }

        [MaxLength(40)]
        public string Diameter_Real { get; set; }

        [MaxLength(40)]
        public string Global_Coord_of_point_zero_X { get; set; }
        [MaxLength(40)]
        public string Global_Coord_of_point_zero_Y { get; set; }
        [MaxLength(40)]
        public string Global_Coord_of_point_zero_Z { get; set; }

        [MaxLength(140)]
        public string IFC_Type { get; set; }

        [MaxLength(40)]
        public string P_US_Perm_Value { get; set; }

        [MaxLength(40)]
        public string P_Timber_Heart_Spec { get; set; }

        [MaxLength(40)]
        public string P_Connector_Type { get; set; }

        [MaxLength(40)]
        public string P_Finish_Spec { get; set; }

        [MaxLength(40)]
        public string P_Global_Warming_Potential { get; set; }

        [MaxLength(40)]
        public string P_Embodied_Carbon { get; set; }

        [MaxLength(40)]
        public string P_Leadtime { get; set; }

        [MaxLength(40)]
        public string P_Density { get; set; }

        [MaxLength(40)]
        public string P_Perm_Classification { get; set; }

        [MaxLength(40)]
        public string List_weight { get; set; }

        [MaxLength(40)]
        public string P_Redlist_Status { get; set; }

        [MaxLength(40)]
        public string P_Installation_Sequence { get; set; }

        [MaxLength(40)]
        public string P_Part_Type { get; set; }

        [MaxLength(40)]
        public string P_PSI_Value { get; set; }

        [MaxLength(40)]
        public string P_Flush_Top_or_Flush_Bot { get; set; }

        [MaxLength(40)]
        public string P_Conductivity { get; set; }

        [MaxLength(40)]
        public string P_Grade { get; set; }

        [MaxLength(40)]
        public string P_Order_Priority { get; set; }

        [MaxLength(40)]
        public string P_Structural_Spec_1 { get; set; }

        [MaxLength(40)]
        public string P_Structural_Spec_2 { get; set; }

        [MaxLength(40)]
        public string P_Structural_Spec_3 { get; set; }

        [MaxLength(40)]
        public string P_Structural_Spec_4 { get; set; }

        [MaxLength(40)]
        public string M_MEP_Type { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Perimeter Outside (in)", 20, false)]
        public string Perimeter_outside { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Height Real (in)", 17, false)]
        public double? Real_height { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Width Real (in)", 18, false)]
        public double? Real_width { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Length Real (in)", 19, false)]
        public double? Real_Length { get; set; }

        [MaxLength(40)]
        public double? Real_Vol { get; set; }


        [MaxLength(40)]
        public string Round_height { get; set; }

        [MaxLength(40)]
        public string Round_length { get; set; }

        [MaxLength(40)]
        public string Round_width { get; set; }

        [MaxLength(40)]
        public string Volume_Calculation { get; set; }

        [MaxLength(40)]
        public string P_Surfacing_Spec { get; set; }

        [MaxLength(40)]
        public string P_Vendor { get; set; }

        [MaxLength(40)]
        public string P_Visual_Grade { get; set; }

        [MaxLength(40)]
        public string P_Sustainability_Certification { get; set; }

        [MaxLength(40)]
        public string P_VOC_rating { get; set; }

        [MaxLength(40)]
        public string PA_Panel_Installation_Sequence { get; set; }

        [MaxLength(40)]
        public string PA_Panel_Installer { get; set; }

        [MaxLength(40)]
        public string PA_Panel_Manufacturer { get; set; }

        [MaxLength(40)]
        public string PA_Panel_Model { get; set; }

        [MaxLength(40)]
        public string CA_Manufacturer { get; set; }

        [MaxLength(40)]
        public string Color { get; set; }

        [MaxLength(40)]
        public string M_MEP_Trunk_Desc { get; set; }

        [MaxLength(40)]
        [HzModelProperty("Panel Area (sqft)", 21, false)]
        public string Panel_area_real { get; set; }

        [MaxLength(40)]
        public string CA_linear_units { get; set; }

        [MaxLength(40)]
        public string noAssemblyList { get; set; }

        [MaxLength(40)]
        public string No_parts_list { get; set; }

        [MaxLength(40)]
        public string Node_number { get; set; }

        [MaxLength(40)]
        public string User1 { get; set; }
        [MaxLength(40)]
        public string User2 { get; set; }
        [MaxLength(40)]
        public string User3 { get; set; }
        [MaxLength(40)]
        public string User4 { get; set; }
        [MaxLength(40)]
        public string User5 { get; set; }
        [MaxLength(40)]
        public string User6 { get; set; }
        [MaxLength(40)]
        public string User7 { get; set; }
        [MaxLength(40)]
        public string User8 { get; set; }
        [MaxLength(40)]
        public string User9 { get; set; }
        [MaxLength(40)]
        public string User10 { get; set; }
        [MaxLength(40)]
        public string User11 { get; set; }
        [MaxLength(40)]
        public string User12 { get; set; }
        [MaxLength(40)]
        public string User13 { get; set; }
        [MaxLength(40)]
        public string User14 { get; set; }
        [MaxLength(40)]
        public string User15 { get; set; }
        [MaxLength(40)]
        public string User16 { get; set; }
        [MaxLength(40)]
        public string User17 { get; set; }
        [MaxLength(40)]
        public string User18 { get; set; }
        [MaxLength(40)]
        public string User19 { get; set; }
        [MaxLength(40)]
        public string User20 { get; set; }
        [MaxLength(40)]
        public string User21 { get; set; }
        [MaxLength(40)]
        public string User22 { get; set; }
        [MaxLength(40)]
        public string User23 { get; set; }
        [MaxLength(40)]
        public string User24 { get; set; }
        [MaxLength(40)]
        public string User25 { get; set; }
        [MaxLength(40)]
        public string User26 { get; set; }
        [MaxLength(40)]
        public string User27 { get; set; }
        [MaxLength(40)]
        public string User28 { get; set; }
        [MaxLength(40)]
        public string User29 { get; set; }
        [MaxLength(40)]
        public string User30 { get; set; }

        #endregion
    }
}