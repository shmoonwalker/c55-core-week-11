export class Question {
  constructor(questionText, answers) {
    this.questionText = questionText;
    this.answers = answers;
  }

  isCorrectAnswer(answerIndex) {
    if (!answerIndex || answerIndex < 1 || answerIndex > 4) {
      throw new Error("Answer index must be between 1 and 4");
    }
    return this.answers[answerIndex - 1].isCorrect;
  }
}
