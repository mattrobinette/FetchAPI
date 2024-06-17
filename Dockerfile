FROM ubuntu:latest

RUN apt update
RUN apt install -y nodejs

RUN mkdir -p /usr/local/express-api

COPY . /usr/local/express-api

# auto build and copy angular app

EXPOSE 3000

WORKDIR /usr/local/expres-api
ENTRYPOINT ["node", "/usr/local/express-api/index.js"]
