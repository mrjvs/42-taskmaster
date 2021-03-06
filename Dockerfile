FROM node:17-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY supervisord ./

VOLUME [ "/app/config.yaml" ]
RUN npm run build

CMD ["npm", "run", "start"]
