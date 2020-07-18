- Apuntar mejoras


GET TEST
./ab.exe -k -n 1000 -c 1000 localhost:8081/api/v1/counter


POST TEST
./ab.exe -p  -n 500 -c 500 localhost:3000/api/v1/counter/inc

TEST
./ab.exe -k -n 1000 -c 1000 localhost:8081/api/v1/counter/ && ./ab.exe -k -p body.txt -n 1000 -c 1000 localhost:8081/api/v1/counter/inc


