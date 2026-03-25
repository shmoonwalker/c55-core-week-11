import { fetchQuestions } from "./quiz.js";
import promptSync from "prompt-sync";
import chalk from "chalk";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log(chalk.magenta("Welcome to the  Quiz!"));
const prompt = promptSync();
const category = prompt("Select category to start the quiz: ");

if (!category) {
  console.log(
    chalk.red(
      "Category cannot be empty. Please restart the quiz and enter a valid category.",
    ),
  );
  process.exit(1);
}
const questions = await fetchQuestions(category);

let score = 0;

for (let i = 0; i < questions.length; i++) {
  const question = questions[i];

  try {
    console.log(chalk.magenta(`Loading  question ${i + 1}...\n`));
    await sleep(1000);
    console.log();
    console.log(chalk.yellow(question.questionText));
    if (question.answers.length > 0) {
      question.answers.forEach((answer, index) => {
        console.log(`${index + 1}- ${answer.answerText}`);
      });
    }

    const userAnswer = prompt("Your answer is :");
    if (
      userAnswer.toLowerCase() === "exit" ||
      userAnswer.toLowerCase() === "q"
    ) {
      console.log(
        chalk.blue(
          `Quiz exited! Your final score is: ${score}/${questions.length}`,
        ),
      );
      process.exit(0);
    }

    if (question.isCorrectAnswer(parseInt(userAnswer))) {
      console.log(chalk.green("Correct!"));
      score++;
    } else {
      console.log(
        chalk.red(
          `Wrong! The correct answer is: ${question.answers.findIndex((answer) => answer.isCorrect) + 1} `,
        ),
      );
    }
  } catch (error) {
    console.log(chalk.red.bold(`Error: ${error.message}`));
    i--;
  }
}

console.log(
  chalk.blue(
    `Quiz completed! Your final score is: ${score}/${questions.length}`,
  ),
);
