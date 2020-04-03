package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Report")
public class Report {
	
	 	private long reportId;
	    private String reportShortName;
	    private String reportName;
	    
	    
	    public Report(String reportShortName, String reportName) {
	         this.reportShortName = reportShortName;
	         this.reportName = reportName;
	    }
	    
	    
		
	    @Id
	    @Column(name = "Report_Id", nullable = false)
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		public long getReportId() {
			return reportId;
		}
	    
		
		
		 @Column(name = "Report_ShortName", nullable = false)
		public String getReportShortName() {
			return reportShortName;
		}
		
		
		
		 @Column(name = "Report_Name", nullable = false)
		public String getReportName() {
			return reportName;
		}
		
		
	    
		
		@Override
	    public String toString() {
	        return "Report [id=" + reportId + ", Report_ShortName=" + reportShortName + ", Report_Name=" + reportName 
	       + "]";
	    }
	    

}
