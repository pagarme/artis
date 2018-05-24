#!/bin/bash

echo Killing docker
sudo docker-compose down
sudo docker rmi e0f19d6c7e5e

echo Uploading Application container
docker-compose up -d
