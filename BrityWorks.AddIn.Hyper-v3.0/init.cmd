@ECHO OFF
ECHO ������Ʈ�� ó�� ���� �Ҽ� �ֵ��� �ʱ�ȭ �ϴ� ���Դϴ�.
ECHO ===============================================================================
ECHO. 
ECHO.
ECHO STEP1 : External ���丮 ����
ECHO ===============================================================================
mkdir External
ECHO ===============================================================================
ECHO.
ECHO.
ECHO STEP2 : �����̳� ��ũ ����
ECHO ===============================================================================
if not exist "%AppData%\Brity RPA Designer v3.0" (
	mklink /D "%AppData%\Brity RPA Designer v3.0" "%AppData%\Brity RPA Designer"
)

if exist External\Designer (
	rmdir /S /Q External\Designer
)

mklink /D External\Designer "%AppData%\Brity RPA Designer v3.0"
ECHO ===============================================================================