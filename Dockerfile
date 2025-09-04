FROM node:22-bullseye

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copiar solo package.json primero
COPY package*.json ./

# Instalar dependencias como root
RUN npm ci

# Copiar código fuente
COPY . .

# Crear directorio para logs y dar permisos
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app

# Cambiar al usuario no-root
USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["npm", "run", "dev"]