#!/bin/bash
echo 'Start script'
echo 'Connecting to mongoDB container'
docker exec -it $(docker ps | grep db-interface_mongodb | awk '{print $1}') mongo db-interface --eval "db.locations.remove({}) && db.persons.remove({}) && db.addresses.remove({}) && db.changes.remove({}) && db.relations.remove({}) && quit()"
echo 'Database is clear'
node ../backend/bin/parserFromGSheets/index.js
echo 'New data was save'
exit 0
