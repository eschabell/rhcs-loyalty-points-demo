package com.redhat;

import java.util.Random;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
public class flightReservations  {
	
	@Path("/flight")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public FlightResp bookFlight(FlightReq flreq){
		FlightResp resp = new FlightResp();
		
		resp.setFlightDate(flreq.getFlightDate());
		resp.setFlightFrom(flreq.getFlightFrom());
		resp.setFlightTo(flreq.getFlightTo());
		resp.setFlightNo(flreq.getFlightNo());
		resp.setFlightPassengers(flreq.getFlightPassengers());
		
		resp.setFlightPrice(randomPrice(400, 2500)*flreq.getFlightPassengers());
		resp.setFlightResCode(randomString(6));
		resp.setFlightResStatus("OK");
		
		return resp;
		
		
	}
	
	String randomString( int len ){
		final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		   StringBuilder sb = new StringBuilder( len );
		   for( int i = 0; i < len; i++ ) 
		      sb.append( AB.charAt( new Random().nextInt(AB.length()) ) );
		   return sb.toString();
		}
	Double randomPrice(Integer min, Integer max){
		
		return (Math.floor((min + (max - min) * new Random().nextDouble()) * 100)/100);
	}

}
