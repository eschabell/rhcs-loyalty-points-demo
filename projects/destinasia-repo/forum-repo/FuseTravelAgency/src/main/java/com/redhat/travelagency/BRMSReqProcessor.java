package com.redhat.travelagency;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;

import com.redhat.travelagency.BRMS.BRMSCommand;
import com.redhat.travelagency.BRMS.BRMSExec;
import com.redhat.travelagency.BRMS.BRMSFireAllRules;
import com.redhat.travelagency.BRMS.BRMSInsert;
import com.redhat.travelagency.model.BookingResp;

public class BRMSReqProcessor implements Processor {

	@Override
	public void process(Exchange exchange) throws Exception {
		Message in = exchange.getIn();
		Message out = exchange.getOut();
		
		BookingResp resp = in.getBody(BookingResp.class);
		BRMSExec exec = new BRMSExec();
		BRMSCommand comm;
		BookingResp dummyBookResp;
		if(resp.getFlightResp()!=null){
			comm = new BRMSCommand();
			dummyBookResp = new BookingResp(resp.getFlightResp());
			comm.setInsert(new BRMSInsert("flight",dummyBookResp));
			exec.addCommand(comm);
			}
		if(resp.getHotelResp()!=null){
			comm = new BRMSCommand();
			dummyBookResp = new BookingResp(resp.getHotelResp());
			comm.setInsert(new BRMSInsert("hotel", dummyBookResp));
			exec.addCommand(comm);
		}
		if(resp.getCarResp()!=null){
			comm = new BRMSCommand();
			dummyBookResp = new BookingResp(resp.getCarResp());
			comm.setInsert(new BRMSInsert("car",dummyBookResp ));
			exec.addCommand(comm);
		}
		comm = new BRMSCommand();
		comm.setFireAllRules(new BRMSFireAllRules());
		exec.addCommand(comm);
		out.setBody(exec);

	}

}
