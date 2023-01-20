/**
*
* @libraryType DotNetDll
* @id 24555ac2-c21b-4b9d-94a9-52c46d38dbed
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Json
* @targetMethodName ToJsonObject
* @targetMethodFullName System.Object ToJsonObject(System.Object)
* @methodDisplayName System.Object ToJsonObject(System.Object)
* @createdDate 2020-05-26 13:50:54
* @lastModifiedDate 2020-05-26 13:50:54
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, '{ \"name\": \"James\", \"number\": 10 }')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Json_ToJsonObject == null || Script.DataConverter.Json_ToJsonObject == undefined) {
	Script.DataConverter.Json_ToJsonObject = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Json", "RPAGO.Custom.ExtendLibrary.DataConverter_Json", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Json", "System.Object ToJsonObject(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToJsonObject(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}