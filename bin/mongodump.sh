#!/bin/bash

if [ $# -ne 1 ]; then
    echo "You must enter exactly 1 command line arguments: env name (prod or dev)"
    exit 1
fi

now=$(date '+%d-%m-%Y_%H-%M-%S')

docker-compose -f ./docker-compose.$1.yml exec -T mongodb mongodump --archive > dump_$now.dump
