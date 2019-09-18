#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "dump filename is requred"
    exit 1
fi

cat $1 | docker-compose -f ./docker-compose.dev.yml exec -T mongodb mongorestore --archive --drop
