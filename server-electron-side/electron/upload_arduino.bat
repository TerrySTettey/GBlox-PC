
FOR /F "tokens=*" %%g IN ('arduino-cli board list') do (SET VAR=%%g)
SET USB = USB



Echo.%VAR% | findstr /C:"USB">nul && (
    SET COM = %VAR:~0,5%
    SET COM=%COM: =%
) || (
    echo no
)
arduino-cli compile --fqbn arduino:avr:uno ArduinoOutput -v

SET STR2=ArduinoOutput -v
SET STR1= arduino-cli upload --fqbn arduino:avr:uno -p
SET STR3= %STR1%%COM %%STR2%
echo %COM%
%STR3%