#################################### commands to deploy GMS Docker ####################################

# Build 
sudo docker-compose build
# Migrate database (It will become SECONDARY once loading the database will be performed )
sudo docker-compose run django python3 manage.py migrate
# Load datatbase
cat dump_20-09-2018_16_57_07.sql | sudo docker exec -i biosensors_db_1 psql -Upostgres
# Run containers
sudo docker-compose up


# connect to database docker
sudo docker exec -it biosensors_db_1 bash


# Backup database
sudo docker exec -t -u postgres biosensors_db_1 pg_dumpall -c > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
# Restore database snapshot
cat dump_20-09-2018_16_57_07.sql | sudo docker exec -i biosensors_db_1 psql -Upostgres