/**
*
* @libraryType DotNetDll
* @id f662b1d0-1e9c-4ebb-b840-e5a6f8bbe9d4
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName ReplaceAll
* @targetMethodFullName System.Object ReplaceAll(System.Object, System.String, System.String)
* @methodDisplayName System.Object ReplaceAll(System.Object, System.String, System.String)
* @createdDate 2020-05-26 13:52:29
* @lastModifiedDate 2020-05-26 13:52:29
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, 'Brity RPA')
* @param oldValue<String> (ex, 'Brity')
* @param newValue<String> (ex, 'Samsung Brity')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_ReplaceAll == null || Script.DataConverter.String_ReplaceAll == undefined) {
	Script.DataConverter.String_ReplaceAll = function (instance, data, oldValue, newValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object ReplaceAll(System.Object, System.String, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ReplaceAll(System.Object, System.String, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("oldValue", oldValue);
		plugin.SetPropValue("newValue", newValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}