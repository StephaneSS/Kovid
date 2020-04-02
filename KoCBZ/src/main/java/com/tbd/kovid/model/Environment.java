package com.tbd.kovid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Environment")
public class Environment {
	
	
	public enum EnvType {
		DEV, INT, PPRD, PRD }
		
	 	private long envId;
	 	
	    @Enumerated(EnumType.ORDINAL)
	    private EnvType envType;
	    
	    private String envName;
	    
	    
	    public Environment(EnvType envType, String envName) {
	         this.envType = envType;
	         this.envName = envName;
	    }
	    
	    
		
	    @Id
	    @Column(name = "Env_Id", nullable = false)
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		public long getEnvId() {
			return envId;
		}
	    
		
		
		 @Column(name = "Env_Type", nullable = false)
		public EnvType getEnvType() {
			return envType;
		}
		
		
		
		 @Column(name = "Env_Name", nullable = false)
		public String getEnvName() {
			return envName;
		}
		
		
	    
		
		@Override
	    public String toString() {
	        return "Environmnet [id=" + envId + ", Env_Type=" + envType + ", Env_Name=" + envName 
	       + "]";
	    }
	    

}
