curl  -X POST -H "Content-Type: application/json" -d @podCount.json  http://127.0.0.1:8080/events  

curl  -X POST -H "Content-Type: application/json" -d @fuseEvent.json  http://127.0.0.1:8080/events/fuse

curl  -X POST -H "Content-Type: application/json" -d @test.json http://127.0.0.8:8080/events

curl -X POST -H "Content-Type: application/json" -d @travelrequest.json http://127.0.0.8:8080/events