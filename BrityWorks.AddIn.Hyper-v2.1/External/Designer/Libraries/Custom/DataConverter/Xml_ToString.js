/**
*
* @libraryType DotNetDll
* @id 7e524762-0175-4e4c-8437-4a4dcd85b6a3
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Xml
* @targetMethodName ToString
* @targetMethodFullName System.Object ToString(System.Object)
* @methodDisplayName System.Object ToString(System.Object)
* @createdDate 2020-05-26 13:53:30
* @lastModifiedDate 2020-05-26 13:53:30
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Any> XML Object
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Xml_ToString == null || Script.DataConverter.Xml_ToString == undefined) {
	Script.DataConverter.Xml_ToString = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Xml", "RPAGO.Custom.ExtendLibrary.DataConverter_Xml", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Xml", "System.Object ToString(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToString(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}