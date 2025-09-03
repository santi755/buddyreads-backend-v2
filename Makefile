# Build the Docker image
build:
	docker compose build

# Run the Docker container
run:
	docker compose up

stop:
	docker compose down

bash:
	docker exec -it buddyreads-backend-v2-app-1 bash

mongo-bash:
	docker exec -it buddyreads-backend-v2-mongodb-1 mongosh

create-migration:
	docker exec -it buddyreads-backend-v2-app-1 npx mikro-orm migration:create

postgres-bash:
	docker exec -it buddyreads-backend-v2-postgres-1 psql -U postgres -d buddyreads

prisma-generate:
	docker exec -it buddyreads-backend-v2-app-1 npx prisma generate

# make prisma-create-migration NAME=init
# FIX THIS: https://chatgpt.com/share/68b328dd-d0c8-8010-a52c-f29da76c666c
prisma-create-migration:
	docker exec -it buddyreads-backend-v2-app-1 npx prisma migrate dev --name ${NAME}


#clean:
#	docker stop $(docker ps -aq)
#	docker rm $(docker ps -aq)
#	docker rmi $(docker images -q)