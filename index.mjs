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
    constructor(refID, rating, comment, name, company, email) {
        super();
        this.refID = refID;
        this.rating = rating;
        this.comment = comment;

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
            refID: "seed1",
        },
        {
            name: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.sentences({ min: 2, max: 4 }),
            refID: "seed2",
        },
        {
            name: faker.person.fullName(),
            rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            comment: faker.lorem.sentences({ min: 2, max: 4 }),
            refID: "seed3",
        },
    ];

    getAll() {
        throw new Error("Not Implemented")
    }

    //get reference data by name, used for updating existing data.
    getReferenceName(name) {
        const testimonials = this.getAll();
        return testimonials.find((testimonial) => testimonial.name == name);
    }

    //checks if an entered id matches an existing id in database.
    checkID(refID) {
        const idValue = this.getAll();
        const storedValue = idValue.find((idInList) => idInList.refID === refID);
        return storedValue ? true : false;
    }

    static create(testimonial) {
        throw new Error("Not Implemented")
    }
}

class SessionStorageTestimonialDao extends TestimonialDao {
    constructor() {
        super();
        this.database = sessionStorage;
    }

    getAll() {
        const testAsJSON = this.database.getItem("testimonials");
        const testsData = testAsJSON ? JSON.parse(testAsJSON) : TestimonialDao.seeds;
        const idChecker = TestimonialDao.checkID(person.refID);
        forEach(TestimonialDao.seeds, (testimonial) => {
            if (idChecker == true) {
                return testsData.map((testData) => {
                    const { comment } = testData;
                    return new Testimonial(comment += testData.comment);
                });
            }
            else {
                return testsData.map((testData) => {
                    const { name, rating, comment, refID } = testData;
                    return new Testimonial(name, rating, comment, refID);
                });
            }
        });
    }

    create(testimonial) {
        const seedTestimonials = this.getAll();
        seedTestimonials.push(testimonial);
        this.database.setItem("testimonials", JSON.stringify(seedTestimonials));
    }
}

class Reference extends DatabaseObject {
    constructor(params) {
        super();
        const { referenceName, company, email } = params;
        this.referenceName = referenceName;
        this.company = company;
        this.email = email;
    }

    toString() {
        return `${this.referenceName} ${this.company} ${this.email}`;
    }

    static create(params) {
        return new Reference(params);
    }
}

class ReferenceDao {
    getAll() {
        throw new Error("Not Implemented");
    }

    create(reference) {
        throw new Error("Not Implemented");
    }
}

class SessionStorageReferenceDao extends ReferenceDao {
    constructor() {
        super();
        this.database = sessionStorage;
    }

    getAll() {
        const referencesInSessionStorage = this.database.getItem("reference");
        const refsData = referencesInSessionStorage ? JSON.parse(referencesInSessionStorage) : [];
        return refsData.map((refData) => {
            return Reference.create(refData);
        });
    }

    create(reference) {
        const references = this.getAll();
        references.push(reference);
        this.database.setItem("reference", JSON.stringify(references));
    }
}

class CreateReferenceData {
    constructor(testimonialDao, referenceDao) {
        this.testimonialDao = testimonialDao;
        this.referenceDao = referenceDao;
    }

    createReference(referenceName, company, email) {
        const reference = this.testimonialDao.getReferenceName(referenceName);
        const idChecker = this.testimonialDao.checkID(reference.refID);
        if (idChecker == true) {
            return null;
        }
        else {
            const referenceData = {
                reference,
                company,
                email,
            };
        }
        this.testimonialDao.create(referenceData);
        this.referenceDao.create(reference);
    }
}

const testimonialDao = new SessionStorageTestimonialDao();
const referenceDao = new SessionStorageReferenceDao();
const createReferenceData = new CreateReferenceData();

const referenceList = document.getElementById("reference-data");
const references = referenceDao.getAll();
for (let i = 0; i < references.length; i++) {
    const reference = references[i];
    const referenceLi = document.createElement("li");
    referenceLi.textContent = reference.toString();
    referenceList.appendChild(referenceLi);
}


