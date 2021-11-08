# INSTALCION GOOGLE ClOUD
Instruccion para PowerShell en Windows
```powershell
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe
```

 # DEPLOY
 ## GOOGLE CLOUD FUNCTION 
 Es necesario abrir **Google Cloud SDK Shell** (previamente instalado), esta ejecución de código será aplicada una vez se haya dado de alta un repositorio en *Cloud Source Repositories* ya que de aqui iremos subiendo nuestros cambios.
 ```sh
 gcloud functions deploy [FUNCTION_NAME] \
 --source https://source.developers.google.com/projects/[MY-PROJECT]/repos/[REPOSITORY_ID]/moveable-aliases/master/paths/[SOURCE] \
 --trigger-http \
 --set-env-vars DB_USER=<DB_USER_NAME>,DB_PASS=<DB_PASSWORD>,DB_NAME=<DB_NAME>,CLOUD_SQL_CONNECTION_NAME=<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>;
 ```

# EJECICIOM LOCAL
Configuación de variables de entorno en PowerShell de windows.
Usar en caso de hacer pruebas en una instancia local de MySQL.
```powershell
$env:CLOUD_SQL_CONNECTION_NAME='<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>'
$env:DB_HOST="127.0.0.1:3306"
$env:DB_USER="<DB_USER_NAME>"
$env:DB_PASS="<DB_PASSWORD>"
$env:DB_NAME="<DB_NAME>"
```

## Ejecucion de proxy para ambiente local con acceso a Cloud SQL - MySQL
Configuación de variables de entorno en PowerShell de windows.
Usar en caso de hacer pruebas en una instancia local de MySQL.
```sh
cloud_sql_proxy -instances=<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>=tcp:3306
```