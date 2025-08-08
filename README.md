# BuddyReads Backend v2

Backend de Node.js con Express y TypeScript para la aplicación BuddyReads.

## 🚀 Características

- **TypeScript**: Configurado con tipos estrictos
- **Express.js**: Framework web para Node.js
- **ESLint**: Linting con configuración para TypeScript
- **Prettier**: Formateo de código
- **Nodemon**: Recarga automática en desarrollo
- **Dotenv**: Gestión de variables de entorno

## 📋 Prerrequisitos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd buddyreads-backend-v2
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

4. Configura las variables de entorno en el archivo `.env`:

```env
NODE_ENV=development
PORT=3000
```

## 🎯 Scripts disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática
- `npm run build` - Compila el código TypeScript a JavaScript
- `npm run start` - Inicia el servidor en modo producción
- `npm run lint` - Ejecuta ESLint para verificar el código
- `npm run format` - Formatea el código con Prettier
- `npm run clean` - Limpia la carpeta dist

## 📁 Estructura del proyecto

```
buddyreads-backend-v2/
├── src/
│   ├── index.ts          # Punto de entrada de la aplicación
│   └── types/
│       └── environment.d.ts  # Tipos para variables de entorno
├── dist/                 # Código compilado (generado)
├── tsconfig.json         # Configuración de TypeScript
├── eslint.config.ts      # Configuración de ESLint
├── nodemon.json          # Configuración de Nodemon
└── package.json
```

## 🔧 Configuración

### TypeScript

El proyecto está configurado con TypeScript usando:

- Target: ES2022
- Module: ESNext
- Strict mode habilitado
- Source maps para debugging

### ESLint

Configurado con:

- Reglas recomendadas de TypeScript
- Integración con Prettier
- Soporte para archivos .ts y .js

## 🌐 Endpoints disponibles

- `GET /` - Información básica de la aplicación
- `GET /health` - Health check del servidor

## 🚀 Despliegue

1. Compila el proyecto:

```bash
npm run build
```

2. Inicia el servidor:

```bash
npm start
```

## 📝 Licencia

ISC
