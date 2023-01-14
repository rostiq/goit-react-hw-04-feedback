import React, { useState } from "react";

import Section from "./Section/Section";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from "./Statistics/Statistics";
import Notification from "./Notification/Notification";

const App = () => {

  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0});

  const onLeaveFeedback = (event) => {
    setState({ ...state, [event.target.name]: state[event.target.name] + 1 });
 }

  const countTotalFeedback = () =>{
    return Object.values(state).reduce((a, b) => a + b, 0);
  }

  const countPositiveFeedbackPercentage = () => {
    return Math.round((state.good * 100) / countTotalFeedback());
  }

  return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
              options={Object.keys(state)}
              onLeaveFeedback={onLeaveFeedback}
          >
          </FeedbackOptions>
        </Section>
        <Section title="Statistic">
            {countTotalFeedback() ? (
              <Statistics
                good={state.good}
                neutral={state.neutral}
                bad={state.bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
              >
              </Statistics>
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
      </>
    )
  }

export default App;
