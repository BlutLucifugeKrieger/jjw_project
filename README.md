# JJW S.A.S APP   

## Integrantes: Jennifer Forero , Wilson Morales, Juan Castro

## Inicializacion de la api (prueba de la ejecucion del proyecto)

La api de este proyecto esta en la nube mediate el servicio EC2 de AWS, sin embargo,
si gusta, tambien se pueden realizar pelticiones al ejecutar la api de forma local.

Bajo esta premisa, se debera de ejecutar el archivo solucion del repositorio:

![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/dad264ff-ffa1-4243-93fd-c56ea52e7441)

Una vez, desplegado el entorno .NET atraves de Visual Studio, procedemos a ejecutar dicho proyecto (api):

![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/c8fa0a49-eff9-4d17-be79-09b3e493c3ed)

Cuando se ejecute la api, se abrira en el navegador (Opera) el servicio de documentacion Swagger:

![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/88001b21-3052-41cc-9799-c869ae9a0a78)

![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/feffed7c-71fe-4df5-8912-6940f13d5522)

![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/a6713efc-b168-43e7-87b2-399301dd92ee)


Como se puede ver en la imagen, mediante Swagger se puede previsualizar y testear cada endpoint segun una serie de modelos
establecidos en la estructura de la api bajo el patron de diseño MVC.

# Documentacion endpoints ( .NET api)

 ## URL local: https://localhost:7087 
 ## IPV4 publica AWS: ec2-54-166-163-76.compute-1.amazonaws.com:7087 (app dockerizada) 
 ## -> nota: en dado caso que no responda, puede ser, que el contenedor esta pausado.


 -> /clientes  (GET): Al ejecutar este endpoint, se obtendra un arreglo con objetos json de todos los clientes (modelo).
 
 -> /clientes  (POST): Al ejecutar este endpoint, se podra crear un cliente atraves de la estructuracion de un objeto json desde el cuerpo de la peticion.
 
 -> /clientes/search/{Identificacion} (GET): Al ejecutar este endpoint y pasar por parametro la identificacion(numero) de algun cliente, se obtendra el registro completo de dicho cliente.

 -> /employe/login (POST): Al ejecutar este endpoint y crear un objeto json que contenga la cedula del empleado y su contraseña, se obtendra el registro completo de dicho empleado.

 -> /employe/enviar_correos_general (POST): Al ejecutar este endpoint se enviara el correo general (se envia el reporte general por correo).

 -> /employe/enviar_correos_cliente (POST): Al ejecutar este endpoint se enviara el correo especifico del cliente consultado (se envia el reporte especifico por correo).

 -> /employe/enviar_correos_cliente_error/{cc} (POST): Al ejecutar este endpoint y agregar como parametro el documento de un cliente, se envia mediante correo el reporte/ticket informando la falla.

 -> /tasa_cliente/{id} (GET): Al ejecutar este endpoint y agregar el ID del cliente como parametro, se obtiene toda la informacion respecto a la tasa del cliente en particular.
 
 -> /tasa_cliente/mes/{mes} (POST): Al ejecutar este endpoint agregando como parametro el numero del mes y en el cuerpo de la peticion el ID del cliente, se obtendran todos los registros de la tasa de interes del 
                                    mes indicado de dicho cliente.
                                    
 -> /tasa_cliente/total_mes/{mes} (GET): Al ejecutar este endpoint agregando como parametro el numero del mes, se obtendran todos los registros de la tasa de interes segun dicho mes.

 -> /tasa_cliente/info_cliente/{identificacion} (GET): Al ejecutar este endpoint agregando como parametro el numero de identificacion del cliente, se obtinen tanto los registros totales de las tasas de interes   
                                                       sin importar el mes como otros datos que caracterizan a cada cliente (Nombre,apellido,año....) 

## Nota: Para ejemplos de uso, por favor, revisar la interfaz de Swagger (se ejecuta y/o abre cuando se inicializa la API)

# Vistas (React NextJS)
Respecto a la vista de la aplicacion, se podra llegar a los archivos pertinentes atraves de la carpera "views".
Dentro de ella, se observara la estructura de un proyecto React nextjs

 # Vistas defenidas

 ## -> Inicio de sesion - Empleados | Chatbot para clientes

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/3ce4fb30-7b04-4335-bfcb-f970b9b4ea2c)

  ## -> Busqueda de clientes

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/7acfbdf2-cb3f-42d9-9589-641dc4598a29)

  ## -> Despliegue de la informacion del cliente

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/375ef657-b250-47dc-91ff-71c3b83b972c)

  ## -> Interaccion con el chatbot -> Generacion de certificados (especifico y general)

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/b08dcb6b-a005-4b19-b029-ed639920569f)

  ## -> Documento especifico - mes enero

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/bad76834-32c9-4b34-adfa-adce73f23f4f)

  ## -> Documento general - mes enero

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/2023b9cd-64a3-4caa-bde3-4ef45513fb07)

  ## Vista del cliente

  ## -> Mision y Vision de la entidad (JJW S.A.S)

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/59dbb573-a405-4228-ad9e-ab43173ca8fc)

  ## -> Al interactuar con el chatbot y pasarle el documento de un cliente sin errores o discrepancias en la tasa de interes,
  ##    se obtuvo, como resultado.

  ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/7a92b14c-9d29-4d22-be8e-a02d22635772)

 ## -> En caso de que, el documento ingresado, tenga problemas o discrepancias en la tasa de interes, se emitira un correo como este

 ![image](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/86731f13-cf1c-435f-aa11-5a3b80ad823e)

  # Artefactos de arquitectura

  ## -> Componentes

  ![COMPONENTES](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/bddeece7-d99d-40fb-9d39-530af32783ee)

  ## -> Contexto

  ![CONTEXTO](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/aa897fca-db60-45b5-9b45-88c104a013b5)

  ## -> Despliegue

  ![Despliegue](https://github.com/BlutLucifugeKrieger/jjw_project/assets/130005378/909eb6e6-ca7a-4e3c-a8b5-2742c9d77244)


 Artefactos realizados con ARCHIMATE.

 Nota: Archivos de artecfactos incluidos en la raiz del proyecto.

 


  


