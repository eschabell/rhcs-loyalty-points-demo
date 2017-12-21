package com.redhat.travelagency.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.redhat.*;

public class BookingResp {
	
	@SerializedName("techoffice.FlightResp")
    @Expose
	private FlightResp flightResp;
	@SerializedName("techoffice.HotelResp")
    @Expose
	private HotelResp hotelResp;
	@SerializedName("techoffice.CarResp")
    @Expose
	private CarResp carResp;
	
	public BookingResp() {
		super();
		}
	

	public BookingResp(FlightResp flightResp, HotelResp hotelResp,
			CarResp carResp) {
		super();
		this.flightResp = flightResp;
		this.hotelResp = hotelResp;
		this.carResp = carResp;
	}
	public BookingResp(CarResp carResp) {
		super();
		this.carResp = carResp;
	}
	public BookingResp(HotelResp hotelResp) {
		super();
		this.hotelResp = hotelResp;
	}
	public BookingResp(FlightResp flightResp) {
		super();
		this.flightResp = flightResp;
	}

	
	public FlightResp getFlightResp() {
		return flightResp;
	}
	public void setFlightResp(FlightResp flightResp) {
		this.flightResp = flightResp;
	}
	public HotelResp getHotelResp() {
		return hotelResp;
	}
	public void setHotelResp(HotelResp hotelResp) {
		this.hotelResp = hotelResp;
	}
	public CarResp getCarResp() {
		return carResp;
	}
	public void setCarResp(CarResp carResp) {
		this.carResp = carResp;
	}
	
	
}
