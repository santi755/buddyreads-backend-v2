build:
	docker compose build --no-cache

up:
	docker compose up

down:
	docker compose down

logs:
	docker compose logs -f

reset:
	docker compose down -v
	docker compose up -d

bash:
	docker exec -it buddyreads-backend-v2-app-1 bash

mongo-bash:
	docker exec -it buddyreads-backend-v2-mongodb-1 mongosh

create-migration: 
	docker exec -it buddyreads-backend-v2-app-1 npx mikro-orm migration:create --initial

postgres-bash:
	docker exec -it buddyreads-backend-v2-postgres-1 psql -U postgres -d buddyreads

#clean:
#	docker stop $(docker ps -aq)
#	docker rm $(docker ps -aq)
#	docker rmi $(docker images -q)