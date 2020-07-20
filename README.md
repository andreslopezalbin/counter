# Rate Limiter Proxy

This is a proof of concept about how to implement a proxy server, which has a rate limitation and makes use of a small counter app microservice.

## Structure
This proyect counts with three main folders: the proxy project, the counter project and tests utils folder, including Apache AB for benchmarking and masive requests or one Postman collection. 

```
root
│   .gitignore
│   docker-compose.yml
│   README.md
│   
├───counter
│   │   app.js ------------------------------------> Counter's root file
│   │   Dockerfile                                
│   │   package-lock.json
│   │   package.json ------------------------------> Counter's dependencies file                                 
│   └───node_modules
│       
├───proxy
│   │   Dockerfile
│   │   package-lock.json
│   │   package.json
│   ├───node_modules
│   └───src
│       │   app.js --------------------------------> Proxy's root file
│       ├───api
│       │       counter.service.js ----------------> Proxy's requests to Counter MS
│       └───middlewares
│               limiter.js ------------------------> Proxy's rate limiter middleware
│               
└───utils
        ab.exe ------------------------------------> ab - Apache HTTP server benchmarking tool
        body.txt ----------------------------------> Empty file used in ab POST test
        Collections.postman_collection.json -------> Postman collection with Local and Deployed examples
```
## Running the project

This project can be executed one by one or as a whole using a docker compose file.

### One by one
To run microservice by microservice, you need to have `Node` installed on you computer and type the next commands within the microservice folder:
```
npm i
npm start
```
### As a whole
To run both microservices you need to have `Docker` and `Docker Compose` working locally. Then go to the root folder where you can find the `docker-compose.yml`, type the next and enjoy:
```
docker-compose up --build
```

## Test

In order to test the proof of concept you can try in two different ways: single requests or massive requests. 

### Single requets

To make single requests you can run the project and use the Postman collection located in the utils folder.
Within this collection you will find three folders: one to test the counter MS in local (in AWS is private), other to test the proxy in local and the last one to test the proxy in AWS.

To be able to test in AWS you need to change your hosts file and add `100.26.169.114 counter.aws` then just run the requests under `Proxy AWS`

### Massive requets

For this you can use `ab.exe` (Windows) located under the utils folder or install `apache2-utils` (Linux). Go to utils folder and then type the next commands:

* GET Test
```
(Windows) ./ab.exe -k -n 1000 -c 1000 localhost:8080/api/v1/counter
(Linux)   ab -k -n 1000 -c 1000 localhost:8080/api/v1/counter
```


* POST Test
```
(Windows) ./ab.exe -p body.txt -n 1000 -c 1000 localhost:8080/api/v1/counter/inc
(Linux)   ab -p body.txt -n 1000 -c 1000 localhost:8080/api/v1/counter/inc
```


* Complete Test

You can tests both types doing as follows using `&&`:
```
(Windows) ./ab.exe -k -n 1000 -c 1000 localhost:8080/api/v1/counter/ && ./ab.exe -k -p body.txt -n 1000 -c 1000 
localhost:8080/api/v1/counter/inc
(Linux) ab -k -n 1000 -c 1000 localhost:8080/api/v1/counter/ && ab -k -p body.txt -n 1000 -c 1000 
localhost:8080/api/v1/counter/inc
```



