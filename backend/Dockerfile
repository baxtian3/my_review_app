# Versión de node.js
FROM node:14

# Establecer directorio de trabajo del contenedor
WORKDIR /app

# Copiar el archivo packaje.json al directorio de trabajo del contenedor
COPY package*.json ./

# Instalar las dependencias definidas en package.json
RUN npm install

# Instala el paquete cors
RUN npm install cors

# Copiar todos los archivos del directorio actual en el host al directorio de trabajo del contenedor 
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Definir el comando a ejecutar por defecto al inicializar el contenedor (iniciar el servidor Node.js)
CMD ["node", "server.js"]

