#FROM node
FROM node:14-alpine

WORKDIR /front-end 

COPY package*.json .

RUN yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000
 
CMD [ "npm", "start" ]