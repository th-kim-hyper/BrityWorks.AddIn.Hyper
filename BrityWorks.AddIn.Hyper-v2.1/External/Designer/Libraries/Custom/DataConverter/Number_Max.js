/**
*
* @libraryType DotNetDll
* @id f98e63f2-022e-4070-a0c7-81971acc956d
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Number
* @targetMethodName Max
* @targetMethodFullName System.Object Max(System.Object, Double)
* @methodDisplayName System.Object Max(System.Object, Double)
* @createdDate 2020-05-26 13:51:23
* @lastModifiedDate 2020-05-26 13:51:23
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data1<Double> (ex, 100.0)
* @param data2<Double> (ex, 200.0)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Number_Max == null || Script.DataConverter.Number_Max == undefined) {
	Script.DataConverter.Number_Max = function (instance, data1, data2) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Number", "RPAGO.Custom.ExtendLibrary.DataConverter_Number", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Number", "System.Object Max(System.Object, Double)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object Max(System.Object, Double)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data1", data1);
		plugin.SetPropValue("data2", data2);
		
	//Body End

/*hide*/return plugin.Run();
	}
}