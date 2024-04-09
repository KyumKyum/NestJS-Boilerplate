#!/bin/sh

echo "Executing shell script to set up PostgreSQL..."

# Define paths and ports
SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
PROJECT_PATH="$(dirname "$SCRIPT_PATH")"
DATA_PORT=6457

echo "Project Path: $PROJECT_PATH"

set -e

# Check and stop running postgres container
CONTAINER_NAME="postgres"
if docker container inspect $CONTAINER_NAME >/dev/null 2>&1; then
  echo 'Container exists! Terminating the container...'
  docker stop $CONTAINER_NAME
  echo
fi

# Create data directory for storing PostgreSQL data
mkdir -p "$PROJECT_PATH/../pgdata"

# Ensure the volume exists
if ! docker volume ls | grep -q postgres_data; then
    echo 'Volume does not exist! Creating...'
    docker volume create postgres_data
    echo
fi

# Run PostgreSQL container
docker run --rm --name $CONTAINER_NAME -p ${DATA_PORT}:5432 \
  -v "$PROJECT_PATH/pgdata:/var/lib/postgresql/data" \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -d postgres:9.6.15-alpine

echo "PostgreSQL Container started!"

MAX_RETRIES=30
WAIT_SECONDS=2
ATTEMPTS=0

# Attempt connection to PostgreSQL
until docker exec $CONTAINER_NAME pg_isready -U postgres -h localhost -p 5432; do
  ATTEMPTS=$((ATTEMPTS + 1))

  if [ $ATTEMPTS -ge $MAX_RETRIES ]; then
    echo "❌ Error: Failed to connect to PostgreSQL after $MAX_RETRIES attempts. Exiting... ❌"
    exit 1
  fi

  echo "Connection attempt $ATTEMPTS failed. Retrying in $WAIT_SECONDS seconds..."
  sleep $WAIT_SECONDS
done

CONTAINER_ID="$(docker ps -aqf "name=$CONTAINER_NAME")"

# Check if the 'zkvoting' database exists and create it if not
DB_EXISTS=$(docker exec "$CONTAINER_ID" psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'zkvoting'")
if [ "$DB_EXISTS" != "1" ]; then
  docker exec "$CONTAINER_ID" psql -U postgres -c "CREATE DATABASE zkvoting WITH ENCODING='UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8';"
  echo "Database 'zkvoting' created."
else
  echo "Database 'zkvoting' already exists."
fi

echo "✨ PostgreSQL is up and running! ✨"
