'use strict';

var myApp = angular.module('myApp.controllers', ["fhcloud"]);

myApp.controller('MainCtrl', function($scope,$routeParams,$http) {
    //alert(Object.keys($routeParams));
    if ($routeParams.traveller) {
      $scope.traveller=$routeParams.traveller.replace(/</g, "&lt;").replace(/>/g, "&gt;");;
    }
  $scope.flightRecords = [
      {"flightOrigin":"EZE","flightDestination":"GRU","flightNo":"AR12", "flightDepTime":"12:20", "flightArrTime": "14:40"},
      {"flightOrigin":"EZE","flightDestination":"SCL","flightNo":"AR23", "flightDepTime":"13:20", "flightArrTime": "15:40"},
      {"flightOrigin":"EZE","flightDestination":"BOG","flightNo":"AR43", "flightDepTime":"16:00", "flightArrTime": "18:40"},
      {"flightOrigin":"EZE","flightDestination":"MEX","flightNo":"AR13", "flightDepTime":"20:00", "flightArrTime": "05:40"},
 	  {"flightOrigin":"EZE","flightDestination":"SIN","flightNo":"AR14", "flightDepTime":"00:20", "flightArrTime": "06:00"},
 	  {"flightOrigin":"EZE","flightDestination":"PEK","flightNo":"AR15", "flightDepTime":"16:50", "flightArrTime": "18:00"},     
      {"flightOrigin":"GRU","flightDestination":"SCL","flightNo":"TA12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"GRU","flightDestination":"BOG","flightNo":"TA22", "flightDepTime":"9:00",  "flightArrTime": "12:40"},
      {"flightOrigin":"GRU","flightDestination":"MEX","flightNo":"TA33", "flightDepTime":"02:00", "flightArrTime": "05:40"},
      {"flightOrigin":"GRU","flightDestination":"EZE","flightNo":"TA44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
 	  {"flightOrigin":"GRU","flightDestination":"SIN","flightNo":"TA55", "flightDepTime":"00:50", "flightArrTime": "07:30"},
 	  {"flightOrigin":"GRU","flightDestination":"PEK","flightNo":"TA66", "flightDepTime":"10:00", "flightArrTime": "13:05"},
      {"flightOrigin":"SCL","flightDestination":"EZE","flightNo":"LA12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"SCL","flightDestination":"BOG","flightNo":"LA22", "flightDepTime":"9:00",  "flightArrTime": "12:40"},
      {"flightOrigin":"SCL","flightDestination":"MEX","flightNo":"LA33", "flightDepTime":"02:00", "flightArrTime": "05:40"},
      {"flightOrigin":"SCL","flightDestination":"GRU","flightNo":"LA44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
   	  {"flightOrigin":"SCL","flightDestination":"SIN","flightNo":"LA55", "flightDepTime":"11:50", "flightArrTime": "19:50"},
      {"flightOrigin":"SCL","flightDestination":"PEK","flightNo":"LA66", "flightDepTime":"02:30",  "flightArrTime": "11:35"},
      {"flightOrigin":"BOG","flightDestination":"EZE","flightNo":"AV12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"BOG","flightDestination":"SCL","flightNo":"AV22", "flightDepTime":"09:00", "flightArrTime": "12:40"},
      {"flightOrigin":"BOG","flightDestination":"MEX","flightNo":"AV33", "flightDepTime":"02:00", "flightArrTime": "05:40"},
      {"flightOrigin":"BOG","flightDestination":"GRU","flightNo":"AV44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
   	  {"flightOrigin":"BOG","flightDestination":"SIN","flightNo":"AV55", "flightDepTime":"09:05", "flightArrTime": "14:15"},
 	  {"flightOrigin":"BOG","flightDestination":"PEK","flightNo":"AV66", "flightDepTime":"13:50", "flightArrTime": "22:40"},      
      {"flightOrigin":"MEX","flightDestination":"EZE","flightNo":"AM12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"MEX","flightDestination":"SCL","flightNo":"AM22", "flightDepTime":"09:00", "flightArrTime": "12:40"},
      {"flightOrigin":"MEX","flightDestination":"BOG","flightNo":"AM33", "flightDepTime":"02:00", "flightArrTime": "05:40"},
      {"flightOrigin":"MEX","flightDestination":"GRU","flightNo":"AM44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
      {"flightOrigin":"MEX","flightDestination":"SIN","flightNo":"AM55", "flightDepTime":"13:30", "flightArrTime": "19:05"},
      {"flightOrigin":"MEX","flightDestination":"PEK","flightNo":"AM66", "flightDepTime":"20:00", "flightArrTime": "04:10"},
      {"flightOrigin":"SIN","flightDestination":"EZE","flightNo":"SG12", "flightDepTime":"00:10", "flightArrTime": "19:35"},
      {"flightOrigin":"SIN","flightDestination":"SCL","flightNo":"SG22", "flightDepTime":"07:45", "flightArrTime": "10:35"},
      {"flightOrigin":"SIN","flightDestination":"BOG","flightNo":"SG33", "flightDepTime":"00:45", "flightArrTime": "11:40"},
      {"flightOrigin":"SIN","flightDestination":"GRU","flightNo":"SG44", "flightDepTime":"00:35", "flightArrTime": "08:25"},
      {"flightOrigin":"SIN","flightDestination":"MEX","flightNo":"SG55", "flightDepTime":"08:55", "flightArrTime": "11:40"},
      {"flightOrigin":"SIN","flightDestination":"PEK","flightNo":"SG66", "flightDepTime":"08:45", "flightArrTime": "02:50"},
      {"flightOrigin":"PEK","flightDestination":"EZE","flightNo":"CN12", "flightDepTime":"08:20", "flightArrTime": "11:30"},
      {"flightOrigin":"PEK","flightDestination":"SCL","flightNo":"CN22", "flightDepTime":"19:40", "flightArrTime": "01:00"},
      {"flightOrigin":"PEK","flightDestination":"BOG","flightNo":"CN33", "flightDepTime":"00:20", "flightArrTime": "14:55"},
      {"flightOrigin":"PEK","flightDestination":"GRU","flightNo":"CN44", "flightDepTime":"08:25", "flightArrTime": "12:45"},
      {"flightOrigin":"PEK","flightDestination":"MEX","flightNo":"CN55", "flightDepTime":"01:05", "flightArrTime": "18:10"},
      {"flightOrigin":"PEK","flightDestination":"SIN","flightNo":"CN66", "flightDepTime":"00:10", "flightArrTime": "06:45"}      
      ];

  $scope.hotelRecords=[
    {"hotelCity":"SCL","hotelChain":"Intercontinental", "hotelName": "Mumbai Marine Drive", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Intercontinental", "hotelName": "Seoul Grand Parnas", "hotelStars":5},
    {"hotelCity":"BOG","hotelChain":"Hyatt", "hotelName": "Sydney Darling Harbour", "hotelStars":5},
    {"hotelCity":"MEX","hotelChain":"Crowne Plaza", "hotelName": "Auckland", "hotelStars":5},
    {"hotelCity":"SIN","hotelChain":"Marriott", "hotelName": "Tang Plaza", "hotelStars":5},
    {"hotelCity":"PEK","hotelChain":"Marriott", "hotelName": "Beijing", "hotelStars":5},
    {"hotelCity":"GRU","hotelChain":"Marriott", "hotelName": "Tokyo Ginza Hotel", "hotelStars":5}
    ];

/*
  $scope.flightRecords = [
      {"flightOrigin":"EZE","flightDestination":"GRU","flightNo":"AR12", "flightDepTime":"12:20", "flightArrTime": "14:40"},
      {"flightOrigin":"EZE","flightDestination":"SCL","flightNo":"AR23", "flightDepTime":"13:20", "flightArrTime": "15:40"},
      {"flightOrigin":"EZE","flightDestination":"BOG","flightNo":"AR43", "flightDepTime":"16:00", "flightArrTime": "18:40"},
      {"flightOrigin":"EZE","flightDestination":"MEX","flightNo":"AR13", "flightDepTime":"20:00", "flightArrTime": "5:40"},
      {"flightOrigin":"GRU","flightDestination":"SCL","flightNo":"TA12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"GRU","flightDestination":"BOG","flightNo":"TA22", "flightDepTime":"9:00", "flightArrTime": "12:40"},
      {"flightOrigin":"GRU","flightDestination":"MEX","flightNo":"TA33", "flightDepTime":"2:00", "flightArrTime": "5:40"},
      {"flightOrigin":"GRU","flightDestination":"EZE","flightNo":"TA44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
      {"flightOrigin":"SCL","flightDestination":"EZE","flightNo":"LA12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"SCL","flightDestination":"BOG","flightNo":"LA22", "flightDepTime":"9:00", "flightArrTime": "12:40"},
      {"flightOrigin":"SCL","flightDestination":"MEX","flightNo":"LA33", "flightDepTime":"2:00", "flightArrTime": "5:40"},
      {"flightOrigin":"SCL","flightDestination":"GRU","flightNo":"LA44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
      {"flightOrigin":"BOG","flightDestination":"EZE","flightNo":"AV12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"BOG","flightDestination":"SCL","flightNo":"AV22", "flightDepTime":"9:00", "flightArrTime": "12:40"},
      {"flightOrigin":"BOG","flightDestination":"MEX","flightNo":"AV33", "flightDepTime":"2:00", "flightArrTime": "5:40"},
      {"flightOrigin":"BOG","flightDestination":"GRU","flightNo":"AV44", "flightDepTime":"14:00", "flightArrTime": "15:40"},
      {"flightOrigin":"MEX","flightDestination":"EZE","flightNo":"AM12", "flightDepTime":"11:20", "flightArrTime": "13:40"},
      {"flightOrigin":"MEX","flightDestination":"SCL","flightNo":"AM22", "flightDepTime":"9:00", "flightArrTime": "12:40"},
      {"flightOrigin":"MEX","flightDestination":"BOG","flightNo":"AM33", "flightDepTime":"2:00", "flightArrTime": "5:40"},
      {"flightOrigin":"MEX","flightDestination":"GRU","flightNo":"AM44", "flightDepTime":"14:00", "flightArrTime": "15:40"}
      ];


  $scope.hotelRecords=[
    {"hotelCity":"SCL","hotelChain":"Sheraton", "hotelName": "Santiago", "hotelStars":5},
    {"hotelCity":"SCL","hotelChain":"Hilton", "hotelName": "Santiago", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Sheraton", "hotelName": "Buenos ires", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Hilton", "hotelName": "PuertoMadero", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Holiday Inn", "hotelName": "Retiro", "hotelStars":4},
    {"hotelCity":"BOG","hotelChain":"W", "hotelName": "Bogotá", "hotelStars":5},
    {"hotelCity":"BOG","hotelChain":"Hilton", "hotelName": "Bogotá", "hotelStars":5},
    {"hotelCity":"MEX","hotelChain":"Hyatt", "hotelName": "DF", "hotelStars":5},
    {"hotelCity":"MEX","hotelChain":"Marriot", "hotelName": "DF", "hotelStars":5},
    {"hotelCity":"GRU","hotelChain":"BlueTree", "hotelName": "FariaLima", "hotelStars":5},
    {"hotelCity":"GRU","hotelChain":"Pullman", "hotelName": "VilaOlimpa", "hotelStars":5},
      
    {"hotelCity":"SIN","hotelChain":"Intercontinental", "hotelName": "Tang Plaza", "hotelStars":5},
    {"hotelCity":"KUL","hotelChain":"Hilton", "hotelName": "Kuala Lumpur", "hotelStars":5},
    {"hotelCity":"BKK","hotelChain":"Sheraton", "hotelName": "Bangkok", "hotelStars":5},
    {"hotelCity":"SGN","hotelChain":"Hilton", "hotelName": "Saigon Hotel and Towers", "hotelStars":5},
    {"hotelCity":"HAN","hotelChain":"Intercontinental", "hotelName": "Hanoi Westlake", "hotelStars":4},
    {"hotelCity":"CGK","hotelChain":"Ritz Carlton", "hotelName": "Jakarta Mega Kuningan", "hotelStars":5},
    {"hotelCity":"MNL","hotelChain":"Shangri-La", "hotelName": "Makati", "hotelStars":5},
    {"hotelCity":"HKG","hotelChain":"Sheraton", "hotelName": "Hong Kong Hotel and Towers", "hotelStars":5},
    {"hotelCity":"PVG","hotelChain":"Marriott", "hotelName": "Shanghai", "hotelStars":5},
    {"hotelCity":"PEK","hotelChain":"Marriott", "hotelName": "Beijing", "hotelStars":5},
    {"hotelCity":"ICN","hotelChain":"Intercontinental", "hotelName": "Seoul Grand Parnas", "hotelStars":5},
    {"hotelCity":"NRT","hotelChain":"Marriott", "hotelName": "Tokyo Ginza Hotel", "hotelStars":5},
    {"hotelCity":"KIX","hotelChain":"Intercontinental", "hotelName": "Osaka", "hotelStars":5},
    {"hotelCity":"BOM","hotelChain":"Intercontinental", "hotelName": "Mumbai Marine Drive", "hotelStars":5},
    {"hotelCity":"BLR","hotelChain":"ITC", "hotelName": "Gardenia", "hotelStars":5},
    {"hotelCity":"DEL","hotelChain":"ITC", "hotelName": "Maurya", "hotelStars":5},
    {"hotelCity":"SYD","hotelChain":"Hyatt", "hotelName": "Sydney Darling Harbour", "hotelStars":5},
    {"hotelCity":"MEL","hotelChain":"Intercontinental", "hotelName": "Melbourne Rialto", "hotelStars":5},
    {"hotelCity":"ALK","hotelChain":"Crowne Plaza", "hotelName": "Auckland", "hotelStars":5},
    {"hotelCity":"CHC","hotelChain":"Rydges", "hotelName": "Christchurch", "hotelStars":5}
    ];

  $scope.hotelRecords=[
    {"hotelCity":"SCL","hotelChain":"Sheraton", "hotelName": "Santiago", "hotelStars":5},
    {"hotelCity":"SCL","hotelChain":"Hilton", "hotelName": "Santiago", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Sheraton", "hotelName": "Buenos ires", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Hilton", "hotelName": "PuertoMadero", "hotelStars":5},
    {"hotelCity":"EZE","hotelChain":"Holiday Inn", "hotelName": "Retiro", "hotelStars":4},
    {"hotelCity":"BOG","hotelChain":"W", "hotelName": "Bogotá", "hotelStars":5},
    {"hotelCity":"BOG","hotelChain":"Hilton", "hotelName": "Bogotá", "hotelStars":5},
    {"hotelCity":"MEX","hotelChain":"Hyatt", "hotelName": "DF", "hotelStars":5},
    {"hotelCity":"MEX","hotelChain":"Marriot", "hotelName": "DF", "hotelStars":5},
    {"hotelCity":"GRU","hotelChain":"BlueTree", "hotelName": "FariaLima", "hotelStars":5},
    {"hotelCity":"GRU","hotelChain":"Pullman", "hotelName": "VilaOlimpa", "hotelStars":5}
    ];

*/

  $scope.carRecords=[
    {"carCity":"SCL","rentalCompany":"Savaari", "carType":"Econ"},
    {"carCity":"SCL","rentalCompany":"Carjee", "carType":"Econ"},
    {"carCity":"EZE","rentalCompany":"Avis", "carType":"Econ"},
    {"carCity":"EZE","rentalCompany":"Lotte", "carType":"Econ"},
    {"carCity":"BOG","rentalCompany":"Thrifty", "carType":"Econ"},
    {"carCity":"BOG","rentalCompany":"Hertz", "carType":"Econ"},
    {"carCity":"MEX","rentalCompany":"Apex", "carType":"Econ"},
    {"carCity":"MEX","rentalCompany":"Hertz", "carType":"Econ"},
    {"carCity":"GRU","rentalCompany":"ToCoo", "carType":"Econ"},
    {"carCity":"GRU","rentalCompany":"Nippon", "carType":"Econ"},   
    {"carCity":"SIN","rentalCompany":"Avis", "carType":"Econ"},
    {"carCity":"SIN","rentalCompany":"Hawk", "carType":"Econ"},  
    {"carCity":"PEK","rentalCompany":"Avis", "carType":"Econ"},
    {"carCity":"PEK","rentalCompany":"eHi", "carType":"Econ"}
    ];

  $scope.queryPage=false;
  $scope.resultsPage=true;
  $scope.quotePage=true;
  
  $scope.travelBookFlight=false;
  $scope.travelBookHotel=false;
  $scope.travelBookCar=false;
  
 
$scope.backToQuery = function(){
  $scope.queryPage=false;
  $scope.resultsPage=true;
  $scope.quotePage=true;
}
$scope.backToResults = function(){
  $scope.queryPage=true;
  $scope.resultsPage=false;
  $scope.quotePage=true;
}
$scope.search = function(){
   
  $scope.flightSel=0;
  $scope.hotelSel=0;
  $scope.carSel=0;
  
  $scope.queryPage=true;
  $scope.resultsPage=false;
  
  $scope.flightRecordsMatch = $scope.flightRecords.filter(function(fl){return ((fl.flightDestination==$scope.travelDestination) && (fl.flightOrigin==$scope.travelOrigin))});
  $scope.hotelRecordsMatch = $scope.hotelRecords.filter(function(h){return h.hotelCity==$scope.travelDestination});
  $scope.carRecordsMatch = $scope.carRecords.filter(function(c){return c.carCity==$scope.travelDestination});
  $scope.traveller=$scope.traveller;

  
};

  $scope.bookTravel = function() {
    var travelOrigin = $scope.travelOrigin;
    var travelDestination = $scope.travelDestination;
    var travelDate = $scope.travelDate;
    var travelPassengers= $scope.travelPassengers;
    var travelDays = $scope.travelDays;

    var flight=$scope.travelBookFlight;
    var hotel=$scope.travelBookHotel;
    var car=$scope.travelBookCar;
    var traveller=$scope.traveller;
    traveller= traveller.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    console.log("----traveller :"+traveller);
    $scope.travellerResp= $scope.traveller
 
    var bookReq = {};
    bookReq["traveller"]=traveller    


    if(flight){
      var selFlight = parseInt($scope.flightSel);
      var flightNo = $scope.flightRecordsMatch[selFlight].flightNo;
      var flightReq = {"flightFrom":travelOrigin, "flightTo": travelDestination, "flightDate": travelDate, "flightPassengers":travelPassengers, "flightNo": flightNo};
      bookReq["flightReq"] = flightReq;
    }
    if(hotel){
      var selHotel = parseInt($scope.hotelSel);
      //var hotelId = $scope.hotelRecordsMatch[selHotel].hotelChain + $scope.hotelRecordsMatch[selHotel].hotelName;
      var hotelId = $scope.hotelRecordsMatch[selHotel].hotelChain + ' ' + $scope.hotelRecordsMatch[selHotel].hotelName;
      var hotelReq = {"hotelArrivalDate":travelDate,"hotelNights":travelDays,"hotelCity": travelDestination,"hotelId":hotelId};
      bookReq["hotelReq"] = hotelReq;
    }
    if(car){
      var selCar = parseInt($scope.carSel);
      var rentalCo = $scope.carRecordsMatch[selCar].rentalCompany;
      var carType = $scope.carRecordsMatch[selCar].carType;
      var carReq = {"carCity":travelDestination,"carRentalCo":rentalCo,"carType":carType,"carStartDate":travelDate,"carDays":travelDays};
       bookReq["carReq"] = carReq;
    }
    var datos={};
    datos["bookReq"] = bookReq;
  // var url='http://fusetravelagency-wohshon-destinasia.apps.dev.openshift.opentlc.com/rest/book';
  var h=                {
                headers: {"Access-Control-Allow-Origin": "*",
                          "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
                          "Access-Control-Allow-Methods": "GET, PUT, POST",
                          "Content-type": "application/json"
                        }
                };

var url="/book";
var dashboard_url="/dashboard"

var  breq = {
 method: 'POST',
 url: url,
 headers: {
  "Access-Control-Allow-Origin": "*" ,
 "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
 "Access-Control-Allow-Methods": "GET, PUT, POST",
 "Content-type": "application/json"
 },
 data: datos
};

//dashboard
var  dreq = {
 method: 'POST',
 url: dashboard_url,
 headers: {
  "Access-Control-Allow-Origin": "*" ,
 "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
 "Access-Control-Allow-Methods": "GET, PUT, POST",
 "Content-type": "application/json"
 },
 data: datos
};

$http(dreq)
	.then(function(response){
		        console.log("GOT RESPONSE  "+(response));
	});


//$http.post(url,datos)
$http(breq)
      .then(function(response){
        console.log("GOT RESPONSE  "+Object.keys(response)); 
        console.log("----"+response.data["techoffice.HotelResp"]); 

        $scope.queryPage=true;
        $scope.resultsPage=true;
        $scope.quotePage=false;
        if (response !== null && typeof(response) !== 'undefined') {
          $scope.flightResp = response.data["techoffice.FlightResp"];
          $scope.hotelResp = response.data["techoffice.HotelResp"];
          $scope.carResp = response.data["techoffice.CarResp"];
  
        } else {
          alert("Error: Expected a message from $fh.cloud.");
        }
      })
      .catch(function(msg, err){
        //If the function
        alert("$fh.cloud failed. Error: " + JSON.stringify(err));
      });
 };
  
});
