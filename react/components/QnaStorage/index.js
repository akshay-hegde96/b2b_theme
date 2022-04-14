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
            <th>Total votes for the question</th>
            <th className={styles.fixedWidth}>Answers</th>

            <th>Answered by:</th>
            <th>Total likes for answers</th>

            <th>ProductID</th>
          </thead>
          <tbody>
            {qstns.map((qstn, i) => {
              return (
                <tr className={styles.tablerow}>
                  <td>{i + 1}</td>
                  <td>{qstn.question}</td>
                  <td>
                    {qstn.name == "" ? (
                      <div>Anonymous</div>
                    ) : (
                      <div>{qstn.name}</div>
                    )}
                  </td>
                  <td>
                    {qstn.votes == null ? (
                      <div>No votes yet</div>
                    ) : (
                      <div>{qstn.votes}</div>
                    )}
                  </td>

                  <td>
                    {qstn.answers ? (
                      <div>
                        {" "}
                        {qstn.answers.map((ans) => {
                          return (
                            <div className={styles.answeredByPadding}>
                              {ans.answer}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className={styles.answeredByPadding}>
                        No answers yet. Be the first!
                      </div>
                    )}
                  </td>
                  <td>
                    {qstn.answers ? (
                      <div>
                        {qstn.answers.map((ans) => {
                          return (
                            <div>
                              {ans.name == "" ? (
                                <div className={styles.answeredByPadding}>
                                  Anonymous
                                </div>
                              ) : (
                                <div className={styles.answeredByPadding}>
                                  {ans.name}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>No answers yet.</div>
                    )}
                  </td>
                  <td>
                    {qstn.answers ? (
                      <div>
                        {qstn.answers.map((ans) => {
                          return (
                            <div>
                              {ans.votes == null ? (
                                <div className={styles.answeredByPadding}>
                                  No likes yet
                                </div>
                              ) : (
                                <div className={styles.answeredByPadding}>
                                  {ans.votes}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>No answers yet.</div>
                    )}
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
