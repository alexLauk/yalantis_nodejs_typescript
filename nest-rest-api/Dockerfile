FROM node:alpine

WORKDIR /home/nest-rest-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]
