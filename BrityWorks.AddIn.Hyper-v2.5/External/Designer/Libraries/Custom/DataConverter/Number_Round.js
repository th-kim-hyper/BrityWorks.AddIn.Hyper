/**
*
* @libraryType DotNetDll
* @id a42770fd-0783-4255-851b-91cee062caa7
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Number
* @targetMethodName Round
* @targetMethodFullName System.Object Round(System.Object, Int32)
* @methodDisplayName System.Object Round(System.Object, Int32)
* @createdDate 2020-05-26 13:51:33
* @lastModifiedDate 2020-05-26 13:51:33
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Double> (ex, 100.567)
* @param decimals<Integer> (ex, 2)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Number_Round == null || Script.DataConverter.Number_Round == undefined) {
	Script.DataConverter.Number_Round = function (instance, data, decimals) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Number", "RPAGO.Custom.ExtendLibrary.DataConverter_Number", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Number", "System.Object Round(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Round(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("decimals", decimals);
		
	//Body End

/*hide*/return plugin.Run();
	}
}