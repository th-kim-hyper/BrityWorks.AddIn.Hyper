/**
*
* @libraryType DotNetDll
* @id 2b6b37ee-4108-4667-b227-dab1a7f8192f
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName Split
* @targetMethodFullName System.Object Split(System.Object, System.String)
* @methodDisplayName System.Object Split(System.Object, System.String)
* @createdDate 2020-05-26 13:52:33
* @lastModifiedDate 2020-05-26 13:52:33
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, 'Brity, Works')
* @param seperator<String> (ex, ',')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_Split == null || Script.DataConverter.String_Split == undefined) {
	Script.DataConverter.String_Split = function (instance, data, seperator) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object Split(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Split(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("seperator", seperator);
		
	//Body End

/*hide*/return plugin.Run();
	}
}