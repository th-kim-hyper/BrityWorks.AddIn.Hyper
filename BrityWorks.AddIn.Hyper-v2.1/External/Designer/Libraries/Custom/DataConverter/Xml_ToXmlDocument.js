/**
*
* @libraryType DotNetDll
* @id 0355ff13-77e0-4936-a0cd-40216fec48d4
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Xml
* @targetMethodName ToXmlDocument
* @targetMethodFullName System.Object ToXmlDocument(System.Object)
* @methodDisplayName System.Object ToXmlDocument(System.Object)
* @createdDate 2020-05-26 13:53:30
* @lastModifiedDate 2020-05-26 13:53:30
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, '<test enable='true' value='123'>abcd</test>')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if (Script.DataConverter.Xml_ToXmlDocument == null || Script.DataConverter.Xml_ToXmlDocument == undefined) {
	Script.DataConverter.Xml_ToXmlDocument = function (instance, data) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Xml", "RPAGO.Custom.ExtendLibrary.DataConverter_Xml", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Xml", "System.Object ToXmlDocument(System.Object)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object ToXmlDocument(System.Object)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		
	//Body End

/*hide*/return plugin.Run();
	}
}