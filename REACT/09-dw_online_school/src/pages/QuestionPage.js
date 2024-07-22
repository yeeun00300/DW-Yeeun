import React from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation } from "react-router-dom";
import DateText from "./../components/DateText";
import Lined from "../components/Lined";
import Warn from "../components/Warn";
import DOMpurify from "dompurify";

function QuestionPage(props) {
  const { question } = useLocation().state;
  const { title, content, createdAt, answers, writer } = question;

  const sanitizedData = (data) => {
    return { __html: DOMpurify.sanitize(data) };
  };

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>
                  <DateText value={createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={writer} />
            </div>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={sanitizedData(content)}
              //   dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>
          <Lined>{answers.length}개 답변</Lined>
        </h2>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <Answer
              className={styles.answerItem}
              key={answer.id}
              answer={answer}
            />
          ))
        ) : (
          <Warn
            title="답변을 기다리고 있어요."
            description="이 질문의 첫 번째 답변을 달아주시겠어요?"
          />
        )}
      </Container>
    </>
  );
}

export default QuestionPage;
