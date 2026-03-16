import { faker } from '@faker-js/faker';

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
    /*Kinda had to brute force this, since I couldn't figure out how to connect a URL/Button between the HTML, CSS, and JS files. Overall I'd say it worked out, but let me know if I need to change it.*/
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

// DOA Section
class DatabaseObject {
    toString() {
        throw new Error("Error");
    }
}

// might need a create function in Testimonial

class Testimonial extends DatabaseObject {
    constructor(refID, rating, comment) {
        super();
        this.refID = refID;
        this.rating = rating;
        this.comment = comment

    }

    toString() {
        return `${this.name} ${this.rating} ${this.comment}`;
    }
}

class TestimonialDao {
    static seeds = [
        {
            name: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.sentences({ min: 2, max: 4 }),
        },
        {
            name: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.sentences({ min: 2, max: 4 }),
        },
        {
            name: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.sentences({ min: 2, max: 4 }),
        },
    ];

    getAll() {
        throw new Error("Not Implemented")
    }

    getReferenceName(testimonial) {
        const testimonials = this.getAll();
        return testimonials.find((test) => test.name == testimonial.name);
    }
    create(testimonial) {
        throw new Error("Not Implemented")
    }
}

class SessionStorageTestimonialDao extends TestimonialDao {
    constructor() {
        super();
        this.database = sessionStorage;
    }

    getAll() {
        const testAsJSON = this.database.getItem("testimonial");
        const testsData = testAsJSON ? JSON.parse(testAsJSON) : TestimonialDao.seeds;
        return testsData.map((testData) => {
            const { name, rating, comment } = testData;
            return new Testimonial(name, rating, comment);
        });
    }

    create(testimonial) {
        const testimonials = this.getAll();
        testimonials.push(testimonial);
        this.database.setItem("testimonial", JSON.stringify(testimonials));
    }
}

/*class Reference extends DatabaseObject {
    constructor(params) {
        super();
        const { referenceName, company, email } = params;
        this.name = referenceName;
        this.company = company;
        this.email = email;
    }

    toString() {
        return `${this.name} ${this.company} ${this.email} ${this.comment} ${this.rating}`;
    }

    update(params) {
        return new Reference(params);
    }
}

class ReferenceDao {
    getAll() {
        throw new Error("Not Implemented");
    }

    update(person) {        
        throw new Error("Not Implemented");
    }
}

class SessionStorageReferenceDao extends ReferenceDao {
    constructor() {
        super();
        this.database = sessionStorage;
    }

    getAll() {
        const refAsJSON = this.database.getItem("reference");
        const refsData = refAsJSON ? JSON.parse(refAsJSON) : [];
        return refsData.map((refData) => {
            const { name, company, email, refId } = refData;
            return Reference({ referenceName: name, company, email, refId });
        });
    }

    idCheck(refID) {
        const ID = this.getAll()
        return ID.find((idInList) => idInList.refID == refID);
    }

    update(person) {
        const savedRefs = this.getAll();
        const index = this.idCheck(person.refID);
        if (index == true) {
            savedRefs[index] = person;
            this.database.setItem("reference", JSON.stringify(savedRefs));
        } else {
            throw new Error("Reference ID not found");
        }
    }
}

class CreateReferenceData {
    constructor(testDao) {
        this.testDao = testDao;
    }

    createReference(referenceName, company, email, refID) {
        const personNew = this.testDao.getReferenceData(referenceName);
        const personOld = 
    }
}

const testDao = new SessionStorageTestimonialDao();*/
