const projectItems = [
    {
        Title: "Dealership Inventory Management System",
        URL: "https://github.com/52153-KM/Dealership-Inventory-Management-System---Part-2",
        Text: "This project written in C#, adds, removes, and logs, a list of various cars and their info (year, make, model). It was my first time implementing the concept of a classes and subclasses in a full program. ",
    },
    {
        Title: "Game of War",
        URL: "https://github.com/52153-KM/game-of-war-52153-KM",
        Text: "This project is a simple card game written in C#. It allows two players to play a game of war with a deck of 52 cards. Despite the simplicity of the game, it was a tough exercise in implementing classes, methods, and game logic. It also helped me understand how to manage game state and user input effectively.",
    },
    {
        Title: "Number Guessing Game",
        URL: "https://github.com/52153-KM/Number-Guessing-Game",
        Text: "This project is a simple number guessing game written in C#. The program generates a random number between 1 and 100, and the player has to guess the number. The program provides feedback on whether the guess is too high, too low, or correct. This project was a great way to practice using loops, conditionals, and random number generation in C#.",
    },
];

projectDiv = document.getElementById("projects");

projectItems.forEach((projectItems) => {
    const projectTitle = projectItems.Title;
    const projectURL = projectItems.URL;
    const projectText = projectItems.Text;

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("project-title");
    titleDiv.textContent = projectTitle;

    const urlDiv = document.createElement("div");
    urlDiv.classList.add("project-url");
    urlDiv.textContent = projectURL;

    const textDiv = document.createElement("div");
    textDiv.classList.add("project-text");
    textDiv.textContent = projectText;

    titleDiv.appendChild(urlDiv);
    urlDiv.appendChild(textDiv);
    textDiv.appendChild(titleDiv);
});