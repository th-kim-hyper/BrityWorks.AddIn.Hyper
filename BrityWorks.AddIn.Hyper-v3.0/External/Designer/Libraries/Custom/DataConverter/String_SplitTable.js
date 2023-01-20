/**
*
* @libraryType DotNetDll
* @id 2f1fd6fc-ddb5-4d55-ab00-dd8ae83dc1c6
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_String
* @targetMethodName SplitTable
* @targetMethodFullName System.Object SplitTable(System.Object, System.String, System.String)
* @methodDisplayName System.Object SplitTable(System.Object, System.String, System.String)
* @createdDate 2020-05-26 13:52:38
* @lastModifiedDate 2020-05-26 13:52:38
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<String> (ex, 'Brity, Works/Samsung, SDS')
* @param rowSeperator<String> (ex, '/')
* @param colSeperator<String> (ex, ',')
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.String_SplitTable == null || Script.DataConverter.String_SplitTable == undefined) {
	Script.DataConverter.String_SplitTable = function (instance, data, rowSeperator, colSeperator) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_String", "RPAGO.Custom.ExtendLibrary.DataConverter_String", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_String", "System.Object SplitTable(System.Object, System.String, System.String)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object SplitTable(System.Object, System.String, System.String)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("rowSeperator", rowSeperator);
		plugin.SetPropValue("colSeperator", colSeperator);
		
	//Body End

/*hide*/return plugin.Run();
	}
}