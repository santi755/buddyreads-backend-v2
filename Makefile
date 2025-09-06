build:
	docker compose build --no-cache

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

#clean:
#	docker stop $(docker ps -aq)
#	docker rm $(docker ps -aq)
#	docker rmi $(docker images -q)