/**
*
* @libraryType DotNetDll
* @id f45a107a-88df-4655-95eb-7741bff82e1c
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Number
* @targetMethodName Floor
* @targetMethodFullName System.Object Floor(System.Object)
* @methodDisplayName System.Object Floor(System.Object)
* @createdDate 2020-05-26 13:51:18
* @lastModifiedDate 2020-05-26 13:51:18
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Double> (ex, 1234.567)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Number_Floor == null || Script.DataConverter.Number_Floor == undefined) {
	Script.DataConverter.Number_Floor = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Number", "RPAGO.Custom.ExtendLibrary.DataConverter_Number", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Number", "System.Object Floor(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Floor(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}