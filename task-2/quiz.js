import OpenAI from "openai";
import { Question } from "./question.js";
import { Answer } from "./answer.js";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  baseURL: "https://models.github.ai/inference/",
  apiKey: `${process.env.OPENAI_API_KEY}`,
});

export async function fetchQuestions(category) {
  const prompt = `Generate 10 questions , and each questions should include only 4 answer which is only one of them is correct in the ${category} category for each questions from start till end the difficulty of the questions should increase . Reply in a valid and parsable JSON with the following structure:

{ "questions": "string", "answer_list": [{ "answer": "answer1":is_correct, true/false},{ "answer": "answer2":is_correct, true/false},{ "answer": "answer3":is_correct, true/false},...], }

do not return anything else besides the JSON  and make sure the JSON is valid and parsable dont be markdown.`;
  const response = await openai.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const responseContent = response.choices[0].message.content;

  const quiz = JSON.parse(responseContent);
  const questions = quiz.questions.map((item) => {
    const answers = item.answer_list.map(
      (answerItem) => new Answer(answerItem.answer, answerItem.is_correct),
    );
    return new Question(item.question, answers);
  });
  return questions;
}
