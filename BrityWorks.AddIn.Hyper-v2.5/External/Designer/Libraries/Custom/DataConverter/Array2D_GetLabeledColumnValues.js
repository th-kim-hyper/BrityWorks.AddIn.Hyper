/**
*
* @libraryType DotNetDll
* @id 8ca113c7-d566-4921-9807-8e2f3c8fd0d5
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName GetLabeledColumnValues
* @targetMethodFullName System.Object GetLabeledColumnValues(System.Object, System.String)
* @methodDisplayName System.Object GetLabeledColumnValues(System.Object, System.String)
* @createdDate 2020-05-26 13:53:00
* @lastModifiedDate 2020-05-26 13:53:00
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array2D> (ex, [['aa','bb'], ['a1','b1'],['a2','b2'],['a3','b3']])
* @param labelName<String> (ex, 'aa')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array2D_GetLabeledColumnValues == null || Script.DataConverter.Array2D_GetLabeledColumnValues == undefined) {
	Script.DataConverter.Array2D_GetLabeledColumnValues = function (instance, data, labelName) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object GetLabeledColumnValues(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetLabeledColumnValues(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("labelName", labelName);
		
	//Body End

/*hide*/return plugin.Run();
	}
}