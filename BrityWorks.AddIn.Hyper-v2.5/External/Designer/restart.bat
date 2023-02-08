@ECHO OFF

rem Wait until certain process finishes, and execute another process.
rem This batch can be used to Restart Application
rem %1 : Proces Name ex) BrityRPA_Designer.exe
rem %2 : .exe Path ex) C:\\BrityRPA_Designer.exe
rem %3 ~ : Additional all arguemnts for %2 program

:LOOP
TASKLIST | findstr %1 >nul 2>&1
IF ERRORLEVEL 1 (
  GOTO CONTINUE
  ) ELSE (
  GOTO LOOP
)

:CONTINUE

rem mandatory declaration
SETLOCAL EnableDelayedExpansion

rem Number of arguments to skip
SET args=
SET skip=2
SET position=0

rem https://stackoverflow.com/questions/4871620/how-to-pass-multiple-params-in-batch
rem https://stackoverflow.com/questions/9363080/how-to-make-shift-work-with-in-batch-files
rem https://superuser.com/questions/78496/variables-in-batch-file-not-being-set-when-inside-if
rem https://stackoverflow.com/questions/41066717/batch-file-changing-variable-value-in-a-for-loop
FOR %%a IN (%*) DO (
  rem Do Not change line feed
  IF !position! LSS %skip% (
	SET /a position=!position!+1 
  ) ELSE ( 
	SET args=!args! %%a 
  )
)

START "" %2 %args%

ENDLOCAL


