/**
*
* @libraryType DotNetDll
* @id 286c4b0d-5880-4fe1-84fb-cef0d30ba1a9
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName AddMonths
* @targetMethodFullName System.Object AddMonths(System.Object, Int32)
* @methodDisplayName System.Object AddMonths(System.Object, Int32)
* @createdDate 2020-05-26 13:49:48
* @lastModifiedDate 2020-05-26 13:49:48
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param monthValue<Integer> (ex, 3)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_AddMonths == null || Script.DataConverter.DateTime_AddMonths == undefined) {
	Script.DataConverter.DateTime_AddMonths = function (instance, date, monthValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object AddMonths(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object AddMonths(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("monthValue", monthValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}