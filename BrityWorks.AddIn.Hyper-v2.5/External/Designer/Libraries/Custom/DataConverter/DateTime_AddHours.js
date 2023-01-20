/**
*
* @libraryType DotNetDll
* @id 2bf585dc-df86-4714-8eee-f9b99e2be298
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName AddHours
* @targetMethodFullName System.Object AddHours(System.Object, Int32)
* @methodDisplayName System.Object AddHours(System.Object, Int32)
* @createdDate 2020-05-26 13:49:33
* @lastModifiedDate 2020-05-26 13:49:33
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param hourValue<Integer> (ex, 1)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_AddHours == null || Script.DataConverter.DateTime_AddHours == undefined) {
	Script.DataConverter.DateTime_AddHours = function (instance, date, hourValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object AddHours(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object AddHours(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("hourValue", hourValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}