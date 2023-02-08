/**
*
* @libraryType DotNetDll
* @id 7a069305-5b99-4961-bfea-7ce6b4e65090
* @targetMethodType Static_Method
* @targetAssembly IPA.Custom.ExtendLibrary.dll
* @targetClassName RPAGO.Custom.ExtendLibrary.DataConverter_Array
* @targetMethodName SortByRow
* @targetMethodFullName System.Object SortByRow(System.Object, Int32, Boolean)
* @methodDisplayName System.Object SortByRow(System.Object, Int32, Boolean)
* @createdDate 2020-08-07 17:18:23
* @lastModifiedDate 2020-08-07 17:18:23
* @createdBy archi.lee
* @lastModifiedBy archi.lee
*
* @designerVersion 1.6.500.08031.D2
* @brief 
*  @brf 
* @param data<Array2D> (ex, [[1,2], [3,4],[5,6],[7,8]])
* @param index<Integer> (ex, 1)
* @param descending<Boolean> false
*
*/

if(Script.DataConverter == undefined || Script.DataConverter == null) {
	Script.DataConverter = new Object();
}

if(Script.DataConverter.Array2D_SortByRow == null || Script.DataConverter.Array2D_SortByRow == undefined) {
	Script.DataConverter.Array2D_SortByRow = function (instance, data, index, descending) {

/*hide*/Bot.AddHostType("RPAGO_Custom_ExtendLibrary_DataConverter_Array", "RPAGO.Custom.ExtendLibrary.DataConverter_Array", Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll');
/*hide*/var pluginModule = (!instance) ? Bot.CreateInstance(Global.AssemblyDir + 'IPA.Custom.ExtendLibrary.dll', "RPAGO.Custom.ExtendLibrary.DataConverter_Array", "System.Object SortByRow(System.Object, Int32, Boolean)") : instance;
/*hide*/var plugin = new PlugInDll(pluginModule, "System.Object SortByRow(System.Object, Int32, Boolean)", "DotNetDll");

	//Body Begin
		plugin.SetPropValue("data", data);
		plugin.SetPropValue("index", index);
		plugin.SetPropValue("descending", descending);
		
	//Body End

/*hide*/return plugin.Run();
	}
}