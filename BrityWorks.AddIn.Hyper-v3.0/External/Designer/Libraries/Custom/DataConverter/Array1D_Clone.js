/**
*
* @libraryType DotNetDll
* @id 174f29b8-f925-4ef6-9e9e-7f17f67a2910
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName Clone
* @targetMethodFullName System.Object Clone(System.Object)
* @methodDisplayName System.Object Clone(System.Object)
* @createdDate 2020-05-26 13:48:34
* @lastModifiedDate 2020-05-26 13:48:34
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array1D> (ex, [1,2,3,4,5,6,7,8,9,0])
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array1D_Clone == null || Script.DataConverter.Array1D_Clone == undefined) {
	Script.DataConverter.Array1D_Clone = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object Clone(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Clone(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}