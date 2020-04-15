#!/usr/bin/env bash

# Forces running containers to stop.
docker-compose kill

# Forcefully removes any stopped service containers.
docker-compose rm -f

docker-compose up
