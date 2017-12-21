
var CONFIG={TEST:0, OCP:1};

	var myApp = {
		CONFIG : { 'TEST':0, 'OCP':1},
		envConfigs: [
			{
				etheURL:'http://192.168.223.196:8545',
//				etheContractAddr:'0x2235ccb11d75a6ea1d84ab4bab1f510fd73d7310',
				etheContractAddr: null,
				etheAccounts: ["0xa7129ba8dffd19869ec6d408e9866d43935c5099", "0xee260f385168413b3a9dc63e89e4ef092dfba96c", "0xe0ef3c3819b86347378d807a0db2d7d076e471bc", "0x77bb2b01347bbc285ee23f66359667b1124dbeed", "0x4023dab12f9e86146cdbc24e00f79373eac9d958", "0xee12ad3c761b97bb12d7571ab86293a89c66efd2"],
				etheCoinbase: '0xa7129ba8dffd19869ec6d408e9866d43935c5099',
				tokenContractInterface : '[{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}]'
			},
			{
				etheURL:'http://pvt-wohshon-test.apps.dev.openshift.opentlc.com',
//				etheContractAddr:'0xae0094ec873be1ae4825766c6b1be4ab50188b28',
				etheContractAddr : null,
				etheAccounts: ["0xa7129ba8dffd19869ec6d408e9866d43935c5099", "0xee260f385168413b3a9dc63e89e4ef092dfba96c", "0xe0ef3c3819b86347378d807a0db2d7d076e471bc", "0x77bb2b01347bbc285ee23f66359667b1124dbeed", "0x4023dab12f9e86146cdbc24e00f79373eac9d958", "0xee12ad3c761b97bb12d7571ab86293a89c66efd2"],
				etheCoinbase: '0xa7129ba8dffd19869ec6d408e9866d43935c5099',
				tokenContractInterface : '[{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}]'
			},
                        {
                                etheURL:'http://pvt-destinasia.cloudapps.destinasia.io',
 //                                etheContractAddr:'0x2235ccb11d75a6ea1d84ab4bab1f510fd73d7310',
                                etheContractAddr: null,
                                etheAccounts: ["0xa7129ba8dffd19869ec6d408e9866d43935c5099", "0xee260f385168413b3a9dc63e89e4ef092dfba96c", "0xe0ef3c3819b86347378d807a0db2d7d076e471bc", "0x77bb2b01347bbc285ee23f66359667b1124dbeed", "0x4023dab12f9e86146cdbc24e00f79373eac9d958", "0xee12ad3c761b97bb12d7571ab86293a89c66efd2"],
                                etheCoinbase: '0xa7129ba8dffd19869ec6d408e9866d43935c5099',
                                tokenContractInterface : '[{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}]'
                        },

			{
				etheURL:'dummy',
				etheContractAddr:null,
				etheAccounts: ["0xa7129ba8dffd19869ec6d408e9866d43935c5099", "0xee260f385168413b3a9dc63e89e4ef092dfba96c", "0xe0ef3c3819b86347378d807a0db2d7d076e471bc", "0x77bb2b01347bbc285ee23f66359667b1124dbeed", "0x4023dab12f9e86146cdbc24e00f79373eac9d958", "0xee12ad3c761b97bb12d7571ab86293a89c66efd2"],
				etheCoinbase: '0xa7129ba8dffd19869ec6d408e9866d43935c5099',
				tokenContractInterface : '[{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}]'
			}
	],
		config: null,
	init: function() {
		$('#btn_update_addr').prop('disabled',true);
		//  var web3 = new Web3(new Web3.providers.HttpProvider(this.config.etheURL));
		//  var abi = JSON.parse(this.config.tokenContractInterface);
		//  var tokenContract = web3.eth.contract(abi);
		//  this.contractInstance = tokenContract.at(this.config.etheContractAddr);
		//  console.log(" got contract object "+Object.keys(myApp.contractInstance));
		 //"_eth", "transactionHash", "address", "abi", "sendCoin", "coinBalanceOf", "allEvents", "CoinTransfer"]
	},
	showPointBalance: function(account) {

		var url="/getBalance"
//		var payload= '{"account": "'+this.config.etheCoinbase+'", "config":'+JSON.stringify(this.config)+' }'
		var payload= '{"account": "'+account+'", "config":'+JSON.stringify(this.config)+' }'
		$.ajax({
		  type: "POST",
		  url: url,
			data: payload,
			success: this.showBalance,
			headers: {
	 		  "Access-Control-Allow-Origin": "*" ,
	 		 "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
	 		 "Access-Control-Allow-Methods": "GET, PUT, POST",
	 		 "Content-type": "application/json"
	 		},
		  dataType: 'json',
			error: function(e) {
		    //console.log("error "+Object.keys(e));
				console.log("error "+e.responseText);
		  }
		});

	},
	showBalance:function(response) {
		console.log("success " + Object.keys(response));
		console.log("success " + response.account);
		$('#bal_'+response.account).html(response.balance);
		$('#bal_'+response.account).fadeOut(200).fadeIn(300);
	},
	send : function (sender, receiver, value) {
		$('#btn_send').fadeOut(200).fadeIn(300);
		var url="/send";
		var payload= '{"sender": "'+sender+'","receiver": "'+receiver+'","value": "'+value+'", "config":'+JSON.stringify(this.config)+' }'
		$.ajax({
			type: "POST",
			url: url,
			data: payload,
			success: function(data) {
            $('#points').html('Tx done, wait for tx to be committed');
        },
			headers: {
				"Access-Control-Allow-Origin": "*" ,
			 "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
			 "Access-Control-Allow-Methods": "GET, PUT, POST",
			 "Content-type": "application/json"
			},
			dataType: 'json',
			error: function(e) {
				//console.log("error "+Object.keys(e));
				console.log("error "+e.responseText);
			}
		});
	},
	drag: function (event) {
		console.log('Dragging '+event.target.id);
		event.dataTransfer.setData("text", event.target.id);
	},
	drop: function (event) {
		event.preventDefault();
		var data = event.dataTransfer.getData("text");
		console.log("got "+data);
		$('#'+event.target.id).val($('#'+data).html());
		$('#'+event.target.id).fadeOut(100).fadeIn(300);
	},
	allowDrop: function (event) {
		event.preventDefault();

	},
        setupContract: function(etheURL) {

	//is there a valid addr? 
                var url="/getContractAddr";
                var payload= '{"eurl": "'+etheURL+'" }';
                $.ajax({
                        type: "POST",
                        url: url,
                        data: payload,
                        success: function(data) {
        			console.log('====================='+data.addr);
				if (data.addr=='0') {
				 console.log("No contract found..... deploying new one");
				  var newContract=myApp.deployContract(etheURL);
				  console.log("new contract deployed..... wait for event to update UI");
                                } 
				else {
					console.log('got contract: updating ...'+data.addr);
		                        $('#contractAddr').val(data.addr);
					myApp.config.etheContractAddr=$('#contractAddr').val();
					        $('#btn_getPoints').prop('disabled',false);
					console.log("updated config "+myApp.config.etheContractAddr);
				}
			},
                        headers: {
                                "Access-Control-Allow-Origin": "*" ,
                         "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
                         "Access-Control-Allow-Methods": "GET, PUT, POST",
                         "Content-type": "application/json"
                        },
                        dataType: 'json',
                        error: function(e) {
                                //console.log("error "+Object.keys(e));
                                console.log("error getting contract "+e.responseText);
                        }
                });

	

	},
	deployContract:function(etheURL) {
               
               var url="/deployContract";
                var payload= '{"eurl": "'+etheURL+'" }';
                $.ajax({
                        type: "POST",
                        url: url,
                        data: payload,
                        success: function(data) {
                          console.log("new deployed addr "+data.addr);
                          $('#contractAddr').val(data.addr);
                          console.log("  updaging... new deployed addr "+data.addr);
                          myApp.config.etheContractAddr=$('#contractAddr').val();
                          console.log("updated config "+myApp.config.etheContractAddr);
		        $('#btn_getPoints').prop('disabled',false);

                          return data.addr;
			},
                        headers: {
                                "Access-Control-Allow-Origin": "*" ,
                         "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
                         "Access-Control-Allow-Methods": "GET, PUT, POST",
                         "Content-type": "application/json"
                        },
                        dataType: 'json',
                        error: function(e) {
                                //console.log("error "+Object.keys(e));
                                console.log("error getting contract "+e.responseText);
                        }
                });

	},
	contractInstance: null

}
