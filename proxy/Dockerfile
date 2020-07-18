FROM node:14-alpine

WORKDIR /src

COPY . /src

RUN npm install --quiet

EXPOSE 8080
CMD ["npm", "start"]