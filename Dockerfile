FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y curl software-properties-common
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install axios --save
RUN npm install sqlite3 --save

COPY . .

EXPOSE 3003 3004 3002

CMD ["sh", "-c", "node src/Catalog/index.js & node src/Front/index.js & node src/Order/index.js"]
