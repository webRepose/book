import { useState } from "react";
import styles from "../styles/s-components/test.module.scss";

export default function Test({ questions, unitKey, onBack, unit }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (qIndex, optionIndex) => {
    if (submitted) return;

    setAnswers({
      ...answers,
      [qIndex]: optionIndex
    });
  };

  const handleSubmit = () => {
    let newScore = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        newScore++;
      }
    });

    setScore(newScore);
    setSubmitted(true);

    const saved = JSON.parse(localStorage.getItem("results")) || {};
    saved[unitKey] = newScore;
    localStorage.setItem("results", JSON.stringify(saved));
  };

let e = 0 
Array.from(unit).forEach((ee)=>{
  e = ee;
  if(ee === '0') {
    e = 10;
  }
})

  return (
    <div className={styles.testWrapper}>
      <h2 className={styles.title}>Unit Test {e}</h2>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className={styles.questionCard}>
          <h4 className={styles.question}>
            {qIndex + 1}. {q.question}
          </h4>

          <div className={styles.options}>
            {q.options.map((option, optIndex) => {
              const isSelected = answers[qIndex] === optIndex;
              const isCorrect = q.correct === optIndex;

              let optionClass = styles.option;

              if (submitted) {
                if (isCorrect) optionClass += ` ${styles.correct}`;
                else if (isSelected) optionClass += ` ${styles.wrong}`;
              } else if (isSelected) {
                optionClass += ` ${styles.selected}`;
              }

              return (
                <label key={optIndex} className={optionClass}>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={isSelected}
                    onChange={() => handleChange(qIndex, optIndex)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Завершить тест
        </button>
      )}

      {submitted && (
        <div className={styles.resultBox}>
          <h3>
            Результат: {score} / {questions.length}
          </h3>

          <button className={styles.backBtn} onClick={onBack}>
            Вернуться к книге
          </button>
        </div>
      )}
    </div>
  );
}
