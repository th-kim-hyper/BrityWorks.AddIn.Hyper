/**
*
* @libraryType DotNetDll
* @id e6752748-1427-43e6-8e01-d2e87feec4f5
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName ExtractByRegex
* @targetMethodFullName System.Object ExtractByRegex(System.Object, System.String)
* @methodDisplayName System.Object ExtractByRegex(System.Object, System.String)
* @createdDate 2020-05-26 13:52:06
* @lastModifiedDate 2020-05-26 13:52:06
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, 'Hello, World')
* @param pattern<String> (ex, '^\w+,$')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_ExtractByRegex == null || Script.DataConverter.String_ExtractByRegex == undefined) {
	Script.DataConverter.String_ExtractByRegex = function (instance, data, pattern) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object ExtractByRegex(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ExtractByRegex(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("pattern", pattern);
		
	//Body End

/*hide*/return plugin.Run();
	}
}