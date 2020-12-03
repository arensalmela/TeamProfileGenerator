//Global variables

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

//Using inquirer to prompt questions for Manager user input.
//Each question uses validation to check for proper input.

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

  //Manager is prompted to add team members.

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

    //Calling render function and providing teamArray.

    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of your software engineer?",
          name: "EngineerName",
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
          name: "EngineerId",
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
          name: "EngineerEmail",
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
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of your intern?",
          name: "InternName",
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
          name: "InternId",
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
          name: "InternEmail",
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
