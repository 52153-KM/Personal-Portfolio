const projectItems = [
	{
		Title: "Dealership Inventory Management System",
		URL: "GitHub",
		Text: "This project written in C#, adds, removes, and logs, a list of various cars and their info (year, make, model). It was my first time implementing the concept of a classes and subclasses in a full program. ",
	},
	{
		Title: "Game of War",
		URL: "GitHub",
		Text: "This project is a simple card game written in C#. It allows two players to play a game of war with a deck of 52 cards. Despite the simplicity of the game, it was a tough exercise in implementing classes, methods, and game logic. It also helped me understand how to manage game state and user input effectively.",
	},
	{
		Title: "Number Guessing Game",
		URL: "GitHub",
		Text: "This project is a simple number guessing game written in C#. The program 	generates a random number between 1 and 100, and the player has to guess the number. The program provides feedback on whether the guess is too high, too low, or correct. This project was a great way to practice using loops, conditionals, and random number generation in C#.",
	},
];

const projectDiv = document.getElementById("projects");

projectItems.forEach((projectItems) => {
	const projectTitle = projectItems.Title;
	const projectText = projectItems.Text;
	const projectURL = projectItems.URL;

	const titleDiv = document.createElement("div");
	titleDiv.classList.add("project-title");
	titleDiv.textContent = projectTitle;

	const textDiv = document.createElement("div");
	textDiv.classList.add("project-text");
	textDiv.textContent = projectText;

	const linkButton = document.createElement("div");
	linkButton.classList.add("project-URL");
	linkButton.textContent = projectURL;

	titleDiv.appendChild(textDiv);

	textDiv.appendChild(linkButton);

	titleDiv.addEventListener("click", () => {
		titleDiv.classList.toggle("active");
		textDiv.classList.toggle("active");
	});

	linkButton.addEventListener("click", () => {
		if (projectItems.Title === "Dealership Inventory Management System") {
			window.open(
				"https://github.com/52153-KM/Dealership-Inventory-Management-System---Part-2",
				"_blank",
			);
		} else if (projectItems.Title === "Game of War") {
			window.open("https://github.com/52153-KM/game-of-war-52153-KM", "_blank");
		} else if (projectItems.Title === "Number Guessing Game") {
			window.open("https://github.com/52153-KM/Number-Guessing-Game", "_blank");
		}
	});

	projectDiv.appendChild(titleDiv);
});
