# Build the Docker image
build:
	docker compose build

# Run the Docker container
run:
	docker compose up

bash:
	docker exec -it buddyreads-backend-v2-app-1 bash

mongo-bash:
	docker exec -it buddyreads-backend-v2-mongodb-1 mongosh


#clean:
#	docker stop $(docker ps -aq)
#	docker rm $(docker ps -aq)
#	docker rmi $(docker images -q)