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

class Testimonial extends DatabaseObject {
    constructor(referenceName, company, email, ID, rating, comment) {
        super();
        this.referenceName = referenceName;
        this.company = company;
        this.email = email;
        this.ID = ID;
        this.rating = rating;
        this.comment = comment;

    }

    toString() {
        return `${this.referenceName}, ${this.rating}/5: ${this.comment}`;
    }
}

class TestimonialDao {
    static seeds = [
        {
            referenceName: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.lines({ min: 1, max: 3 }),
            ID: "seed1",
        },
        {
            referenceName: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.lines({ min: 1, max: 3 }),
            ID: "seed2",
        },
        {
            referenceName: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.lines({ min: 1, max: 3 }),
            ID: "seed3",
        },
    ];

    getAll() {
        throw new Error("Not Implemented")
    }

    //checks if an entered id matches an existing id in database.
    getReferenceByID(ID) {
        const references = this.getAll();
        return references.find((reference) => reference.ID == ID);
    }

    static create(reference) {
        throw new Error("Not Implemented")
    }
}

class SessionStorageTestimonialDao extends TestimonialDao {
    constructor() {
        super();
        this.database = sessionStorage;
    }

    getAll() {
        const testAsJSON = this.database.getItem("references");
        const testsData = testAsJSON ? JSON.parse(testAsJSON) : TestimonialDao.seeds;
        return testsData.map((testData) => {
            //data is likely being overwritten here
            const { referenceName, rating, comment, ID } = testData;
            const company = "";
            const email = "";
            return new Testimonial(referenceName, company, email, ID, rating, comment);
        });
    }

    create(reference) {
        const seedTestimonials = this.getAll();
        seedTestimonials.push(reference);
        this.database.setItem("references", JSON.stringify(seedTestimonials));
    }
}

class CookieStorageTestimonialDao extends TestimonialDao {
    constructor() {
        super();
        this.database = document.cookie;
    }

    getAll() {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith("references"))
            ?.split("=")[1];
        
        const testsData = cookieValue ? JSON.parse(cookieValue) : TestimonialDao.seeds;
        return testsData.map(
            (testData) => new Testimonial(testData.referenceName, testData.company, testData.email, testData.ID, testData.rating, testData.comment),
        );
    }

    create(reference) {
        const currentTestimonials = this.getAll();
        currentTestimonials.push(reference);
        document.cookie = `references=${JSON.stringify(currentTestimonials)};`;
    }
}

class CreateReferenceData {
    testimonialDao;
    constructor(comment) {
        //this.testimonialDao = new SessionStorageTestimonialDao();
        this.testimonialDao = new CookieStorageTestimonialDao();
        this.comment = comment;
    }

    createReference(referenceName, company, email, comment, rating, ID) {
        const reference = this.testimonialDao.getReferenceByID(ID);
        const referenceExists = reference ? this.ID : ID;
        let referenceData;
        if (referenceExists === this.ID) {
            comment == this.comment;
            referenceData = {
                referenceName,
                company,
                email,
                ID,
                rating,
                comment,
            }
            this.testimonialDao.create(referenceData);
        }
        else {
            referenceData = {
                referenceName,
                company,
                email,
                ID,
                rating,
                comment,
            };
            this.testimonialDao.create(referenceData);
        }
    }
}

class AverageRating {
    testimonialDao
    constructor(rating) {
        //this.testimonialDao = new SessionStorageTestimonialDao();
        this.testimonialDao = new CookieStorageTestimonialDao();
        this.rating = rating;
    }

    getAverageRating() {
        const reference = this.testimonialDao.getAll();
        console.log("reference");
        console.log(reference);
        const refRating = [];
        for (let i = 0; i < reference.length; i++) {
            refRating.push(reference[i].rating);
        }
        const refRatingSum = refRating.reduce((accum, rating) => accum + rating, 0);
        return refRatingSum;
    }
}

//const testimonialDao = new SessionStorageTestimonialDao();
const testimonialDao = new CookieStorageTestimonialDao();
const createReferenceData = new CreateReferenceData();
const averageRating = new AverageRating();

const referenceList = document.getElementById("reference-data");
const references = testimonialDao.getAll();
for (let i = 0; i < references.length; i++) {
    const reference = references[i];
    const referenceLi = document.createElement("li");
    referenceLi.textContent = reference.toString();
    referenceList.appendChild(referenceLi);
}

const ratingSelect = document.querySelector("#testimonials form select");

const refRatingSelect = [1, 2, 3, 4, 5];
for (let i = 0; i < refRatingSelect.length; i++) {
    const rating = refRatingSelect[i];
    const option = document.createElement("option");
    option.innerText = rating.toString();
    ratingSelect.appendChild(option);
}



//need help implementing the Array Average section with .reduce method
const aRating = document.getElementById("averRating");
const sumRating = averageRating.getAverageRating();
aRating.textContent = `Average Rating: ${sumRating}.`;

const createReferenceForm = document.querySelector("#testimonials form");
createReferenceForm.addEventListener("submit", (event) => {
    const formData = new FormData(event.target);
    const referenceName = formData.get("referenceName");
    const email = formData.get("email");
    const company = formData.get("company");
    const comment = formData.get("comment");
    const rating = parseInt(formData.get("rating"));
    const refID = formData.get("refID");
    createReferenceData.createReference(referenceName, email, company, comment, rating, refID);
})