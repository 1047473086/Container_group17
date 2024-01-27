#execute: chmod +x run.sh ./run.sh
sudo docker compose down
sudo DOCKER_BUILDKIT=0 docker-compose up --build -d
#db command
sudo docker exec -it flask-api flask db init
sudo docker exec -it flask-api flask db migrate
sudo docker exec -it flask-api flask db upgrade
sudo docker exec -it flask-api python populate_db.py

#sudo docker-compose ps
#sudo docker-compose logs flask-api