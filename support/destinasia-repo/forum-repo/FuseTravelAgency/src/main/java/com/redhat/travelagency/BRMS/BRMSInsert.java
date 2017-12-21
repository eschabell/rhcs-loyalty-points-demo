
package com.redhat.travelagency.BRMS;


import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;


public class BRMSInsert {

    public BRMSInsert(String outIdentifier, Object object) {
		super();
		this.outIdentifier = outIdentifier;
		this.object = object;
	}

	@SerializedName("out-identifier")
    @Expose
    private String outIdentifier;
    @SerializedName("object")
    @Expose
    private Object object;

    /**
     * 
     * @return
     *     The outIdentifier
     */
    public String getOutIdentifier() {
        return outIdentifier;
    }

    /**
     * 
     * @param outIdentifier
     *     The out-identifier
     */
    public void setOutIdentifier(String outIdentifier) {
        this.outIdentifier = outIdentifier;
    }

    /**
     * 
     * @return
     *     The object
     */
    public Object getObject() {
        return object;
    }

    /**
     * 
     * @param object
     *     The object
     */
    public void setObject(Object object) {
        this.object = object;
    }

}