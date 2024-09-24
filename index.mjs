#!/usr/bin/env node
// index.mjs
import inquirer from "inquirer";
import { exec } from "child_process";
import path from "path";

async function init() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Which template would you like to use:",
      choices: ["Vue", "React", "Vanilla JS"],
      default: "React",
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      default: "mini-app",
    },
  ]);

  const { template, projectName } = answers;
  const targetPath = path.join(process.cwd(), projectName);

  let repoUrl;

  // Select the repository based on the user's choice
  switch (template) {
    case "React":
      repoUrl = "https://github.com/Linn-Htet123/mini-app-template-react.git";
      break;
    case "Vue":
      repoUrl = "https://github.com/Linn-Htet123/mini-app-template-vue.git";
      break;
    case "Vanilla JS":
      repoUrl = "https://github.com/pyaesworkspace/miniapp_html_template.git";
      break;
  }

  // Clone the selected repository
  exec(`git clone ${repoUrl} ${targetPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cloning the repository: ${error.message}`);
      return;
    }
    console.log(`Project created successfully in ${targetPath}`);
  });
}

init();
