const inquirer = require('inquirer');
const fs = require('fs');

// array of questions to run by inquirer
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Welcome to README generator.\nEnter the name of the project:'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a description for the project:'
  },
  {
    type: 'input',
    name: 'installCmd',
    message: 'Enter install command if any:'
  },
  {
    type: 'input',
    name: 'installIns',
    message: 'Enter additional install instructions if any:'
  },
  {
    type: 'input',
    name: 'usageCmd',
    message: 'Enter usage command if any:'
  },
  {
    type: 'input',
    name: 'usageIns',
    message: 'Enter additional usage instructions if any:'
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What are the contribution guidelines if any:'
  },
  {
    type: 'input',
    name: 'testCmd',
    message: 'Enter test command if any:'
  },
  {
    type: 'input',
    name: 'testIns',
    message: 'Enter additional test instructions if any:'
  },
  {
    type: 'list',
    message: 'Select a license for the project:',
    name: 'license',
    choices: [
      'GNU AGPLv3',
      'GNU GPLv3',
      'GNU LGPLv3', 
      'Mozilla Public License 2.0', 
      'Apache License 2.0',
      'MIT License',
      'Boost Software License 1.0',
      'The Unlicense'
    ]
  },
  {
    type: 'input',
    name: 'username',
    message: 'Enter your Github username:',
    validate: function(username) {
        // Regex username check, returns true if valid username
        if (!(/^[a-zA-Z0-9\-]+$/).test(username)) {
          return (`Not a valid username.`);
        } else return true;
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
    validate: function(email) {
        // Regex email check, returns true if valid email structure
        if (!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/).test(email)) {
          return (`Not a valid email address.`);
        } else return true;
    }
  },
  {
    type: 'input',
    name: 'questionIns',
    message: 'Enter additional contact instructions if any:'
  }
];

const promptUser = () =>
  inquirer
    .prompt(questions)
    .then((answers) => {
    // text to insert into md file
    let markdownString = 
    // project name and license as the header
    `# ${answers.projectName} `;
    switch (answers.license) {
      case 'GNU AGPLv3':
        markdownString += `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
        break;
      case 'GNU GPLv3':
        markdownString += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        break;
      case 'GNU LGPLv3':
        markdownString += `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`;
        break;
      case 'Mozilla Public License 2.0':
        markdownString += `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        break;
      case 'Apache License 2.0':
        markdownString += `[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)`;
        break;
      case 'MIT License':
        markdownString += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
        break;
      case 'Boost Software License 1.0':
        markdownString += `[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
        break;
      case 'The Unlicense':
        markdownString += `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
      default:
        break;
    }

    // description and table of contents
    markdownString += `\n\n## Description\n${answers.description}\n\n\n## Table of Contents\n`;
    if (answers.installCmd || answers.installIns) markdownString += `* [Installation](#installation)\n`;
    if (answers.usageCmd || answers.usageIns) markdownString += `* [Usage](#usage)\n`;
    if (answers.contributing) markdownString += `* [Contributing](#contributing)\n`;
    if (answers.testCmd || answers.testIns) markdownString += `* [Tests](#tests)\n`;
    markdownString += `* [Questions](#questions)\n* [License](#license)\n\n\n`;

    // install code block and description if entered by user
    if (answers.installCmd || answers.installIns) {
      markdownString += `## Installation\n`;
      if (answers.installCmd) {
        markdownString += '```\n';
        markdownString += `${answers.installCmd}\n`;
        markdownString += '```\n';
        if (!answers.installIns) markdownString += `\n\n`;
      }
      if (answers.installIns) markdownString += `${answers.installIns}\n\n\n`;
    } 
    // usage code block and description if entered by user
    if (answers.usageCmd || answers.usageIns) {
      markdownString += `## Usage\n`;
      if (answers.usageCmd) {
        markdownString += '```\n';
        markdownString += `${answers.usageCmd}\n`;
        markdownString += '```\n';
        if (!answers.usageIns) markdownString += `\n\n`;
      }
      if (answers.usageIns) {
        markdownString += `${answers.usageIns}\n\n\n`;
      }
    }
    // contributing information if entered by user
    if (answers.contributing) {
      markdownString += `## Contributing\n`;
      markdownString += `${answers.contributing}\n\n\n`;
    }
    // test code block and description if entered by user
    if (answers.testCmd || answers.testIns) {
      markdownString += `## Tests\n`;
      if (answers.testCmd) {
        markdownString += '```\n';
        markdownString += `${answers.testCmd}\n`;
        markdownString += '```\n';
        if (!answers.usageIns) markdownString += `\n\n`;
      }
      if (answers.testIns) {
        markdownString += `${answers.testIns}\n\n\n`;
      }
    }
    // question section and license
    markdownString += `## Questions\nPlease refer to my [Github](https://www.github.com/${answers.username}).\n\n`;
    markdownString += `Also contact me via [email](mailto:${answers.email}) with your inquiries.\n\n`;
    if (answers.questionIns) markdownString += `${answers.questionIns}\n\n\n`;
    markdownString += `## License\nThis project is under ${answers.license}.`;

    let fileName = 'README-' + answers.projectName.toLowerCase().split(' ').join('-') + '.md';

    fs.writeFile(fileName, markdownString, err => {
      if(err) console.log(err);
      else console.log(`Markdown file named ${fileName} has been successfully created!`);
    })
  });
promptUser();