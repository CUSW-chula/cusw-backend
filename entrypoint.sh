#!/bin/bash
# entrypoint.sh

# Run migrations
bunx prisma migrate deploy

# Start the application
exec "$@"