var socket;

var dashboard={

	init:function () {
	    //alert(123);
	    //post to connect
/*		$.post( "/connect", function( data ) {
		  //alert(Object.keys(data));
		  alert(data.msg);
		});*/
		socket=io();
		//socket = io.connect('http://192.168.223.130:3001');
		var FuseRequest=0;
		socket.on('connect', function(){
			//$('#msg').html('connected to server');
			console.log('connected to server :  socket id: '+socket.id);
		});
		socket.on('adminMsg',function(data){
			//alert(data.msg);
			//update UI
			$('#system-messages').html(data.msg);
		});//
		socket.on('sendToWeb',function(data){

			//console.log('web client : '+Object.keys(data));
			console.log('source : '+data["source"]);
			//var parsedData = JSON.parse(data); // not needed
			var parsedData = data;
			//console.log(" parse " +Object.keys(parsedData));
			var display="<div>"+parsedData+"</div>"
			var winner="";
			//flow for booking request
//			if (parsedData.traveller) {
			if (parsedData["source"]=="mobile" && parsedData.traveller) {
				console.log("***Mobile:  "+parsedData.traveller);
				display="<div class=\"booking\">"+renderDisplay(parsedData)+"</div>";
				display="<div class=\"booking\">"+renderDisplay(parsedData)+"</div>";
				//$('#bookings').html(display);
				//remove the last element when we have 4 before populating the next one
				if ($('#bookings').children().length==10) {
					$('#bookings').children().last().remove();
				}
				$('#bookings').prepend(display);
				if ($('#winnerss').children().length<102) {
					var winner=$('#bookings').children().first().clone();
					winner.addClass("winner");
					winner.removeClass("booking");
					$('#winners').append(winner);
				}

			} else if (parsedData.podCount) {
				console.log("*****"+parsedData.podCount);
				display="<div class=\"speedo\" > <div class=\"capacity"+parsedData.podCount+"\"></div></div><p></p></div>";
				$('#pod-count').html(display);

			} else if (parsedData["source"]=="fuse"){
				console.log("*****Event from Fuse***");
                                	display="<div><h3>Booking from Fuse</h3> "+eval(FuseRequest+parsedData.event)+ " </div>";
                                	$('#fuse-bookings').html(display);
                                	FuseRequest+=parsedData.event;
			}
		});//

		function renderDisplay(data) {
		   var  display="";
		   display+= "<h3>"+data.traveller+"<span></span></h3>";
		//   display+="<div></div>";
		   if (data.flightReq) {
		       display+="<div class=\"flight booking-type \"> </div>";
		   }
		   if (data.hotelReq) {
		       display+="<div class=\"hotel booking-type\"> </div>";
		   }
		   if (data.carReq) {
		       display+="<div class=\"car booking-type \"> </div>";
		   }
		   return display;
		}


/*		socket.on('gotMessage',function(data){
			//alert(data.msg);
			$('#system-messages').html($('#system-messages').html()+'</p>'+data.system-messages);
			//update UI
		});//*/



	}
};
