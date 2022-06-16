import React, { useEffect, useState } from "react";
import { questionAPI } from "../../Config/url";
import { makeAPICall } from "../../Utils/httpCall";
import { FormattedMessage } from 'react-intl'
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
      <h1 className={styles.qnaHeading}>
      <FormattedMessage id="store/my-app.questions" />
      </h1>
      <div className={styles.qnaContainer}>
        <table className={styles.qnaTable}>
          <thead>
            <th>
            <FormattedMessage id="store/my-app.qstn" />
            </th>
            <th className={styles.fixedWidth}>
            <FormattedMessage id="store/my-app.quesHeading" />
            </th>

            <th>
            <FormattedMessage id="store/my-app.qstnAsked" />
            </th>
            <th>
            <FormattedMessage id="store/my-app.votes" />
            </th>
            <th className={styles.fixedWidth}>
            <FormattedMessage id="store/my-app.answers" />
            </th>

            <th>
            <FormattedMessage id="store/my-app.answerBy" />
            </th>
            <th>
            <FormattedMessage id="store/my-app.ansLikes" />
            </th>

            <th>
            <FormattedMessage id="store/my-app.prodID" />
            </th>
          </thead>
          <tbody>
            {qstns.map((qstn, i) => {
              return (
                <tr className={styles.tablerow}>
                  <td>{i + 1}</td>
                  <td>{qstn.question}</td>
                  <td>
                    {qstn.name == "" ? (
                      <div>
                         <FormattedMessage id="store/my-app.anonymous" />
                      </div>
                    ) : (
                      <div>{qstn.name}</div>
                    )}
                  </td>
                  <td>
                    {qstn.votes == null ? (
                      <div>
                         <FormattedMessage id="store/my-app.noVotes" />
                      </div>
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
                        <FormattedMessage id="store/my-app.noAns" />
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
                                  <FormattedMessage id="store/my-app.anonymous" />
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
                      <div>
                        <FormattedMessage id="store/my-app.yetNoAns" />
                      </div>
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
                                   <FormattedMessage id="store/my-app.noLikes" />
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
                      <div>
                        <FormattedMessage id="store/my-app.yetNoAns" />
                      </div>
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
