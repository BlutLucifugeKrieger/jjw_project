# JJW APP  - Jennifer Forero , Wilson Morales, Juan Castro

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
 
