FROM node:8.9.4

WORKDIR /app

COPY . .

COPY package.json .
COPY tsconfig.json .

VOLUME /app

RUN npm install

CMD npm start

