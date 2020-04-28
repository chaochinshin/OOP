const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const render = require("./lib/htmlRenderer");
    var employee = []
    var addNew = [{
        message: "Do you want to add new employee? (y or N)",
        type: "confirm",
        name: "addNew",
        
    }]
    var choosetype = [{
        message: "What type of employee would you like to add?",
        type: "list",
        name: "addEmployee",
        choices: [
            "Manager", "Engineer", "Intern",
        ]
    }]

    var manager = [{
        message: "What's the Manager's name?",
        type: "input",
        name: "managerName"}, {
            
        message: "What's the Manager's ID?",
        type: "input",
        name: "managerID"}, {

        message: "What's the Manager's Email?",
        type: "input",
        name: "managerEmail"}, {

        message: "What's the Manager's office number?",
        type: "input",
        name: "officeNumber"}, 
        ]

    var engineer = [{
        message: "What's the Engineer's name?",
        type: "input",
        name: "engineerName"}, {
            
        message: "What's the Engineer's ID?",
        type: "input",
        name: "engineerID"}, {

        message: "What's the Engineer's Email?",
        type: "input",
        name: "engineerEmail"}, {

        message: "What's the Engineer's gitHub username?",
        type: "input",
        name: "gitHub"}, 
    ];
    var intern = [{
        message: "What's the intern's name?",
        type: "input",
        name: "internName"}, {
            
        message: "What's the intern's ID?",
        type: "input",
        name: "internID"}, {

        message: "What's the intern's Email?",
        type: "input",
        name: "internEmail"}, {

        message: "What's the intern's school?",
        type: "input",
        name: "school"}, 
    ];
    function init() {
        addNext()
    }
    function addNext() {

        inquirer
        .prompt(addNew)
        .then(answers => {
            if(answers.addNew) {
                chooseEmployee()
            }
            else {
                var html = render(employee);
                //console.log(html);
                try{
                    if(
                        fs.existsSync(OUTPUT_DIR)    
                    )
                    { console.log("targetfolderexist");
                        fs.writeFile(outputPath,html,(err,written,string)=>{
                            console.log(err);
                            if(err) throw err;
                            console.log("File is written.");
                        });    
                    }
                    else{
                        fs.mkdir(OUTPUT_DIR,(err)=>{
                            if(
                                !err
                            ){
                                fs.writeFile(outputPath,html,(err,written,string)=>{
                                    console.log(err);
                                });       
                            }
                        });
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
        })
    }
    init()
    
    function chooseEmployee () {
        inquirer
        .prompt(choosetype)  
        .then(answers => {
            switch(answers.addEmployee) {
            case "Manager": 
        
        inquirer
            .prompt(manager)
            .then(answers => {
        employee.push(
        new Manager (
            answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber,
            ))
            addNext();
        })    
        break;
        case "Intern":

        inquirer
            .prompt(intern)
            .then(answers => {
        employee.push(
        new Intern (
            answers.internName, answers.internID, answers.internEmail, answers.school,
            ))
            addNext();
        })
        break;
        case "Engineer":

        inquirer
            .prompt(engineer)
            .then(answers => {
        employee.push(
        new Engineer (
            answers.engineerName, answers.engineerID, answers.engineerEmail, answers.gitHub,
            ))
            addNext();
    })
        default: 
            break;
    }
    })
}

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
// for the provided `render` function to work!```
