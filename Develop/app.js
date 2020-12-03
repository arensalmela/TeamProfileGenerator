const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

function app() {
  function manager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of your manager?",
          name: "ManagerName",
          validate: (response) => {
            if (response != "") {
              return true;
            }
            return "Please enter at least one character";
          },
        },

        {
          type: "input",
          message: "What is your id number?",
          name: "ManagerId",
          validate: (response) => {
            var pass = response.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter numbers";
          },
        },

        {
          type: "input",
          message: "What is your email address?",
          name: "ManagerEmail",
          validate: (response) => {
            var pass = response.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email";
          },
        },

        {
          type: "input",
          message: "What is your office number?",
          name: "ManagerOfficeNum",
          validate: (response) => {
            var pass = response.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter numbers";
          },
        },
      ])
      .then((responses) => {
        const manager = new Manager(
          responses.ManagerName,
          responses.ManagerId,
          responses.ManagerEmail,
          responses.ManagerOfficeNum
        );

        teamArray.push(manager);
        createTeamMember();
      });
  }

  function createTeamMember() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What type of team member would you like to add?",
          name: "NewTeamMember",
          choices: ["Engineer", "Intern", "There are no more team members"],
        },
      ])
      .then((userResponse) => {
        switch (userResponse.NewTeamMember) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
  }

  function addEngineer() {
    //console.log("Please build your team");
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of your software engineer?",
          name: "EngineerName",
        },

        {
          type: "input",
          message: "What is your id number?",
          name: "EngineerId",
        },

        {
          type: "input",
          message: "What is your email address?",
          name: "EngineerEmail",
        },

        {
          type: "input",
          message: "What is your Github username?",
          name: "GithubUsername",
          validate: (response) => {
            if (response != "") {
              return true;
            }
            return "Please enter at least one character";
          },
        },
      ])
      .then((responses) => {
        const engineer = new Engineer(
          responses.EngineerName,
          responses.EngineerId,
          responses.EngineerEmail,
          responses.GithubUsername
        );

        teamArray.push(engineer);
        createTeamMember();
      });
  }

  function addIntern() {
    //console.log("Please build your team");
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of your intern?",
          name: "InternName",
        },

        {
          type: "input",
          message: "What is your id number?",
          name: "ManagerId",
        },

        {
          type: "input",
          message: "What is your email address?",
          name: "InternEmail",
        },

        {
          type: "input",
          message: "Where do you go to school?",
          name: "InternSchool",
          validate: (response) => {
            if (response != "") {
              return true;
            }
            return "Please enter at least one character";
          },
        },
      ])
      .then((responses) => {
        const intern = new Intern(
          responses.InternName,
          responses.InternId,
          responses.InternEmail,
          responses.InternSchool
        );

        teamArray.push(intern);
        createTeamMember();
      });
  }
  manager();
}

app();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
