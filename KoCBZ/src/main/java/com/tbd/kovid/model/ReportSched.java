package com.tbd.kovid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportSched")
public class ReportSched {
	
	 	private long reportId;
	 	private int schedId;
	    private String reportSched;

	    
	    
	    public ReportSched(long reportId, int schedId, String reportSched) {
	    	 this.reportId = reportId;
	         this.schedId = schedId;
	         this.reportSched = reportSched;
	    }
	    
	    
	    @Id
	    @Column(name = "Report_Id", nullable = false)
		public long getReportId() {
			return reportId;
		}
	    
	  
		
		@Id
		@Column(name = "Sched_Id", nullable = false)
		public int getSchedId() {
			return schedId;
		}


		@Column(name = "Schedule", nullable = false)
		public String getReportSched() {
			return reportSched;
		}


	
	    

}
