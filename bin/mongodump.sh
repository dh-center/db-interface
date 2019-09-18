#!/bin/bash
now=$(date '+%d-%m-%Y_%H-%M-%S')

docker-compose -f ./docker-compose.dev.yml exec -T mongodb mongodump --archive > dump_$now.gz
