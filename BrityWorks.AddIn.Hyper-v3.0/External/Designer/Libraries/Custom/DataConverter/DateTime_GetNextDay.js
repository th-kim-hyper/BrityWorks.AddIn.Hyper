/**
*
* @libraryType DotNetDll
* @id d52f9dc7-52dd-480d-8d1b-78f66939cae8
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName GetNextDay
* @targetMethodFullName System.Object GetNextDay(System.Object, Int32, System.Object)
* @methodDisplayName System.Object GetNextDay(System.Object, Int32, System.Object)
* @createdDate 2022-03-04 13:12:23
* @lastModifiedDate 2022-03-04 13:12:23
* @createdBy 
* @lastModifiedBy 
*
* @designerVersion 2.1.090.00127.D6
* @brief 
*  @brf
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param nthWeek<Integer> (ex, 3)
* @param dayOfWeek<Object> (ex, 'friday')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_GetNextDay == null || Script.DataConverter.DateTime_GetNextDay == undefined) {
	Script.DataConverter.DateTime_GetNextDay = function (instance, date, nthWeek, dayOfWeek) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object GetNextDay(System.Object, Int32, System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetNextDay(System.Object, Int32, System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("nthWeek", nthWeek);
		plugin.SetPropValue("dayOfWeek", dayOfWeek);
		
	//Body End

/*hide*/return plugin.Run();
	}
}