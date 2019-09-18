#!/bin/bash
echo 'Start script'
echo 'Connecting to mongoDB container'
cd ..
docker-compose -f docker-compose.dev.yml exec mongodb mongo db-interface --eval "db.locations.remove({}) && db.persons.remove({}) && db.addresses.remove({}) && db.changes.remove({}) && db.relations.remove({}) && db.relationtypes.remove({}) && db.locationtypes.remove({}) && quit()"
echo 'Database is clear'
docker-compose -f docker-compose.dev.yml exec api-dev sh -c "node bin/parserFromGSheets/index.js"
docker-compose -f docker-compose.dev.yml exec api-dev sh -c "node bin/importPersonsFromJSON.js"
echo 'New data was save'
exit 0
