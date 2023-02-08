/**
*
* @libraryType DotNetDll
* @id 51cb2e46-1af8-4ee5-a7b9-52a8114f196d
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Point
* @targetMethodName Offset
* @targetMethodFullName System.Object Offset(System.Object, Int32, Int32)
* @methodDisplayName System.Object Offset(System.Object, Int32, Int32)
* @createdDate 2020-05-26 13:51:42
* @lastModifiedDate 2020-05-26 13:51:42
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String_Point> (ex, '10, 20')
* @param offsetX<Integer> (ex, 5)
* @param offsetY<Integer> (ex, 5)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Point_Offset == null || Script.DataConverter.Point_Offset == undefined) {
	Script.DataConverter.Point_Offset = function (instance, data, offsetX, offsetY) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Point", "RPAGO.Custom.ExtendLibrary.DataConverter_Point", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Point", "System.Object Offset(System.Object, Int32, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Offset(System.Object, Int32, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("offsetX", offsetX);
		plugin.SetPropValue("offsetY", offsetY);
		
	//Body End

/*hide*/return plugin.Run();
	}
}