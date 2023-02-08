/**
*
* @libraryType DotNetDll
* @id d59ed4b5-0a0f-4a6d-8697-4a90636eed0f
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName GetLastDateOfMonth
* @targetMethodFullName System.Object GetLastDateOfMonth(System.Object)
* @methodDisplayName System.Object GetLastDateOfMonth(System.Object)
* @createdDate 2022-03-04 13:11:10
* @lastModifiedDate 2022-03-04 13:11:10
* @createdBy 
* @lastModifiedBy 
*
* @designerVersion 2.1.090.00127.D6
* @brief 
*  @brf
* @param date<String_DateTime> (ex, '2020-01-01 13:00:00')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_GetLastDateOfMonth == null || Script.DataConverter.DateTime_GetLastDateOfMonth == undefined) {
	Script.DataConverter.DateTime_GetLastDateOfMonth = function (instance, date) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object GetLastDateOfMonth(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetLastDateOfMonth(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		
	//Body End

/*hide*/return plugin.Run();
	}
}