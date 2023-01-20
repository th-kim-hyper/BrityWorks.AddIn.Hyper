/**
*
* @libraryType DotNetDll
* @id f4bf9efa-d261-4907-a715-520b3aeb303b
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName IndexOf
* @targetMethodFullName System.Object IndexOf(System.Object, System.Object)
* @methodDisplayName System.Object IndexOf(System.Object, System.Object)
* @createdDate 2020-05-26 13:48:44
* @lastModifiedDate 2020-05-26 13:48:44
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array1D> (ex, [1,2,3,4,5,6,7,8,9,0])
* @param value<Any> (ex, 3)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array1D_IndexOf == null || Script.DataConverter.Array1D_IndexOf == undefined) {
	Script.DataConverter.Array1D_IndexOf = function (instance, data, value) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object IndexOf(System.Object, System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object IndexOf(System.Object, System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("value", value);
		
	//Body End

/*hide*/return plugin.Run();
	}
}