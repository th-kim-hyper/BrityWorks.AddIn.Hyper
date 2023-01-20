/**
*
* @libraryType DotNetDll
* @id 2fb95915-c6d8-48ef-ab49-4d8e5bc0c173
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName AddSeconds
* @targetMethodFullName System.Object AddSeconds(System.Object, Int32)
* @methodDisplayName System.Object AddSeconds(System.Object, Int32)
* @createdDate 2020-05-26 13:49:56
* @lastModifiedDate 2020-05-26 13:49:56
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
* @param secondValue<Integer> (ex, 15)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_AddSeconds == null || Script.DataConverter.DateTime_AddSeconds == undefined) {
	Script.DataConverter.DateTime_AddSeconds = function (instance, date, secondValue) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object AddSeconds(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object AddSeconds(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("secondValue", secondValue);
		
	//Body End

/*hide*/return plugin.Run();
	}
}