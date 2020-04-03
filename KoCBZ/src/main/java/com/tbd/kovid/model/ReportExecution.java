package com.tbd.kovid.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportExecution")
public class ReportExecution {
	
	
	 	private long reportId;
	 	private int execId;
	 	private int envId;
	    private Timestamp startDate;
	    private Timestamp endDate;
	    private String status;
	    
	  	    
		public ReportExecution(long reportId, int execId, Timestamp startDate, Timestamp endDate, String status, int envId) {
			this.reportId = reportId;
			this.execId = execId;
			this.startDate = startDate;
			this.endDate = endDate;
			this.status = status;
			this.envId = envId;
			
		}

		@Id
	    @Column(name = "Report_Id", nullable = false)
		public long getReportId() {
			return reportId;
		}
		
		@Id
	    @Column(name = "Exec_Id", nullable = false)
		public int getExecId() {
			return execId;
		}
		
		
	    @Column(name = "Env_Id", nullable = false)
		public int getEnvId() {
			return envId;
		}
		
		@Column(name = "Start_Date", nullable = false)
		public Timestamp getStartDate() {
			return startDate;
		}

		@Column(name = "End_Date", nullable = false)
		public Timestamp getEndDate() {
			return endDate;
		}

		@Column(name = "Status", nullable = false)
		public String getStatus() {
			return status;
		}
		
	    

}
