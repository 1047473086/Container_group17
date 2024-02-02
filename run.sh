#execute: chmod +x run.sh ./run.sh
docker compose down
DOCKER_BUILDKIT=0 docker-compose up --build -d
#db command
docker exec -it flask-api flask db init
docker exec -it flask-api flask db migrate
docker exec -it flask-api flask db upgrade
docker exec -it flask-api python populate_db.py

#sudo docker-compose ps
#sudo docker-compose logs flask-api