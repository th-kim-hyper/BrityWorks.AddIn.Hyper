@ECHO OFF

rem Wait until certain process finishes, and execute another process.
rem This batch can be used to Restart Application
rem %1 : Proces Name ex) BrityRPA_Designer.exe
rem %2 : .exe Path ex) C:\\BrityRPA_Designer.exe

:LOOP
TASKLIST | findstr %1 >nul 2>&1
IF ERRORLEVEL 1 (
  GOTO CONTINUE
) ELSE (
  GOTO LOOP
)

:CONTINUE

START "" %2