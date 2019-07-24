# db-interface

## Deploying

### Manually
1. Deploy MongoDB database
2. Rename `.env.sample` file in `.env` and fill necessary fields.
3. Run `yarn install` to install all project dependencies.
4. Go to the `backend` folder and run `node index.js`.
5. Go to the `frontend` folder and run `yarn build`.
6. Run http server to serve static files in `frontend/dist` folder.

### Docker
See [DOCKER.MD](DOCKER.md) for deploying instructions.
