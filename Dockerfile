FROM node:8.15.1-alpine

EXPOSE 8080

WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install --verbose

CMD [ "npm", "start" ]
