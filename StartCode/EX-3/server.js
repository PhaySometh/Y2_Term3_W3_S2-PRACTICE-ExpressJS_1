// server.js
import express from 'express';
import courses from "../EX-2/course.js";
// EX-3
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';

const app = express();
const PORT = 3000;

app.use(logger);
// app.use(auth);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filtered = courses.filter(course => course.department === dept);

    if (level) {
        filtered = filtered.filter(course => course.level === level);
    }

    if (minCredits) {
        filtered = filtered.filter(course => course.credits >= Number(minCredits));
    }

    if (maxCredits) {
        filtered = filtered.filter(course => course.credits <= Number(maxCredits));
    }
    if (semester) {
        filtered = filtered.filter(course => course.semester === semester);
    }

    if (instructor) {
        const keywords = instructor.toLowerCase();
        filtered = filtered.filter(course => 
            course.instructor.toLowerCase().includes(keywords)
        );
    }

    // Return result
    res.json({ 
        results: filtered,
        meta: { total: filtered.length } 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
