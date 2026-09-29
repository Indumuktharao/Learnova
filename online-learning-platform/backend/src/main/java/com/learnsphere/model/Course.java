package com.learnsphere.model;
public class Course {
    private Long id;
    private String title;
    private String description;
    private String duration;

    public Course() {}
    public Course(Long id, String title, String description, String duration) {
        this.id=id; this.title=title; this.description=description; this.duration=duration;
    }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTitle(){return title;} public void setTitle(String title){this.title=title;}
    public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
    public String getDuration(){return duration;} public void setDuration(String duration){this.duration=duration;}
}
