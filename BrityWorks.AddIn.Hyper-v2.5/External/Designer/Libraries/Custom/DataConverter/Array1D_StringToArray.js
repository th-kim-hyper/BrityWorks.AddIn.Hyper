/**
*
* @libraryType DotNetDll
* @id bff996db-fb39-4407-8195-fcf982d46156
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName StringToArray
* @targetMethodFullName System.Object StringToArray(System.Object, System.String)
* @methodDisplayName System.Object StringToArray(System.Object, System.String)
* @createdDate 2020-05-26 13:49:08
* @lastModifiedDate 2020-05-26 13:49:08
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, 'a1,a2,a3,a4,a5,a6,a7,a8,a9,a0')
* @param seperator<String> (ex, ',')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array1D_StringToArray == null || Script.DataConverter.Array1D_StringToArray == undefined) {
	Script.DataConverter.Array1D_StringToArray = function (instance, data, seperator) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object StringToArray(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object StringToArray(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("seperator", seperator);
		
	//Body End

/*hide*/return plugin.Run();
	}
}