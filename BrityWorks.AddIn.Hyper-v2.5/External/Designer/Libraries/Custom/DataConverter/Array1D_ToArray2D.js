/**
*
* @libraryType DotNetDll
* @id 8aba2e10-3654-430d-a9b0-6f005b6ea936
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName DynamicTo2DArray
* @targetMethodFullName System.Object DynamicTo2DArray(System.Object)
* @methodDisplayName System.Object DynamicTo2DArray(System.Object)
* @createdDate 2020-05-26 13:52:50
* @lastModifiedDate 2020-05-26 13:52:50
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array1D> (ex, ['a', 'b', 'c'])
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array1D_ToArray2D == null || Script.DataConverter.Array1D_ToArray2D == undefined) {
	Script.DataConverter.Array1D_ToArray2D = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object DynamicTo2DArray(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object DynamicTo2DArray(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}