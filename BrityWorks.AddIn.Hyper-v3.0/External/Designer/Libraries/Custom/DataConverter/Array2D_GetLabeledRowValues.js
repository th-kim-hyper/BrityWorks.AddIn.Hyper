/**
*
* @libraryType DotNetDll
* @id 6c7452c1-b8f8-4c84-9366-de23844e7992
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName GetLabeledRowValues
* @targetMethodFullName System.Object GetLabeledRowValues(System.Object, System.String)
* @methodDisplayName System.Object GetLabeledRowValues(System.Object, System.String)
* @createdDate 2020-05-26 13:53:05
* @lastModifiedDate 2020-05-26 13:53:05
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array2D> (ex, [['aa','bb'], ['a1','b1'],['a2','b2'],['a3','b3']])
* @param labelName<String> (ex, 'a1')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array2D_GetLabeledRowValues == null || Script.DataConverter.Array2D_GetLabeledRowValues == undefined) {
	Script.DataConverter.Array2D_GetLabeledRowValues = function (instance, data, labelName) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object GetLabeledRowValues(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetLabeledRowValues(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("labelName", labelName);
		
	//Body End

/*hide*/return plugin.Run();
	}
}