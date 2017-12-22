
package com.redhat.travelagency.BRMS;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;


public class BRMSCommand {

    @SerializedName("insert")
    @Expose
    private BRMSInsert insert;
    @SerializedName("fire-all-rules")
    @Expose
    private BRMSFireAllRules fireAllRules;


    public BRMSInsert getInsert() {
        return insert;
    }


    public void setInsert(BRMSInsert insert) {
        this.insert = insert;
    }

    public BRMSFireAllRules getFireAllRules() {
        return fireAllRules;
    }


    public void setFireAllRules(BRMSFireAllRules fireAllRules) {
        this.fireAllRules = fireAllRules;
    }
}