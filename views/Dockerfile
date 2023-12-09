# Usa una imagen de Node.js como base
FROM node:18.17.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación para la producción
RUN npm run build

# Expone el puerto 3000 para acceder a la aplicación en el navegador
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación cuando el contenedor se inicia
CMD ["npm", "start"]
