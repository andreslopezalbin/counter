FROM node:14-alpine

WORKDIR /

COPY . /

RUN npm install --quiet

EXPOSE 8080
CMD ["npm", "start"]