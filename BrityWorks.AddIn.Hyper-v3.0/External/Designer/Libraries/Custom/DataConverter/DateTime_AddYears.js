/**
*
* @libraryType DotNetDll
* @id 256238f4-360d-4dc4-8b9c-a29931a41d33
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName AddYears
* @targetMethodFullName System.Object AddYears(System.Object, Int32)
* @methodDisplayName System.Object AddYears(System.Object, Int32)
* @createdDate 2020-05-26 13:50:02
* @lastModifiedDate 2020-05-26 13:50:02
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param yearValue<Integer> (ex, 1)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_AddYears == null || Script.DataConverter.DateTime_AddYears == undefined) {
	Script.DataConverter.DateTime_AddYears = function (instance, date, yearValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object AddYears(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object AddYears(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("yearValue", yearValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}