const fs = require('fs');

const persons = [
    "Alessandra",
    "Claire",
    "Dylan",
    "Emeline",
    "Edith",
    "Marie",
    "Marilyne",
    "Marjorie",
    "Mathieu",
    "Rima",
    "Sophie"

  ,
];

const locations = [
    "Bureau 1",
    "Bureau 2",
    "Bureau 3",
    "Bureau 4",
    "Bureau 5",
    "Bureau 6",
    "Bureau 7",
    "Bureau 8"
];

// Function to shuffle the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle persons and locations
const shuffledPersons = shuffle([...persons]);
const shuffledLocations = shuffle([...locations]);

// Match persons with locations
const matches = [];
shuffledPersons.forEach((person, index) => {
  const location = shuffledLocations[index % shuffledLocations.length];
  matches.push({ person, location });
});

// Output the matches
matches.forEach((match) => {
  console.log(`${match.person} - ${match.location}`);
});

// Generate HTML content
const generateHTML = (matches) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EARPS Roulette</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <style>
        body {
            padding: 2rem;
        }
        .card {
            margin: 1rem;
            transition: transform 0.2s;
        }
        .card:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <h1 class="title has-text-centered">EARPS Roulette</h1>
    <div class="columns is-multiline">
        ${matches.map(match => `
        <div class="column is-one-quarter">
            <div class="card">
                <div class="card-content">
                    <p class="title">${match.person}</p>
                    <p class="subtitle">${match.location}</p>
                </div>
            </div>
        </div>`).join('')}
    </div>
</body>
</html>
`;
};

// Write HTML content to a file
fs.writeFileSync('matches.html', generateHTML(matches), 'utf-8');
console.log('HTML file has been generated: matches.html');
