/**
*
* @libraryType DotNetDll
* @id a065e5f2-3cd5-4514-974d-4f0c67d04793
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName Sort
* @targetMethodFullName System.Object Sort(System.Object)
* @methodDisplayName System.Object Sort(System.Object)
* @createdDate 2020-05-26 13:49:02
* @lastModifiedDate 2020-05-26 13:49:02
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

if(Script.DataConverter.Array1D_Sort == null || Script.DataConverter.Array1D_Sort == undefined) {
	Script.DataConverter.Array1D_Sort = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object Sort(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Sort(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}