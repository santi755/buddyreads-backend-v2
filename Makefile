# Build the Docker image
build:
	docker compose build

# Run the Docker container
run:
	docker compose up

bash:
	docker exec -it buddyreads-backend-v2-app-1 bash

#clean:
#	docker stop $(docker ps -aq)
#	docker rm $(docker ps -aq)
#	docker rmi $(docker images -q)