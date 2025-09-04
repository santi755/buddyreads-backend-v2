FROM node:22-bullseye

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copiar solo package.json primero
COPY package*.json ./

# Instalar dependencias como root
RUN npm ci

# Copiar código fuente
COPY . .

# ✅ Crear todos los directorios que MikroORM podría necesitar
RUN mkdir -p /app/temp \
    && mkdir -p /app/logs \
    && mkdir -p /app/dist \
    && mkdir -p /app/src/migrations \
    && chown -R appuser:appuser /app

# ✅ Dar permisos de escritura completos al directorio de la app
RUN chmod -R 755 /app

# Cambiar al usuario no-root
USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["npm", "run", "dev"]