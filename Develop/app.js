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
        },

        {
          type: "input",
          message: "What is your id number?",
          name: "ManagerId",
        },

        {
          type: "input",
          message: "What is your email address?",
          name: "ManagerEmail",
        },

        {
          type: "input",
          message: "What is your office number?",
          name: "ManagerOfficeNum",
        },
      ])
      .then((responses) => {
        const manager = new Manager(
          responses.ManagerName,
          responses.ManagerId,
          responses.ManagerEmail,
          response.ManagerOfficeNum
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
          choices: ["Engineer", "Intern"],
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
