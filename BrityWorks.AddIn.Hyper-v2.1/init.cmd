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
if not exist "%AppData%\Brity RPA Designer v2.1" (
	mklink /D "%AppData%\Brity RPA Designer v2.1" "%AppData%\Brity RPA Designer"
)

if exist External\Designer (
	rmdir /S /Q External\Designer
)

mklink /D External\Designer "%AppData%\Brity RPA Designer v2.1"
ECHO ===============================================================================