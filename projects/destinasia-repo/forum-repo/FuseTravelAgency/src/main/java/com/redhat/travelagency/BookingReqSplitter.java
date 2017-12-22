package com.redhat.travelagency;

import java.util.ArrayList;
import java.util.List;

import com.redhat.travelagency.model.BookingReq;

public class BookingReqSplitter {
	public List<Object> splitBody(BookingReq req){
		List<Object> list = new ArrayList<Object>();
		list.add(req.getFlightReq());
		list.add(req.getHotelReq());
		list.add(req.getCarReq());
		
		return list;
		
	}

}
