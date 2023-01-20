/**
*
* @libraryType DotNetDll
* @id e2263b52-fa30-4387-aabe-d6519ef6828f
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Json
* @targetMethodName GetValueByKey
* @targetMethodFullName System.Object GetValueByKey(System.Object, System.String)
* @methodDisplayName System.Object GetValueByKey(System.Object, System.String)
* @createdDate 2020-05-26 13:50:46
* @lastModifiedDate 2020-05-26 13:50:46
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, '{ \"name\": \"James\", \"number\": 10 }')
* @param key<String> (ex, 'number')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Json_GetValueByKey == null || Script.DataConverter.Json_GetValueByKey == undefined) {
	Script.DataConverter.Json_GetValueByKey = function (instance, data, key) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Json", "RPAGO.Custom.ExtendLibrary.DataConverter_Json", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Json", "System.Object GetValueByKey(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetValueByKey(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("key", key);
		
	//Body End

/*hide*/return plugin.Run();
	}
}