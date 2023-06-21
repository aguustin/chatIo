# ChatIo
## Descripcion:
### Simulador de un chat en tiempo real con creacion de grupos y agregacion de usuarios a estos.

### IMPORTANTE:
### Para pode ejecutar la app una vez bajada de github hay que realizar los siguientes pasos:
- En la terminal dentro de C:rutaDeLaCarpeta/sublimeInk instalar nodemon ( npm i nodemon -D ) y ejecutar el comando "npm run dev"
- En otra ventana de la terminal dentro de C:rutaDeLaCarpeta/sublimeInk/client instalar los scripts de react (npm i react-scripts) y ejecutar el comando "npm start"

## Herramientas utilizadas
- HTML
- CSS
- TAILWINDCSS
- REACT JS
- NODE JS
- EXPRESS JS
- MONGODB
- POSTMAN
- SOCKET IO

## Api ##
__- chatRequest.jsx -__
__- request.jsx -__
__- socialRequest.jsx -__

## Componentes ##
__- detailsBody -__
__- detailsEdit -__
__- loginRegister -__
__- navigation -__
__- signOut -__
__- utils -__
__- img -__
- chat:
__- chatBody -__
__- nav -__

## Context ##
__- chatContext.jsx -__
__- userContext.jsx -__

## Server ##
__- controllers -__
__- libs -__
__- models -__
__- routes -__
__- config.js -__
__- db.js -__
__- index.js -__

## Descripcion de las funcionalidades: ##

## FRONTEND ##

### __api__: Conecta las peticiones http del frontend con el backend con axios.

### __App__: Componente principal de la app. Instancia todos los componentes de la web para que todos se ejecuten dentro de este.

### __chat__: Contiene vista del contenedor de mensajes y navegacion lateral para interactuar con los canales y el boton de logout.

### __detailsBody__: Contiene las vistas de las credenciales del usuario para ingresar con su cuenta y la de edicion de sus credenciales.

### __loginRegistar__: Contiene la vista para ingresar con una cuenta ya registrada o registrar una nueva cuenta.

### __utils__: Contiene los layouts de aviso de "member added!" y "cannot add member.

### __chatContext__: Contiene todos los estados globales de la web para el manejo de los canales y los mensajes.

### __userContext__: Contiene todos los estados globales de la web para el manejo de las credenciales de los usuarios.

### __img__: Contiene imagenes para la vista de la web.

## BACKEND ##

### __controllers__: Contiene los controladores del backend donde se ejecutan funciones de requerimientos y respuestas con la base de datos.

### __libs__: Contiene las credenciales de la api cloudinary para subir las imagenes a una carpeta del servicio.

### __models__: Configuracion del esquema de la base de datos.

### __routes__: Configuracion de las rutas con las peticiones http de la web.

### __config.js__: Instancia las variables de entorno.

### __db.js__: Funcion con la configuracion para la conexion a la base de datos.

### __index.js__: Configuracion necesaria del servidor para su correcto funcionamiento e iniciacion de este.

### __.env__: Contiene los datos de las variables de entorno.