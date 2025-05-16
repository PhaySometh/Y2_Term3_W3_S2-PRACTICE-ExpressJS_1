// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    // Filter by department 
    let filtered = courses.filter(course => course.department === dept);

    // Handle Edge Cases
    // •Invalid credit ranges (minCredits > maxCredits)

    if (minCredits && maxCredits && Number(minCredits) > Number(maxCredits)) {
        return res.status(400).json({ error: "Invalid credits range: minCreadit < maxCredits" })
    }

    // Apply optional filters
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
        filtered = filtered.filter(course => course.instructor.toLowerCase().includes(keywords));
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
