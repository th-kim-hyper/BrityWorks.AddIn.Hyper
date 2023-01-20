/**
*
* @libraryType DotNetDll
* @id 34ef3466-6a19-4d1b-ac06-d5125bf40ddd
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName GetRowValues
* @targetMethodFullName System.Object GetRowValues(System.Object, Int32)
* @methodDisplayName System.Object GetRowValues(System.Object, Int32)
* @createdDate 2020-05-26 13:53:11
* @lastModifiedDate 2020-05-26 13:53:11
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.07311
* @brief 
*  @brf 
* @param data<Array2D> (ex, [[1,2], [3,4],[5,6],[7,8]])
* @param rowIndex<Integer> (ex, 1)
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array2D_GetRowValues == null || Script.DataConverter.Array2D_GetRowValues == undefined) {
	Script.DataConverter.Array2D_GetRowValues = function (instance, data, rowIndex) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object GetRowValues(System.Object, Int32)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object GetRowValues(System.Object, Int32)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("rowIndex", rowIndex);
		
	//Body End

/*hide*/return plugin.Run();
	}
}