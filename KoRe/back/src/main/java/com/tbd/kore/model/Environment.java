package com.tbd.kore.model;

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


    public enum EnvType {DEV, INT, PPRD, PRD}

    @Id
    @Column(name = "Env_Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long envId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Env_Type", nullable = false)
    private EnvType envType;

    @Column(name = "Env_Name", nullable = false)
    private String envName;

    public Environment(EnvType envType, String envName) {
        this.envType = envType;
        this.envName = envName;
    }

    public long getEnvId() {
        return envId;
    }

    public EnvType getEnvType() {
        return envType;
    }

    public String getEnvName() {
        return envName;
    }

    public void setEnvId(long envId) {
        this.envId = envId;
    }

    public void setEnvType(EnvType envType) {
        this.envType = envType;
    }

    public void setEnvName(String envName) {
        this.envName = envName;
    }

    @Override
    public String toString() {
        return "Environmnet [id=" + envId + ", Env_Type=" + envType + ", Env_Name=" + envName
                + "]";
    }
}
