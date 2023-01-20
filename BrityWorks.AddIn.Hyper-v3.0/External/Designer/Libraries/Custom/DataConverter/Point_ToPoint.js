/**
*
* @libraryType DotNetDll
* @id f875879b-8226-4104-8f31-83baa5cc884a
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Point
* @targetMethodName ToPoint
* @targetMethodFullName System.Object ToPoint(System.Object)
* @methodDisplayName System.Object ToPoint(System.Object)
* @createdDate 2020-05-26 13:51:47
* @lastModifiedDate 2020-05-26 13:51:47
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String_Point> (ex, '10, 20')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Point_ToPoint == null || Script.DataConverter.Point_ToPoint == undefined) {
	Script.DataConverter.Point_ToPoint = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Point", "RPAGO.Custom.ExtendLibrary.DataConverter_Point", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Point", "System.Object ToPoint(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToPoint(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}