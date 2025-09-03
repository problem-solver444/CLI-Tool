#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";
import fs from "fs";
program
  .name("My developed cli tool")
  .description("CLI to some JavaScript string utilities")
  .version("1.0.0");

const questions = [
  {
    type: "input",
    name: "Course",
    message: "Please enter your Course Name",
  },
  {
    type: "number",
    name: "Price",
    message: "Please enter your price",
  },
];

const DeleteQs = [
  {
    type: "input",
    name: "Course",
    message: "Please enter The name of Course you want to Delete",
  },
];

const UpdateQs = [
  {
    type: "list",
    name: "field",
    message: "What do you want to update?",
    choices: ["Course", "Price"],
  },
  {
    type: "input",
    name: "Course",
    message: "Enter the course name you want to update:",
  },
  {
    type: "input",
    name: "newCourse",
    message: "Enter the new course name:",
    when: (answers) => answers.field === "Course",
  },
  {
    type: "number",
    name: "newPrice",
    message: "Enter the new price:",
    when: (answers) => answers.field === "Price",
    validate: (value) => {
      if (isNaN(value) || value <= 0) {
        return "Please enter a valid positive number.";
      }
      return true;
    },
  },
];

const FilePath = "./Courses.json";

// Command: Add
program
  .command("Add")
  .alias("a")
  .description("Add a course")
  .action(() => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        if (fs.existsSync(FilePath)) {
          fs.readFile(FilePath, "utf-8", (err, content) => {
            if (err) {
              console.log("error", err);
              process.exit();
            }

            const ContentParsedtojson = JSON.parse(content);
            ContentParsedtojson.push(answers);

            fs.writeFile(
              FilePath,
              JSON.stringify(ContentParsedtojson),
              "utf-8",
              () => console.log("Add Courses Done")
            );
          });
        } else {
          fs.writeFile(FilePath, JSON.stringify([answers]), "utf-8", () =>
            console.log("Add Courses Done")
          );
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

// Command: Show
program
  .command("show")
  .alias("s")
  .description("Show Courses")
  .action(() =>
    fs.readFile(FilePath, "utf-8", (err, content) => {
      if (err) {
        console.log(err);
        process.exit();
      }

      console.table(JSON.parse(content));
    })
  );

//Command Update
program
  .command("Update")
  .alias("U")
  .description("Update a Course")
  .action(() => {
    inquirer.prompt(UpdateQs).then((answers) => {
      fs.readFile(FilePath, "utf-8", (err, content) => {
        if (err) {
          console.log(err);
          process.exit();
        }
        if (answers.field == "Course") {
          const Data = JSON.parse(content);
          let newData = Data.map((course) => {
            if (course.Course === answers.Course) {
              return { ...course, Course: answers.newCourse };
            }
            return course;
          });

          fs.writeFile(FilePath, JSON.stringify(newData), "utf-8", () => {
            console.log("Course Updated Sucssfulliy");
          });

          fs.readFile(FilePath, "utf-8", (err, content) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            console.log("After edition");
            console.table(JSON.parse(content));
          });
        } else if (answers.field == "Price") {
          const Data = JSON.parse(content);
          let newData = Data.map((course) => {
            if (course.Course === answers.Course) {
              return { ...course, Price: answers.newPrice };
            }
            return course;
          });

          fs.writeFile(FilePath, JSON.stringify(newData), "utf-8", () => {
            console.log("Course Updated Sucssfulliy");
          });

          fs.readFile(FilePath, "utf-8", (err, content) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            console.log("After edition");
            console.table(JSON.parse(content));
          });
        }
      });
    });
  });

//command delete
program
  .command("Delete")
  .alias("d")
  .description("Delete a Course")
  .action(() => {
    inquirer.prompt(DeleteQs).then((answers) => {
      fs.readFile(FilePath, "utf-8", (err, content) => {
        if (err) {
          console.log(err);
          process.exit();
        }
        const Data = JSON.parse(content);
        let newData = Data.filter((course) => course.Course !== answers.Course);
        fs.writeFile(FilePath, JSON.stringify(newData), "utf-8", () => {
          console.log("Course Deleted Sucssfulliy");
        });

        fs.readFile(FilePath, "utf-8", (err, content) => {
          if (err) {
            console.log(err);
            process.exit();
          }
          console.log("After edition");
          console.table(JSON.parse(content));
        });
      });
    });
  });
program.parse();
