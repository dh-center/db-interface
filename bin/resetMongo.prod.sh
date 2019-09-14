#!/bin/bash
echo 'Start script'
echo 'Copy credentials.json to container'
docker cp ./credentials.json "$(docker-compose -f docker-compose.prod.yml ps -q api)":/usr/src/app/bin/parserFromGSheets
echo 'Connecting to mongoDB container'
docker-compose -f docker-compose.prod.yml exec mongodb mongo db-interface --eval "db.locations.remove({}) && db.persons.remove({}) && db.addresses.remove({}) && db.changes.remove({}) && db.relations.remove({}) && db.relationtypes.remove({}) && db.locationtypes.remove({}) && quit()"
echo 'Database is clear'
docker-compose -f docker-compose.prod.yml exec api sh -c "node bin/parserFromGSheets/index.js"
echo 'New data was save'
exit 0
