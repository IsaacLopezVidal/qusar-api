# USO

Iniciamos instalando todas las dependencias del proyecto con la siguiente instrucción
 ```sh
npm install
 ```


## Herramientas

 - Google Cloud Plataform
   - Cloud SQL instancia con MySQL
   - Cloud Functions
   - Cloud Source Repositories
   - Google Cloud SDK

## EJECUCIÓN EN NUBE

Las siguientes son las URL's publicas
- 1 https://us-central1-challege-quasar.cloudfunctions.net/api/topsecret 
- 2 https://us-central1-challege-quasar.cloudfunctions.net/api/topsecret_spllit 
   

## EJECUCIÓN LOCAL
Configuación de variables de entorno en PowerShell de windows.
Usar en caso de hacer pruebas en una instancia local de MySQL.
```powershell
$env:CLOUD_SQL_CONNECTION_NAME='<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>'
$env:DB_HOST="127.0.0.1:3306"
$env:DB_USER="<DB_USER_NAME>"
$env:DB_PASS="<DB_PASSWORD>"
$env:DB_NAME="<DB_NAME>"
```

#### Datos de prueba
Si se desea probar con la conexion a Cloud SQL - MySQL revisar el siguiente punto
```powershell
$env:CLOUD_SQL_CONNECTION_NAME="challege-quasar:us-central1:mysql-challege"
$env:DB_HOST="127.0.0.1:3306"
$env:DB_USER="isaacdb"
$env:DB_PASS="db123"
$env:DB_NAME="dbchallege"
```


## INSTALACIÓN GOOGLE CLOUD

Instruccion para PowerShell en Windows
```powershell
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe
```
## Ejecucion de proxy para ambiente local con acceso a Cloud SQL - MySQL 

Para poder ejecutar esta instrucción es necesario descargar el cloud_sql_proxy_x64.exe para el caso de windows; si es en algun otro ambiente de desarrollo, visitar [DOCUMENTACION] oficial.

Se debe tomar en cuenta que ya debe de existir una base y haber instalado **Google Cloud SDK Shell** de lo contrario no se podra ejecutar esta instrucción, también es importante recalcar que para el correcto funcionamiento debe colocarse en la carperta raiz del proyecto como se muesta en la imagen.

```sh
cloud_sql_proxy -instances=<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>=tcp:3306
```
![Screenshot](https://github.com/IsaacLopezVidal/qusar-api/blob/master/docs/cloud_sql_proxy.jpg)

 # DEPLOY
 ## GOOGLE CLOUD FUNCTION 
 Es necesario abrir **Google Cloud SDK Shell** (previamente instalado), esta ejecución de código será aplicada una vez se haya dado de alta un repositorio en *Cloud Source Repositories* ya que de aqui iremos subiendo nuestros cambios.
 ```sh
 gcloud functions deploy [FUNCTION_NAME] \
 --source https://source.developers.google.com/projects/[MY-PROJECT]/repos/[REPOSITORY_ID]/moveable-aliases/master/paths/[SOURCE] \
 --trigger-http \
 --set-env-vars DB_USER=<DB_USER_NAME>,DB_PASS=<DB_PASSWORD>,DB_NAME=<DB_NAME>,CLOUD_SQL_CONNECTION_NAME=<MY-PROJECT>:<INSTANCE-REGION>:<MY-DATABASE>;
 ```


# Evidencias



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[DOCUMENTACION]: <https://cloud.google.com/sql/docs/mysql/connect-admin-proxy>
