package com.cacib.kovid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportDestination")
public class ReportDestination {
	
	 	private long reportId;
	 	private int destinationId;
	    private String destination;
	    private String active;
	    
	    
		public ReportDestination(long reportId, int destinationId, String destination, String active) {
			this.reportId = reportId;
			this.destinationId = destinationId;
			this.destination = destination;
			this.active = active;
		}

		@Id
	    @Column(name = "Report_Id", nullable = false)
		public long getReportId() {
			return reportId;
		}

		 
		@Id
	    @Column(name = "Dest_Id", nullable = false)
		public int getDestinationId() {
			return destinationId;
		}

		@Column(name = "Destination", nullable = false)
		public String getDestination() {
			return destination;
		}

		@Column(name = "Active", nullable = false)
		public String getActive() {
			return active;
		}
	    
	    	    
		
	   
		
		
		
		
		
	    
			
	    

}
