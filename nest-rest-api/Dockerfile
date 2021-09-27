FROM node:alpine

WORKDIR /home/nest-rest-api

COPY package*.json ./

RUN npm install

COPY src ./src/
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npm run build

EXPOSE 3000

CMD npm run start
