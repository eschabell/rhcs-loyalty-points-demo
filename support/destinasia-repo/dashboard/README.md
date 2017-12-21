## Demo for socket.io

### Running this app

Assuming you have nodejs setup

  * If you are running for the first time , `npm install` 

  * To run the app, `npm start`

### Testing the app

  * open the url `http://<hostname>:8080`

  * prepare a payload in json format


#### Use case 1 : booking request

  Create the following payload in a file, e.g. `payload.json`

  ```
  { 
    "traveller": "Jim",  
    "flightReq" : 
     { "flightFrom": "GRU",
       "flightTo": "SCL",
       "flightDate": "2017-02-28",
       "flightPassengers": 5,
       "flightNo": "TA12" },
    "hotelReq": 
     { "hotelArrivalDate": "2017-02-28",
       "hotelNights": 50,
       "hotelCity": "SCL",
       "hotelId": "SheratonSantiago" },
    "carReq": 
     { "carCity": "SCL",
       "carRentalCo": "Hertz",
       "carType": "Econ",
       "carStartDate": "2017-02-28",
       "carDays": 50 } 
  }
```


  * fire the command 

  `curl -X POST -H "Content-Type: application/json" -d @payload.json http://<host>:8080/events`

  You should see some text being displayed on the browser

#### Use case 2 :POD counts

  Create the following payload in a file, e.g. `payload.json`

  ```
  { "podCount" : "5" }
 ```

  e.g. `curl  -X POST -H "Content-Type: application/json" -d '{"podCount":"5"}' http://<host>/events;`

  * fire the command 


  You should see some text being displayed on the browser


#### Use case 3 : Event from backend

  Create the following payload in a file, e.g. `payload.json`

  ```
  { "event" : "fuse" }
 ```
 
  Note the additional path 

  e.g. `curl  -X POST -H "Content-Type: application/json" -d '{"event":"fuse"}' http://<host>/events/fuse;`

  * fire the command 


  You should see some text being displayed on the browser

### testScripts

 createBookings.sh <host>
