#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
// Define the Student class
class Student {
    name;
    constructor(name) {
        this.name = name;
    }
}
// Define the Person class that manages students
class Person {
    students = [];
    addStudent(student) {
        this.students.push(student);
    }
    findStudent(name) {
        return this.students.find(student => student.name === name);
    }
}
// Create a Person instance to manage the students
const persons = new Person();
// Utility functions for printing messages with chalk
const printWelcomeMessage = () => {
    console.log(chalk.bold('============================================================'));
    console.log(chalk.bold('||                                                        ||'));
    console.log(chalk.bold('||             Welcome to Abbas Asad\'s OOP Project        ||'));
    console.log(chalk.bold('||                                                        ||'));
    console.log(chalk.bold('============================================================\n'));
};
const printExitMessage = () => {
    console.log(chalk.bold('\nExiting the program. Thank you for using the application!\n'));
};
const printSelfMessage = () => {
    console.log("\nHello! I'm reflecting on myself.");
    console.log('I am doing well and in great health.\n');
};
const printStudentGreeting = (name) => {
    console.log(`\nHello, I am ${name}.`);
    console.log('Nice to meet you! How are you doing today?\n');
};
const printStudentExistsGreeting = (name) => {
    console.log(`\nHello, I am ${name}. I hope you are well.\n`);
    console.log(chalk.bold('--- Current Student Data ---\n'));
};
// Printing the list of students in a human-readable format
const printStudentList = (students) => {
    console.log(chalk.bold('--- List of Students ---'));
    students.forEach((student, index) => {
        console.log(`${index + 1}. ${student.name}`);
    });
    console.log('');
};
// Main program function with async/await for inquirer prompts
const programStart = async (persons) => {
    do {
        printWelcomeMessage();
        const { opt } = await inquirer.prompt([
            {
                name: 'opt',
                type: 'list',
                message: 'Please select an option:',
                choices: ['Self-Reflection', 'Speak to a Student', 'Exit'],
            },
        ]);
        if (opt === 'Exit') {
            printExitMessage();
            process.exit();
        }
        if (opt === 'Self-Reflection') {
            printSelfMessage();
        }
        if (opt === 'Speak to a Student') {
            const { studentName } = await inquirer.prompt({
                name: 'studentName',
                type: 'input',
                message: 'Please enter the student\'s name:',
            });
            const student = persons.findStudent(studentName);
            if (!student) {
                const newStudent = new Student(studentName);
                persons.addStudent(newStudent);
                printStudentGreeting(newStudent.name);
                printStudentList(persons.students); // Print the updated list
            }
            else {
                printStudentExistsGreeting(student.name);
                printStudentList(persons.students); // Print the current list
            }
        }
    } while (true);
};
// Start the program
programStart(persons);
