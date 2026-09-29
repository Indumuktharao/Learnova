package com.learnsphere.controller;

import com.learnsphere.model.Course;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @GetMapping
    public List<Course> getCourses() {
        return List.of(
            new Course(1L, "Modern Web Development", "HTML, CSS and JavaScript", "6 weeks"),
            new Course(2L, "Python for Beginners", "Python programming fundamentals", "5 weeks"),
            new Course(3L, "Java & Spring MVC", "Java web development with Spring MVC", "8 weeks")
        );
    }

    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id) {
        return getCourses().stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElseThrow();
    }
}
