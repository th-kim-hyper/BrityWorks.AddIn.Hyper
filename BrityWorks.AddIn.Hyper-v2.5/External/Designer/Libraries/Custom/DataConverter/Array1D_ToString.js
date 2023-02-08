/**
*
* @libraryType DotNetDll
* @id b0243939-69d2-4fb3-85ce-0f5c464ef783
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName ArrayToString
* @targetMethodFullName System.Object ArrayToString(System.Object, System.String)
* @methodDisplayName System.Object ArrayToString(System.Object, System.String)
* @createdDate 2020-05-26 13:48:20
* @lastModifiedDate 2020-05-26 13:48:20
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array1D> (ex, [1,2,3,4,5,6,7,8,9,0])
* @param seperator<String> (ex, ',')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array1D_ToString == null || Script.DataConverter.Array1D_ToString == undefined) {
	Script.DataConverter.Array1D_ToString = function (instance, data, seperator) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object ArrayToString(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ArrayToString(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("seperator", seperator);
		
	//Body End

/*hide*/return plugin.Run();
	}
}