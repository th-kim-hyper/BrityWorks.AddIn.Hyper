/**
*
* @libraryType DotNetDll
* @id 64f4b615-280a-48fc-93a3-b88f5082442c
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName StringToNumArray
* @targetMethodFullName System.Object StringToNumArray(System.Object, System.String)
* @methodDisplayName System.Object StringToNumArray(System.Object, System.String)
* @createdDate 2020-05-26 13:49:14
* @lastModifiedDate 2020-05-26 13:49:14
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, '10,20,30,40,50,60,70,80,90,100')
* @param seperator<String> (ex, ',')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array1D_StringToNumArray == null || Script.DataConverter.Array1D_StringToNumArray == undefined) {
	Script.DataConverter.Array1D_StringToNumArray = function (instance, data, seperator) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object StringToNumArray(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object StringToNumArray(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("seperator", seperator);
		
	//Body End

/*hide*/return plugin.Run();
	}
}