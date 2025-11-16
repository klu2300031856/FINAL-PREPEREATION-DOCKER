package com.klef.sdp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sports")
public class Sport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(nullable = false, length = 20)
    private String type; // INDOOR, OUTDOOR
    
    @Column(nullable = false, length = 20)
    private String category; // TEAM, INDIVIDUAL
    
    // Optional 4th field if needed
    @Column(length = 50)
    private String coach;

    // Constructors
    public Sport() {}
    
    public Sport(String name, String type, String category, String coach) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.coach = coach;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCoach() {
        return coach;
    }

    public void setCoach(String coach) {
        this.coach = coach;
    }

    @Override
    public String toString() {
        return "Sport [id=" + id + ", name=" + name + ", type=" + type + 
               ", category=" + category + ", coach=" + coach + "]";
    }
}