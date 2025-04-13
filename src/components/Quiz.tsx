import { useState } from "react";
// Import Ant Design components and CSS
import {
  Result,
  Button,
  Typography,
  Progress,
  Card,
  Space,
  Divider,
} from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import { ChainCodeAlignmentString } from "../services/chain-code";

const { Title, Text } = Typography;

// Define the structure for quiz questions and answers
// Extracted from the 'sorting hat quiz' document
const quizData = [
  {
    id: 1,
    question: "What do you never leave home without?",
    answers: [
      { text: "A good blaster", points: { Cause: 1, FO: 0, Resistance: 0 } },
      {
        text: "My official identification",
        points: { Cause: 0, FO: 1, Resistance: 0 },
      },
      {
        text: "My trusty crewmates",
        points: { Cause: 0, FO: 0, Resistance: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "What do you seek?",
    answers: [
      { text: "Peace", points: { Cause: 0, FO: 0, Resistance: 2 } },
      { text: "Freedom", points: { Cause: 2, FO: 0, Resistance: 0 } },
      { text: "Power", points: { Cause: 0, FO: 2, Resistance: 0 } },
    ],
  },
  {
    id: 3,
    question: "What are you ordering at Oga's?",
    answers: [
      {
        text: "Imperial Red. Thanks to my connections, I can afford the finer things.",
        points: { Cause: 0, FO: 2, Resistance: 0 },
      },
      {
        text: "Whatever my crewmates are drinking. Unless I'm headed out on a mission - in that case, it's a black caf. The mission comes first.",
        points: { Cause: 0, FO: 0, Resistance: 2 },
      },
      {
        text: "Depends who's buying.",
        points: { Cause: 2, FO: 0, Resistance: 0 },
      },
    ],
  },
  {
    id: 4,
    question: "You come upon a wounded loth-cat in the street. Do you:",
    answers: [
      {
        text: "Comm the local wildlife specialist. This is someone’s problem, but not mine.",
        points: { Cause: 2, FO: 0, Resistance: 0 },
      },
      {
        text: "Leave it be. Nature is cruel but there is an order and a rightness to the cruelty. Only the strong are fated to survive.",
        points: { Cause: 0, FO: 2, Resistance: 0 },
      },
      {
        text: "Nurse the Loth Cat back to health.",
        points: { Cause: 0, FO: 0, Resistance: 2 },
      },
    ],
  },
  {
    id: 5,
    question:
      "You accidentally intercept a transmission. It sounds important and a little illegal. What do you do?",
    answers: [
      {
        text: "Ascertain if someone is in trouble or needs help.",
        points: { Cause: 0, FO: 0, Resistance: 2 },
      },
      {
        text: "Scour it for useful information.",
        points: { Cause: 2, FO: 0, Resistance: 0 },
      },
      {
        text: "Report it to the authorities immediately, making sure the higher-ups know who found it.",
        points: { Cause: 0, FO: 2, Resistance: 0 },
      },
    ],
  },
];

enum Faction {
  Resistance = "The Resistance",
  Cause = "The Cause",
  FirstOrder = "The First Order",
}

// Main Quiz component using Ant Design
function Quiz({
  setAlignment,
}: Readonly<{
  setAlignment: React.Dispatch<React.SetStateAction<string | undefined>>;
}>) {
  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store the scores for each faction
  const [scores, setScores] = useState({ Cause: 0, FO: 0, Resistance: 0 });
  // State to check if the quiz is completed
  const [quizComplete, setQuizComplete] = useState(false);
  // State to store the final result
  const [result, setResult] = useState("");

  // Function to handle answer selection
  const handleAnswerClick = (points: {
    Cause: number;
    FO: number;
    Resistance: number;
  }) => {
    // Update scores based on the selected answer's points
    const updatedScores = { ...scores };
    updatedScores.Cause += points.Cause;
    updatedScores.FO += points.FO;
    updatedScores.Resistance += points.Resistance;
    setScores(updatedScores);

    // Move to the next question or finish the quiz
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Quiz finished, determine the result
      determineResult(updatedScores);
      setQuizComplete(true);
    }
  };

  // Function to determine the final result based on scores
  const determineResult = (finalScores: {
    Cause: number;
    FO: number;
    Resistance: number;
  }) => {
    let highestScore = -1;
    let determinedFaction = "Undetermined"; // Default

    // Find the faction with the highest score (simple tie-breaking)
    if (finalScores.Cause >= highestScore) {
      highestScore = finalScores.Cause;
      determinedFaction = Faction.Cause;
    }
    if (finalScores.FO >= highestScore) {
      if (finalScores.FO > highestScore) {
        highestScore = finalScores.FO;
        determinedFaction = Faction.FirstOrder;
      } else if (
        finalScores.FO === highestScore &&
        determinedFaction !== Faction.Cause
      ) {
        determinedFaction = Faction.FirstOrder;
      }
    }
    if (finalScores.Resistance >= highestScore) {
      if (finalScores.Resistance > highestScore) {
        determinedFaction = Faction.Resistance;
      } else if (
        finalScores.Resistance === highestScore &&
        determinedFaction !== Faction.Cause &&
        determinedFaction !== Faction.FirstOrder
      ) {
        determinedFaction = Faction.Resistance;
      }
    }
    setResult(determinedFaction);
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({ Cause: 0, FO: 0, Resistance: 0 });
    setQuizComplete(false);
    setResult("");
  };

  const saveAlignment = () => {
    if (result == Faction.Resistance) {
      setAlignment(ChainCodeAlignmentString.Light);
    } else if (result == Faction.Cause) {
      setAlignment(ChainCodeAlignmentString.Neutral);
    } else if (result == Faction.FirstOrder) {
      setAlignment(ChainCodeAlignmentString.Dark);
    }
  };

  // Get the current question object
  const currentQuestion = quizData[currentQuestionIndex];
  // Calculate progress percentage
  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / quizData.length) * 100,
  );

  return (
    // Use Ant Design Card as the main container
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "#f0f2f5",
      }}
    >
      <Card
        title={
          <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
            Sorting Helmet
          </Title>
        }
        style={{ maxWidth: 600, width: "100%" }}
      >
        {quizComplete ? (
          // Display results view using Ant Design Result component
          <Result
            status="success" // Or "info" depending on preference
            title="The Sorting Helmet has decided!"
            subTitle={
              <Text strong style={{ fontSize: "1.2em" }}>
                You belong with: {result}
              </Text>
            }
            extra={[
              <Button type="primary" key="restart" onClick={restartQuiz}>
                Take the Quiz Again
              </Button>,
              <Divider key="divider" />,
              <Button type="primary" key="save" onClick={saveAlignment}>
                Confirm {result}
              </Button>,
              /* Optional: Display final scores */
              /*
                            <div key="scores" style={{ marginTop: '20px', textAlign: 'left', color: 'rgba(0, 0, 0, 0.45)' }}>
                                <Text>Final Scores:</Text><br/>
                                <Text>Cause: {scores.Cause}</Text><br/>
                                <Text>First Order: {scores.FO}</Text><br/>
                                <Text>Resistance: {scores.Resistance}</Text>
                            </div>
                            */
            ]}
          />
        ) : (
          // Display quiz question view using Ant Design components
          <div>
            <Title level={4} style={{ marginBottom: "20px" }}>
              Question {currentQuestion.id}/{quizData.length}:{" "}
              {currentQuestion.question}
            </Title>
            {/* Use Ant Design Space for vertical button layout */}
            <Space direction="vertical" style={{ width: "100%" }}>
              {currentQuestion.answers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(answer.points)}
                  block // Makes button take full width
                  size="large" // Make buttons larger
                  style={{
                    height: "auto",
                    whiteSpace: "normal",
                    textAlign: "left",
                  }} // Allow text wrapping
                >
                  {answer.text}
                </Button>
              ))}
            </Space>
            {/* Ant Design Progress Indicator */}
            <Progress
              percent={progressPercent}
              status="active"
              style={{ marginTop: "30px" }}
            />
            {/* Footer/Credit (Optional) */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Text type="secondary" style={{ fontSize: "0.8em" }}>
                Inspired by the Youngling Who Lived Sorting Hat
              </Text>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Quiz;
