/**
*
* @libraryType DotNetDll
* @id 05b29bd6-a70b-4a76-88c2-47268a8ada6b
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Number
* @targetMethodName ToNumber
* @targetMethodFullName System.Object ToNumber(System.Object)
* @methodDisplayName System.Object ToNumber(System.Object)
* @createdDate 2020-05-26 13:51:38
* @lastModifiedDate 2020-05-26 13:51:38
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, '12345.0')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Number_ToNumber == null || Script.DataConverter.Number_ToNumber == undefined) {
	Script.DataConverter.Number_ToNumber = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Number", "RPAGO.Custom.ExtendLibrary.DataConverter_Number", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Number", "System.Object ToNumber(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToNumber(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}