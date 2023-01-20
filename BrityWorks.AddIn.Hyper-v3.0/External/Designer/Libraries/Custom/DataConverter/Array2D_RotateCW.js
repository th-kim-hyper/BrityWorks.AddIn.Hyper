/**
*
* @libraryType DotNetDll
* @id 25294eef-0eed-4811-9c84-26cf24ed0676
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName RotateCW
* @targetMethodFullName System.Object RotateCW(System.Object)
* @methodDisplayName System.Object RotateCW(System.Object)
* @createdDate 2020-05-26 13:53:20
* @lastModifiedDate 2020-05-26 13:53:20
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

if(Script.DataConverter.Array2D_RotateCW == null || Script.DataConverter.Array2D_RotateCW == undefined) {
	Script.DataConverter.Array2D_RotateCW = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object RotateCW(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object RotateCW(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}