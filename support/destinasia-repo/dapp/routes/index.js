var express = require('express');
var Web3 = require('web3');
var fs = require('fs');
var solc = require('solc');
var Promise = require('promise');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile("index.html", {root: __dirname+'/../views'});
  //sendFile needs absolute path

});

router.post('/getContractAddr', function(req,res,next) {
	try {
//	 addr= fs.readFileSync('./contractAddr').toString();
  var url=req.body.eurl;
  console.log(url);
  web3 = new Web3(new Web3.providers.HttpProvider(url));

	hash=fs.readFileSync('./txHash').toString();
	console.log(hash);
	var tx=web3.eth.getTransactionReceipt(hash)
	console.log(Object.keys(tx));
	if (tx['contractAddress']!=null) {
	  var addr=tx['contractAddress'];
	  res.send('{"addr":"'+addr+'"}');
	}
         else {
		res.send('{"addr":"0"}');
	}
	}
	catch (err) {
	  console.log(err+" error getting file");
	  	                res.send('{"addr":"0"}');
	}
});
router.post('/deployContract', function(req, res, next) {
//router.get('/deployContract/:url', function(req, res, next) {
  //var url=req.params.url;
  //console.log(url);
  //web3 = new Web3(new Web3.providers.HttpProvider("http://pvt-destinasia.cloudapps.destinasia.io"));
  var url=req.body.eurl;
  console.log(url);  
  web3 = new Web3(new Web3.providers.HttpProvider(url));
  code = fs.readFileSync('./Token.sol').toString()
  compiledCode = solc.compile(code)
  console.log("after compiling.. "+web3.eth.accounts +"  "+Object.keys(web3.eth));
  abiDefinition = JSON.parse(compiledCode.contracts[':token'].interface) 
  tokenContract = web3.eth.contract(abiDefinition)
  byteCode = compiledCode.contracts[':token'].bytecode
  console.log("after bytecode.."+web3.eth.accounts[0]);
  web3.personal.unlockAccount(web3.eth.accounts[0],'jboss.1234')
  console.log("after unlock..");
  supply = 10000
  console.log("deploying.... contract...");
  deployedContract = tokenContract.new(
    supply,
    {
      from:web3.eth.accounts[0], 
      data:'0x'+byteCode, 
      gas: 2000000
    }, function(e, contract) {
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              fs.writeFile("./txHash", contract.transactionHash, function(err) {
              if(err) {
                    return console.log(err);
              }

               console.log("Contract Hash was saved! "+contract.address);
               res.send('{"addr":"'+contract.address+'"}');
 
              });



             fs.writeFile("./contractAddr", contract.address, function(err) {
              if(err) {
                    return console.log(err);
              }

               console.log("Contract Addr was saved! "+contract.address);
	      });	
	  // res.send('{"addr":"'+contract.address+'"}');
        }      
  })
});



router.post('/getBalance', function(req, res, next) {
  console.log("in method "+req.body.account);
  var account = req.body.account;
  var config = req.body.config;
  var web3 = new Web3(new Web3.providers.HttpProvider(config.etheURL));
  var abi = JSON.parse(config.tokenContractInterface);
  var tokenContract = web3.eth.contract(abi);
  var contractInstance = tokenContract.at(config.etheContractAddr);
  var bal=contractInstance.coinBalanceOf(account).toLocaleString();
  var returnValue='{"account":"'+account+'", "balance":"'+bal+'"}';
  res.send(returnValue);
});

router.post('/send', function(req, res, next) {
  console.log("in method send "+req.body.sender);
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var value = req.body.value;
  var config = req.body.config;
  var web3 = new Web3(new Web3.providers.HttpProvider(config.etheURL));
  var abi = JSON.parse(config.tokenContractInterface);
  var tokenContract = web3.eth.contract(abi);
  var contractInstance = tokenContract.at(config.etheContractAddr);
  web3.personal.unlockAccount(sender,'jboss.1234');
  contractInstance.sendCoin.sendTransaction(receiver,value,{from: sender});

//  var bal=contractInstance.coinBalanceOf(account).toLocaleString();
//  var returnValue='{"account":"'+account+'", "balance":"'+bal+'"}';
//  res.send(returnValue);
  res.send("ok")
});
module.exports = router;
