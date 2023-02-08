/**
*
* @libraryType DotNetDll
* @id 631c5562-72aa-47b5-ba6b-eae95a5db4f9
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName AddDays
* @targetMethodFullName System.Object AddDays(System.Object, Int32)
* @methodDisplayName System.Object AddDays(System.Object, Int32)
* @createdDate 2020-05-26 13:49:27
* @lastModifiedDate 2020-05-26 13:49:27
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param dayValue<Integer> (ex, 7)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_AddDays == null || Script.DataConverter.DateTime_AddDays == undefined) {
	Script.DataConverter.DateTime_AddDays = function (instance, date, dayValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object AddDays(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object AddDays(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("dayValue", dayValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}