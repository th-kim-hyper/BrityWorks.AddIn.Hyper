/**
*
* @libraryType DotNetDll
* @id 05fddf62-572f-487f-925e-721f2d69422b
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName ObjectToString
* @targetMethodFullName System.Object ObjectToString(System.Object)
* @methodDisplayName System.Object ObjectToString(System.Object)
* @createdDate 2020-05-26 13:52:24
* @lastModifiedDate 2020-05-26 13:52:24
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Any> Object
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_ObjectToString == null || Script.DataConverter.String_ObjectToString == undefined) {
	Script.DataConverter.String_ObjectToString = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object ObjectToString(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ObjectToString(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}