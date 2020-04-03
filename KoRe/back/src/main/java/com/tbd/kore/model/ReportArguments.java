package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportArguments")
public class ReportArguments {
	
		public enum ArgumentType {
	    	STRING, NUMBER, DYNAMIC_DATE
	    }
	
	 	private long reportId;
	 	private int argumentId;
	 	
	 	@Enumerated(EnumType.ORDINAL)
	 	private ArgumentType argumentType;
	 	
	    private String argumentKey;
	    private String argumentValue;
	    
	   
	    	    
		
	    public ReportArguments(long reportId, int argumentId, String argumentKey, String argumentValue, ArgumentType argumentType) {
			
			this.reportId = reportId;
			this.argumentId = argumentId;
			this.argumentKey = argumentKey;
			this.argumentValue = argumentValue;
			this.argumentType = argumentType;
		}

		@Id
	    @Column(name = "Report_Id", nullable = false)
		public long getReportId() {
			return reportId;
		}
		
		@Id
	    @Column(name = "Argument_Id", nullable = false)
		public int getArgumentId() {
			return argumentId;
		}
		
		 @Column(name = "Argument_Type", nullable = false)
		public ArgumentType getArgumentType() {
				return argumentType;
		}

		
		 @Column(name = "Argument_Key", nullable = false)
		public String getArgumentKey() {
			return argumentKey;
		}
		 
		 
		 @Column(name = "Argument_Value", nullable = false)
		public String getArgumentValue() {
			return argumentValue;
		}
	    
			
	    

}
