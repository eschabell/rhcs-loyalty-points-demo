package com.redhat.travelagency;
import org.apache.camel.Exchange;
import org.apache.camel.processor.aggregate.AggregationStrategy;
import org.apache.camel.processor.aggregate.CompletionAwareAggregationStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.camel.Message;

import com.redhat.CarResp;
import com.redhat.FlightResp;
import com.redhat.HotelResp;
import com.redhat.travelagency.model.BookingResp;

public class AggregationStrat implements AggregationStrategy {
	@Override
	public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
		  Exchange retEx;
		  Message inOld=null;
		  BookingResp bookResp;
 
		
		if (oldExchange == null){
			bookResp = new BookingResp();
			retEx = newExchange;
			inOld = retEx.getIn();
			
			if(inOld.getBody() != null){
				switch (inOld.getBody().getClass().toString()){
				case "class com.redhat.FlightResp":
					bookResp.setFlightResp((FlightResp)inOld.getBody());
					break;
				case "class com.redhat.HotelResp":
					bookResp.setHotelResp((HotelResp)inOld.getBody());
					break;
				case "class com.redhat.CarResp":
					bookResp.setCarResp((CarResp)inOld.getBody());
					break;
				}
			}
			inOld.setBody(bookResp);
			
		}	            
		else{
			retEx = oldExchange;
			inOld = retEx.getIn();
			Message inNew = newExchange.getIn();		
			bookResp = (BookingResp)inOld.getBody();
			if(inNew.getBody() != null){
				switch (inNew.getBody().getClass().toString()){
				case "class com.redhat.FlightResp":
					bookResp.setFlightResp((FlightResp)inNew.getBody());
					break;
				case "class com.redhat.HotelResp":
					bookResp.setHotelResp((HotelResp)inNew.getBody());
					break;
				case "class com.redhat.CarResp":
					bookResp.setCarResp((CarResp)inNew.getBody());
					break;
				}
			}
			inOld.setBody(bookResp);
		}
		
		retEx.setOut(inOld);

		return retEx;
	}



}
