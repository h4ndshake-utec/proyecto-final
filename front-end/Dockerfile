FROM node

WORKDIR /front-end 

COPY . .
 
RUN npm clean-install && npm install

EXPOSE 4200
 
CMD [ "npm", "start" ]
