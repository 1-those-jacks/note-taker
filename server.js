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
app.get('/api/notes', (req, res) => {
	let data = fs.readFileSync('./db/db.json', 'utf8');
	res.json(JSON.parse(data));
});

// POST Route for notes page.
app.post('/api/notes', (req, res) => {
	console.info(`${req.method} request received to add a note`);

	const {title, text} = req.body;

	if (title && text) {
		const newNote = {
			title,
			text,
		};

		fs.readFile('./db/db.json', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
			} else {
				const parsedNotes = JSON.parse(data);
				parsedNotes.push(newNote);

				fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
					writeErr
						? console.error(writeErr)
						: console.info("Successfully updated notes!")
				);
			}
		});

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
