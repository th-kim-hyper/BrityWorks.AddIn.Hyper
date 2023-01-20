/**
*
* @libraryType DotNetDll
* @id cef8c952-ff76-4080-9a85-eb6bb1343ca1
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Number
* @targetMethodName Ceil
* @targetMethodFullName System.Object Ceil(System.Object)
* @methodDisplayName System.Object Ceil(System.Object)
* @createdDate 2020-05-26 13:51:13
* @lastModifiedDate 2020-05-26 13:51:13
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Double> (ex, 1234.567)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Number_Ceil == null || Script.DataConverter.Number_Ceil == undefined) {
	Script.DataConverter.Number_Ceil = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Number", "RPAGO.Custom.ExtendLibrary.DataConverter_Number", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Number", "System.Object Ceil(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Ceil(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}