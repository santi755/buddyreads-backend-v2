#FROM node:22
FROM node:22-bullseye

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app
RUN chown -R appuser:appuser /app

COPY package*.json ./
RUN chown -R appuser:appuser /app

RUN npm install

COPY . .
RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8080
CMD ["npm", "run", "dev"]
