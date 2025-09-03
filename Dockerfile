FROM node:22-bullseye

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copiar solo package.json primero
COPY package*.json ./

# Instalar dependencias como root
RUN npm install

# Copiar código fuente
COPY . .

# Crear directorio para logs y dar permisos
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app

# Cambiar al usuario no-root
USER appuser

EXPOSE 8080
CMD ["npm", "run", "dev"]