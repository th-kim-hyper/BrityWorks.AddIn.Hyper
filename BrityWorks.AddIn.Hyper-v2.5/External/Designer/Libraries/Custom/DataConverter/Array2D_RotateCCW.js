/**
*
* @libraryType DotNetDll
* @id 21b6a2fb-e01a-4f6c-90de-d8916ed27390
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName RotateCCW
* @targetMethodFullName System.Object RotateCCW(System.Object)
* @methodDisplayName System.Object RotateCCW(System.Object)
* @createdDate 2020-05-26 13:53:16
* @lastModifiedDate 2020-05-26 13:53:16
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array2D> (ex, [[1,2], [3,4],[5,6],[7,8]])
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array2D_RotateCCW == null || Script.DataConverter.Array2D_RotateCCW == undefined) {
	Script.DataConverter.Array2D_RotateCCW = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object RotateCCW(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object RotateCCW(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}