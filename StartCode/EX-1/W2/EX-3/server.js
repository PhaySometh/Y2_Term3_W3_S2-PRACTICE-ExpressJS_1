import express from 'express';
import fs from 'fs';

const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
    res.status(200).send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact', (req, res) => {
    const name = req.body.name;

    const filePath = 'submissions.json';

    // Read the existing JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        let submissions = [];

        if (err) {
            if (err.code === 'ENOENT') {
                // File doesn't exist, initialize with an empty array
                submissions = [];
            } else {
                console.error('Failed to read file', err);
                res.status(500).send('Internal Server Error');
                return;
            }
        } else {
            try {
                // Parse the existing data
                submissions = JSON.parse(data);
            } catch (parseErr) {
                console.error('Failed to parse JSON', parseErr);
                res.status(500).send('Internal Server Error');
                return;
            }
        }

        // Add the new name to the array
        submissions.push({ name });

        // Write the updated array back to the JSON file
        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Failed to save name', writeErr);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send(`<h2>Thank you for your submission, ${name}</h2>`);
        });
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
