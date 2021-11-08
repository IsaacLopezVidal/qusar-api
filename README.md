# INSTALACIÓN GOOGLE ClOUD
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

# EJECICION LOCAL
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
Para poder ejecutar esta instruccion es necesario descargar el cloud_sql_proxy_x64.exe para caso de windows si necesitas mas informacion y enntra a la documentacion oficial [DOCUMENTACION], se debe tomar en cuenta que ya debe de existir una base y haber instalado **Google Cloud SDK Shell** de lo contrario no se podra ejecutar esta instruccion, tambien es importante recalcar que el correcto funcionamiento debe colocarse en la carperta raiz del proyecto como se muesta en la imagen.
```sh
cloud_sql_proxy -instances=<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>=tcp:3306
```
![Screenshot](https://github.com/JoseLuisSR/quasar/blob/master/doc/img/architecture-ClassView.png?raw=true)

[//] # LINKS DE REFERENCIA
[DOCUMENTACION]: <https://cloud.google.com/sql/docs/mysql/connect-admin-proxy>
![Screenshot] (./docs/cloud_sql_proxy.jpg)