/**
*
* @libraryType DotNetDll
* @id fb2c5d5d-181d-4ad4-ada5-21fa99636ec7
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName Trim
* @targetMethodFullName System.Object Trim(System.Object)
* @methodDisplayName System.Object Trim(System.Object)
* @createdDate 2020-05-26 13:52:43
* @lastModifiedDate 2020-05-26 13:52:43
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Any> (ex, '    Brity RPA   ')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_Trim == null || Script.DataConverter.String_Trim == undefined) {
	Script.DataConverter.String_Trim = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object Trim(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Trim(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}