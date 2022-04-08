import React, { useEffect, useState } from "react";
import { questionAPI } from "../../Config/url";
import { makeAPICall } from "../../Utils/httpCall";
import styles from "./QnaStorage.css";
const QnaStorage = () => {
  useEffect(() => {
    const makeQuestionAPICall = async () => {
      const questions = await makeAPICall(questionAPI, "GET");
      console.log("qstns" + JSON.stringify(questions));
      setQstns([...questions]);
    };
    makeQuestionAPICall();
  }, []);
  const [qstns, setQstns] = useState([]);
  return (
    <React.Fragment>
      <h1 className={styles.qnaHeading}>Questions&Answers</h1>
      <div className={styles.qnaContainer}>
        <table className={styles.qnaTable}>
          <thead>
            <th>Qstn.No</th>
            <th className={styles.fixedWidth}>Questions</th>
            <th>Question asked by:</th>
            <th className={styles.fixedWidth}>Answers</th>
            <th>Answered by:</th>
            <th>ProductID</th>
          </thead>
          <tbody>
            {qstns.map((qstn, i) => {
              return (
                <tr className={styles.tablerow}>
                  <td>{i + 1}</td>
                  <td>{qstn.question}</td>
                  <td>{qstn.name}</td>
                  <td>
                    {qstn.answers.map((ans) => {
                      return <div className={styles.answersPadding}>{ans.answer}</div>;
                    })}
                  </td>
                  <td >
                    {qstn.answers.map((ans) => {
                      return <div className={styles.answeredByPadding}>{ans.name}</div>;
                    })}
                  </td>
                  <td>{qstn.productId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
export default QnaStorage;
