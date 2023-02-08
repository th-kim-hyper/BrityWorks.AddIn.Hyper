/**
*
* @libraryType DotNetDll
* @id 714f0bd4-3496-4ad3-82ec-188cd7de8b1b
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName Format
* @targetMethodFullName System.Object Format(System.String, System.Object)
* @methodDisplayName System.Object Format(System.String, System.Object)
* @createdDate 2020-05-26 13:52:11
* @lastModifiedDate 2020-05-26 13:52:11
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param format<String> (ex, '{0} : {1} : {2}')
* @param args<Array> (ex, ['aa', 'bb', 'cc'])
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_Format == null || Script.DataConverter.String_Format == undefined) {
	Script.DataConverter.String_Format = function (instance, format, args) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object Format(System.String, System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Format(System.String, System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("format", format);
		plugin.SetPropValue("args", args);
		
	//Body End

/*hide*/return plugin.Run();
	}
}