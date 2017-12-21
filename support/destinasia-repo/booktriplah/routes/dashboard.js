var express = require('express');
var router = express.Router();
 var request = require('request');

/* GET home page. */
router.post('/', function(req, res, next) {
console.log('dashboard.js');
//var url='http://dashboard-wohshon-destinasia.apps.dev.openshift.opentlc.com/events';
var url=process.env.DASHBOARD_URL || 'http://dashboard-destinasia.cloudapps.destinasia.io/events';

//hosted on ocp
if (process.env.DASHBOARD_SERVICE_HOST && process.env.DASHBOARD_SERVICE_PORT) {
   url='http://'+process.env.DASHBOARD_SERVICE_HOST+':'+process.env.DASHBOARD_SERVICE_PORT+'/events';
}

console.log('url:'+url);

console.log(JSON.stringify(req.body['bookReq']));

  request(
    { method: 'POST'
    , uri: url
    , body: JSON.stringify(req.body['bookReq'])
    , headers: {
    'Content-type': 'application/json'
  }
    }
  , function (error, response, body) {
      // body is the decompressed response body 
      console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
      console.log('the decoded data is: ' + body)
    }
  ).on('data', function(data) {
    // decompressed data as it is received 
    console.log('decoded chunk: ' + data)
  })
  .on('response', function(response) {
    // unmodified http.IncomingMessage object 
    response.on('data', function(data) {
      // compressed data as it is received 
     res.send(data); 
      console.log('received ' + data.length + ' bytes of compressed data')
    })
  })



//res.sendfile("views/index.html");
});

module.exports = router;
