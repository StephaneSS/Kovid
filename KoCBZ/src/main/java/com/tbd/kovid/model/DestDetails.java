package com.tbd.kovid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DestDetails")
public class DestDetails {
	
	
	 	private long reportId;
	 	private int destinationId;
	    private String destHost;
	    private String destPath;
	    
	  	    
		public DestDetails(long reportId, int destinationId, String destHost, String destPath) {
			this.reportId = reportId;
			this.destinationId = destinationId;
			this.destHost = destHost;
			this.destPath = destPath;
			
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

		@Column(name = "Dest_Host", nullable = false)
		public String getDestHost() {
			return destHost;
		}

		@Column(name = "Dest_Path", nullable = false)
		public String getDestPath() {
			return destPath;
		}
	    
	    

}
