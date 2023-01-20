/**
*
* @libraryType DotNetDll
* @id 1b7e5574-2c1c-4543-91f3-3c5d0766b159
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Number
* @targetMethodName Abs
* @targetMethodFullName System.Object Abs(System.Object)
* @methodDisplayName System.Object Abs(System.Object)
* @createdDate 2020-05-26 13:51:01
* @lastModifiedDate 2020-05-26 13:51:01
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Double> (ex, -1000)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Number_Abs == null || Script.DataConverter.Number_Abs == undefined) {
	Script.DataConverter.Number_Abs = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Number", "RPAGO.Custom.ExtendLibrary.DataConverter_Number", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Number", "System.Object Abs(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Abs(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}