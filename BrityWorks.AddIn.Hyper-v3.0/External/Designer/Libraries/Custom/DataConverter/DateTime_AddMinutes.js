/**
*
* @libraryType DotNetDll
* @id cb38bbda-b419-4ebd-a6c4-549ec37c05a0
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName AddMinutes
* @targetMethodFullName System.Object AddMinutes(System.Object, Int32)
* @methodDisplayName System.Object AddMinutes(System.Object, Int32)
* @createdDate 2020-05-26 13:49:39
* @lastModifiedDate 2020-05-26 13:49:39
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param minuteValue<Integer> (ex, 30)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_AddMinutes == null || Script.DataConverter.DateTime_AddMinutes == undefined) {
	Script.DataConverter.DateTime_AddMinutes = function (instance, date, minuteValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object AddMinutes(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object AddMinutes(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("minuteValue", minuteValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}