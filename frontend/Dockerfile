# Versión de node.js
FROM node:14

# Establecer directorio de trabajo del contenedor
WORKDIR /app

# Copiae el archivo packaje.json al directorio de trabajo del contenedor
COPY package*.json ./

# Instalar las dependencias definidas en package.json
RUN npm install

# Copiar todos los archivos del directorio actual en el host al directorio de trabajo del contenedor 
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Definir el comando a ejecutar por defecto al inicializar el contenedor (iniciar el servidor de desarrollo React)
CMD ["npm", "start"]
