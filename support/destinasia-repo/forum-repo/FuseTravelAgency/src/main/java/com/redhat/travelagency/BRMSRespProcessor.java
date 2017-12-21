package com.redhat.travelagency;

import java.util.List;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;

import com.jayway.jsonpath.JsonPath;
import com.redhat.travelagency.model.BookingResp;

public class BRMSRespProcessor implements Processor {

	@Override
	public void process(Exchange exchange) throws Exception {
		BookingResp resp = exchange.getProperty("BookingResp",BookingResp.class);
		Message in = exchange.getIn();
		String json = in.getBody(String.class);
		/*json = json.replace("\\n","");
		json = json.replace("\\","");
		json = json.replace("\"{","{");
		json = json.replace("}\"","}");*/
		
		
		List<Integer> flightDisc=JsonPath.read(json, "$..flightDisc");
		List<Integer> hotelDisc=JsonPath.read(json, "$...hotelDisc");
		List<Integer> carDisc=JsonPath.read(json, "$..carDisc");
		
		
		if(flightDisc.size()>0){
			if(flightDisc.get(0)!=null)
				resp.getFlightResp().setFlightDisc(flightDisc.get(0));
			else
				resp.getFlightResp().setFlightDisc(0);
		}
		if(hotelDisc.size()>0){
			if(hotelDisc.get(0)!=null)
				resp.getHotelResp().setHotelDisc(hotelDisc.get(0));
			else
				resp.getHotelResp().setHotelDisc(0);
		}
		if(carDisc.size()>0){
			if(carDisc.get(0)!=null)
				resp.getCarResp().setCarDisc(carDisc.get(0));
			else
				resp.getCarResp().setCarDisc(0);
		}
		in.setBody(resp);
		exchange.setOut(in);

	}

}
