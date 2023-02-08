/**
*
* @libraryType DotNetDll
* @id e50313d3-4f6c-47a1-8986-b62cbbdedc8d
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Xml
* @targetMethodName GetValueByXpath
* @targetMethodFullName System.Object GetValueByXpath(System.Object, System.String)
* @methodDisplayName System.Object GetValueByXpath(System.Object, System.String)
* @createdDate 2020-05-26 13:53:25
* @lastModifiedDate 2020-05-26 13:53:25
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, '<?xml version="1.0"?> <CAT> <NAME>Izzy</NAME>  </CAT>'
* @param xPath<String> (ex, '/CAT/NAME')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Xml_GetValueByXpath == null || Script.DataConverter.Xml_GetValueByXpath == undefined) {
	Script.DataConverter.Xml_GetValueByXpath = function (instance, data, xPath) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Xml", "RPAGO.Custom.ExtendLibrary.DataConverter_Xml", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Xml", "System.Object GetValueByXpath(System.Object, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetValueByXpath(System.Object, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("xPath", xPath);
		
	//Body End

/*hide*/return plugin.Run();
	}
}