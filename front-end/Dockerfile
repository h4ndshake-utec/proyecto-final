FROM node

WORKDIR /front-end 

COPY . .
 
RUN npm install -g npm@8.19.2 && npm install && npm install -g npm@8.19.2

EXPOSE 4200
 
CMD [ "npm", "start" ]
