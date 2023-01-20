/**
*
* @libraryType DotNetDll
* @id e2bb8221-3e8b-4842-88fe-9de47a27c6f0
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Rect
* @targetMethodName Offset
* @targetMethodFullName System.Object Offset(System.Object, Int32, Int32)
* @methodDisplayName System.Object Offset(System.Object, Int32, Int32)
* @createdDate 2020-05-26 13:51:56
* @lastModifiedDate 2020-05-26 13:51:56
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String_Rect> (ex, '10, 20, 30, 40')
* @param offsetX<Integer> (ex, 5)
* @param offsetY<Integer> (ex, 5)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Rect_Offset == null || Script.DataConverter.Rect_Offset == undefined) {
	Script.DataConverter.Rect_Offset = function (instance, data, offsetX, offsetY) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Rect", "RPAGO.Custom.ExtendLibrary.DataConverter_Rect", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Rect", "System.Object Offset(System.Object, Int32, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Offset(System.Object, Int32, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("offsetX", offsetX);
		plugin.SetPropValue("offsetY", offsetY);
		
	//Body End

/*hide*/return plugin.Run();
	}
}