/**
*
* @libraryType DotNetDll
* @id 7bafecb8-3c99-4795-881c-c9285e531787
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_DateTime
* @targetMethodName FromExcelDate
* @targetMethodFullName System.Object FromExcelDate(System.Object, System.String)
* @methodDisplayName System.Object FromExcelDate(System.Object, System.String)
* @createdDate 2020-05-26 13:50:13
* @lastModifiedDate 2020-05-26 13:50:13
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param date<Double> (ex, 42675.77)
* @param format<String> (ex, 'yyyy-MM-dd HH:mm:ss')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.DateTime_FromExcelDate == null || Script.DataConverter.DateTime_FromExcelDate == undefined) {
	Script.DataConverter.DateTime_FromExcelDate = function (instance, date, format) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_DateTime", "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_DateTime", "System.Object FromExcelDate(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object FromExcelDate(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("date", date);
		plugin.SetPropValue("format", format);
		
	//Body End

/*hide*/return plugin.Run();
	}
}