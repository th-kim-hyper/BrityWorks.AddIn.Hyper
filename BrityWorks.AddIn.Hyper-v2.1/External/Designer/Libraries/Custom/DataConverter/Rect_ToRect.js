/**
*
* @libraryType DotNetDll
* @id a0fd503a-3e5e-4a6a-8d3a-bdb2776d31d0
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Rect
* @targetMethodName ToRect
* @targetMethodFullName System.Object ToRect(System.Object)
* @methodDisplayName System.Object ToRect(System.Object)
* @createdDate 2020-05-26 13:52:01
* @lastModifiedDate 2020-05-26 13:52:01
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String_Rect> (ex, '10, 20, 30, 40')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Rect_ToRect == null || Script.DataConverter.Rect_ToRect == undefined) {
	Script.DataConverter.Rect_ToRect = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Rect", "RPAGO.Custom.ExtendLibrary.DataConverter_Rect", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Rect", "System.Object ToRect(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToRect(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}