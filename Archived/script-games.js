const gamesContainer = document.getElementById('games-container');
const searchInput = document.getElementById('search');
const categories = document.querySelectorAll('.categories a');

// Sample game data for each category
const gameData = {
    arcade: [
        { name: 'Game 1', description: 'Description of Game 1', imageUrl: 'game1.jpg' },
        { name: 'Game 2', description: 'Description of Game 2', imageUrl: 'game2.jpg' },
		{ name: 'Game 1', description: 'Description of Game 1', imageUrl: 'game1.jpg' },
        { name: 'Game 2', description: 'Description of Game 2', imageUrl: 'game2.jpg' },
				{ name: 'Game 1', description: 'Description of Game 1', imageUrl: 'game1.jpg' },
        { name: 'Game 2', description: 'Description of Game 2', imageUrl: 'game2.jpg' },
				{ name: 'Game 1', description: 'Description of Game 1', imageUrl: 'game1.jpg' },
        { name: 'Game 2', description: 'Description of Game 2', imageUrl: 'game2.jpg' },
				{ name: 'Game 1', description: 'Description of Game 1', imageUrl: 'game1.jpg' },
        { name: 'Game 2', description: 'Description of Game 2', imageUrl: 'game2.jpg' },
				{ name: 'Game 1', description: 'Description of Game 1', imageUrl: 'game1.jpg' },
        { name: 'Game 2', description: 'Description of Game 2', imageUrl: 'game2.jpg' },

    ],
    idle: [
        { name: 'Game 3', description: 'Description of Game 3', imageUrl: 'game3.jpg' },
        { name: 'Game 4', description: 'Description of Game 4', imageUrl: 'game4.jpg' }
    ],
    shooting: [
        { name: 'Game 5', description: 'Description of Game 5', imageUrl: 'game5.jpg' },
        { name: 'Game 6', description: 'Description of Game 6', imageUrl: 'game6.jpg' }
    ]
    // Add more categories and games as needed
};


//////////////////////////////// --------------------- this function displays games data based on
//////////////////////////////// category chosen ////////////////////////////////


// Function to display games
function displayGames(games) {
    gamesContainer.innerHTML = '';

    games.forEach(game => {
        const gameBlock = document.createElement('div');
        gameBlock.classList.add('game-block');

        gameBlock.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <button class="download-button">Download / Buy</button>
        `;

        gamesContainer.appendChild(gameBlock);
    });
}

// Add event listeners for category links
categories.forEach(category => {
    category.addEventListener('click', event => {
        event.preventDefault();
        const selectedCategory = event.target.getAttribute('data-category');
        const categoryGames = gameData[selectedCategory];
        displayGames(categoryGames);
    });
});

// Display all games of the first category by default
const firstCategory = categories[0].getAttribute('data-category');
const firstCategoryGames = gameData[firstCategory];
displayGames(firstCategoryGames);


//////////////// -----------------------------------------------------------/////////////////////////

//////////////// ------ this function searches and displays only those games that are typed in serach bar //////

// Function to filter games by search query
function filterGames(searchQuery) {
    const filteredGames = [];

    Object.keys(gameData).forEach(category => {
        const gamesInCategory = gameData[category];
        const filteredCategoryGames = gamesInCategory.filter(game => {
            return game.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        filteredGames.push(...filteredCategoryGames);
    });

    return filteredGames;
}

// Function to display filtered games
function displayFilteredGames(filteredGames) {
    gamesContainer.innerHTML = '';

    filteredGames.forEach(game => {
        const gameBlock = document.createElement('div');
        gameBlock.classList.add('game-block');

        gameBlock.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <button class="download-button">Download / Buy</button>
        `;

        gamesContainer.appendChild(gameBlock);
    });
}

// Add input event listener to the search input
searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value;
    const filteredGames = filterGames(searchQuery);

    displayFilteredGames(filteredGames);
});




