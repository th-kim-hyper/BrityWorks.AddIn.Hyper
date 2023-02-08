/**
*
* @libraryType DotNetDll
* @id 3ad5e50d-8de4-43d8-9de9-8d7604e0d57e
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Json
* @targetMethodName ToString
* @targetMethodFullName System.Object ToString(System.Object)
* @methodDisplayName System.Object ToString(System.Object)
* @createdDate 2020-05-26 13:50:49
* @lastModifiedDate 2020-05-26 13:50:49
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Any> (ex, { "name": "James", "number": 10 })
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Json_ToString == null || Script.DataConverter.Json_ToString == undefined) {
	Script.DataConverter.Json_ToString = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Json", "RPAGO.Custom.ExtendLibrary.DataConverter_Json", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Json", "System.Object ToString(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToString(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}