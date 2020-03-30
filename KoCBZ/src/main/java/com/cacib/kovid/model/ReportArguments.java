package com.cacib.kovid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportArguments")
public class ReportArguments {
	
	 	private long reportId;
	 	private int argumentId;
	    private String argumetKey;
	    private String argumentValue;
	    
	    	    
		
	    public ReportArguments(long reportId, int argumentId, String argumetKey, String argumentValue) {
			
			this.reportId = reportId;
			this.argumentId = argumentId;
			this.argumetKey = argumetKey;
			this.argumentValue = argumentValue;
		}

		@Id
	    @Column(name = "Report_Id", nullable = false)
		public long getReportId() {
			return reportId;
		}
		
		@Id
	    @Column(name = "Argument_Id", nullable = false)
		public long getArgumentId() {
			return argumentId;
		}
		
		
		 @Column(name = "Argument_Key", nullable = false)
		public String getArgumetKey() {
			return argumetKey;
		}
		 
		 
		 @Column(name = "Argument_Value", nullable = false)
		public String getArgumentValue() {
			return argumentValue;
		}
	    
			
	    

}
