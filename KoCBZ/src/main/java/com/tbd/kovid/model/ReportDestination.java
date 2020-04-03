package com.tbd.kovid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportDestination")
public class ReportDestination {
	
		public enum DestType {
			SMTP, FTP, SFTP, FOLDER }
		
	 	private long reportId;
	 	private int destinationId;
	    private String destMail;
	    private String active;
	    
	    @Enumerated(EnumType.ORDINAL)
	    private DestType destType;
	    
	    private String destObject;
	    private String destSubject;
	    
		public ReportDestination(long reportId, int destinationId, String destMail, String active, DestType destType, String destObject, String destSubject) {
			this.reportId = reportId;
			this.destinationId = destinationId;
			this.destMail = destMail;
			this.active = active;
			this.destType = destType;
			this.destObject = destObject;
			this.destSubject = destSubject;
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

		@Column(name = "Dest_Mail", nullable = false)
		public String getDestMail() {
			return destMail;
		}

		@Column(name = "Active", nullable = false)
		public String getActive() {
			return active;
		}

		public DestType getDestType() {
			return destType;
		}

		public String getDestObject() {
			return destObject;
		}

		public String getDestSubject() {
			return destSubject;
		}
	    
	    

}
