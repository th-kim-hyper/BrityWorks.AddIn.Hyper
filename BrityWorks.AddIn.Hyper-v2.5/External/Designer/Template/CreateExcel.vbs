Set Arg = WScript.Arguments

if(Arg.Length < 1) then
   WScript.Quit
end if

path = ""

for i = 0 to Arg.Length - 1		
	path = path & Arg(i)	
	if(i <> 0 or i <> Arg.Length - 1) then
		path = path & " "
	end if
Next

Set objExcel = CreateObject("Excel.Application")
objExcel.Visible = False
Set objWorkbook = objExcel.Workbooks.Add()
objWorkbook.SaveAs(path)
objExcel.Quit