var express = require('express');
var router = express.Router();
var http = require('http');
var Bottleneck = require("bottleneck"); // Skip when browser side 
// new Bottlenecl (x,y)
// Never more than x request running at a time. 
// Wait at least yms between each request.
var limiter = new Bottleneck(2, 500);

var FuseEvent=0;

router.post('/fuse', function(req, res, next) {
       //FuseEvent=0;
       FuseEvent++;
       console.log("Count:"+FuseEvent);
       console.log(req.body);
	limiter.submit( function(cb){ 
       //call(req.body,'/events/fuse');
       var event={"event": FuseEvent};
       if (FuseEvent > 0) {
           call(event,'/events/fuse');
           FuseEvent=0;
         }
      	   cb();

    	     }, null);

	  res.send('ok!');
});

router.post('/', function(req, res, next) {
  limiter.submit( function(cb){ 
    call(req.body,'/events');
      cb();
    }, null);
    res.send('ok!');
});

//var url='http://192.168.223.130:8080';
//var url='http://socket-dashboard.cloudapps.forum.rhtechofficelatam.com';
//RHPDS
//var url='http://dashboard-wohshon-destinasia.apps.dev.openshift.opentlc.com';
//RHF2017
//var url='http://dashboard-destinasia.cloudapps.destinasia.io';
var url='http://dashboard.destinasia.svc.cluster.local:8080';

if (process.env.DASHBOARD_SERVICE_HOST && process.env.DASHBOARD_SERVICE_PORT) {
   url=process.env.DASHBOARD_SERVICE_HOST+':'+process.env.DASHBOARD_SERVICE_PORT;
}


var request=require('request');
function call(payload, path) {

    request({
      json : true,
      method: 'POST',
      url : url+path,
      body: payload,
      headers : {

        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      if (err || !body){
      console.log(body);

      }

    });


}//call


module.exports = router;
