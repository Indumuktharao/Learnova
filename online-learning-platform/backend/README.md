# LearnSphere Spring MVC Backend

## Requirements
- Java 17+
- Maven 3.9+
- Optional: MySQL 8+

## Run
```bash
mvn spring-boot:run
```

API:
- GET http://localhost:8080/api/courses
- GET http://localhost:8080/api/courses/1

The supplied frontend currently demonstrates the complete UI using LocalStorage.
For a production/full-stack version, connect the frontend to these APIs and add
JDBC repositories for users, courses, enrollments and lesson progress.

Suggested MySQL tables:
- users(id, name, email, password_hash)
- courses(id, title, description, duration)
- enrollments(id, user_id, course_id, enrolled_at)
- lessons(id, course_id, title, lesson_order)
- progress(id, user_id, course_id, lesson_id, completed)
