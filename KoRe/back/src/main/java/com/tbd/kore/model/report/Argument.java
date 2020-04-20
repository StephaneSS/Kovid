package com.tbd.kore.model.report;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.io.Serializable;

@Entity
@Table(name = "arguments")
@Getter
@Setter
@RequiredArgsConstructor
public class Argument implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "type", nullable = false)
    private ArgumentType type;

    @Min(1)
    @Column(name = "sequence_order", nullable = false)
    private Long order;

    @Column(name = "key", nullable = false)
    private String key;

    @Column(name = "value", nullable = false)
    private String value;

    public Argument(Long id, Long order, ArgumentType type, String key, String value) {
        this.id = id;
        this.order = order;
        this.type = type;
        this.key = key;
        this.value = value;
    }
}
