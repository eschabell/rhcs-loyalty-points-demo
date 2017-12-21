package com.redhat.travelagency.model;

import com.redhat.*;

public class BookingReq {
	private FlightReq flightReq;
	private HotelReq hotelReq;
	private CarReq carReq;
	
	public FlightReq getFlightReq() {
		return flightReq;
	}
	public void setFlightReq(FlightReq flightReq) {
		this.flightReq = flightReq;
	}
	public HotelReq getHotelReq() {
		return hotelReq;
	}
	public void setHotelReq(HotelReq hotelReq) {
		this.hotelReq = hotelReq;
	}
	public CarReq getCarReq() {
		return carReq;
	}
	public void setCarReq(CarReq carReq) {
		this.carReq = carReq;
	}

}
