const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const fs = require('fs');

const PORT = 3000;

const app = express();

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('./public'));

app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

// GET Route for homepage.
app.get('/index', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page.
app.get('/notes', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Pulls notes from db.json file.
app.get('/api/notes', (req, res) => res.json(termData));

// POST Route for notes page.
app.post('/api/notes', (req, res) => {
	console.info(`${req.method} request received to add a review`);

	const {title, text} = req.body;

	if (title && text) {
		const newNote = {
			title,
			text,
		};

		const response = {
			status: 'success',
			body: newNote,
		};

		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json('Error in posting review');
	}
});

// Server setup to listen.
app.listen(PORT, () => 
	console.log(`App listening at https://localhost:${PORT}`)
);
