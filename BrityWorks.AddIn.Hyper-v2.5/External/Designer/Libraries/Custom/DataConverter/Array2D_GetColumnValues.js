/**
*
* @libraryType DotNetDll
* @id 6c0bb3fc-e5c5-49fb-9f46-770b3e72f914
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName GetColumnValues
* @targetMethodFullName System.Object GetColumnValues(System.Object, Int32)
* @methodDisplayName System.Object GetColumnValues(System.Object, Int32)
* @createdDate 2020-05-26 13:52:55
* @lastModifiedDate 2020-05-26 13:52:55
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array2D> (ex, [[1,2], [3,4],[5,6],[7,8]])
* @param columnIndex<Integer> (ex, 1)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array2D_GetColumnValues == null || Script.DataConverter.Array2D_GetColumnValues == undefined) {
	Script.DataConverter.Array2D_GetColumnValues = function (instance, data, columnIndex) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object GetColumnValues(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetColumnValues(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("columnIndex", columnIndex);
		
	//Body End

/*hide*/return plugin.Run();
	}
}