/**
*
* @libraryType DotNetDll
* @id 4209f232-6f1f-47e6-b10c-279025efc7bd
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName IsMatch
* @targetMethodFullName System.Object IsMatch(System.Object, System.String)
* @methodDisplayName System.Object IsMatch(System.Object, System.String)
* @createdDate 2020-05-26 13:52:15
* @lastModifiedDate 2020-05-26 13:52:15
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, 'Hello, World')
* @param pattern<String> (ex, 'Hello, World' or '\\:^\w+,$')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_IsMatch == null || Script.DataConverter.String_IsMatch == undefined) {
	Script.DataConverter.String_IsMatch = function (instance, data, pattern) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object IsMatch(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object IsMatch(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("pattern", pattern);
		
	//Body End

/*hide*/return plugin.Run();
	}
}