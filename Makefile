build:
	docker compose build --no-cache
	docker compose run --rm app npm ci

up:
	docker compose up 

down:
	docker compose down

down-v:
	docker compose down -v

logs:
	docker compose logs -f

reset:
	make down-v
	make up

bash:
	docker exec -it buddyreads-backend-v2-app-1 bash

mongo-bash:
	docker exec -it buddyreads-backend-v2-mongodb-1 mongosh

postgres-bash:
	docker exec -it buddyreads-backend-v2-postgres-1 psql -U postgres -d buddyreads

check-name:
ifndef NAME
	$(error NAME is required. Use: make db-generate-name NAME="your_migration_name")
endif
	
db-generate: check-name
	docker compose run --rm app npm run db:generate ${NAME}

db-migrate:
	docker compose run --rm app npm run db:migrate

db-push:
	docker compose run --rm app npm run db:push

db-studio:
	docker compose run --rm app npm run db:studio

db-drop:
	docker compose run --rm app npm run db:drop

#clean:
#	docker stop $(docker ps -aq)
#	docker rm $(docker ps -aq)
#	docker rmi $(docker images -q)