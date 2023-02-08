/**
*
* @libraryType DotNetDll
* @id bc855009-d708-4b03-99c4-81a9e3620083
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Rect
* @targetMethodName Center
* @targetMethodFullName System.Object Center(System.Object)
* @methodDisplayName System.Object Center(System.Object)
* @createdDate 2020-05-26 13:51:52
* @lastModifiedDate 2020-05-26 13:51:52
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

if(Script.DataConverter.Rect_Center == null || Script.DataConverter.Rect_Center == undefined) {
	Script.DataConverter.Rect_Center = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Rect", "RPAGO.Custom.ExtendLibrary.DataConverter_Rect", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Rect", "System.Object Center(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Center(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}