import { useState, useEffect, useRef } from "react";
import FlashCardList from "./component/FlashCardList";
import FormComponent from "./component/FormComponent";
import "./app.css";
import axios from "axios";
import Skeleton from "./component/Skeleton";

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchTime, setFetchTime] = useState(Date.now());

  const categoryEl = useRef();
  const amountEl = useRef();
  const difficultyEl = useRef();
  const typeEl = useRef();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        setCategories(res.data.trivia_categories);
      })
      .catch((err) => handleError(err, "category"))
      .finally(() => setLoading(false));
  }, []);

  function handleError(err, context) {
    if (context === "category") {
      setError("Error fetching categories. Please refresh your page");
    } else if (context === "question") {
      setError("Error fetching question. Please refresh your page");
    } else {
      setError(err.message);
    }
  }

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const params = {
      amount: amountEl.current.value,
    };
    if (categoryEl.current.value !== "any-category") {
      params.category = categoryEl.current.value;
    }
    if (difficultyEl.current.value !== "any-difficulty") {
      params.difficulty = difficultyEl.current.value;
    }
    if (typeEl.current.value !== "any-type") {
      params.type = typeEl.current.value;
    }

    setLoading(true);
    const delay = Math.max(0, 5000 - (Date.now() - fetchTime));
    setTimeout(() => {
      // Fetch questions here
      axios
        .get("https://opentdb.com/api.php", { params })
        .then((res) => {
          const results = res.data.results;

          if (results.length === 0) {
            setError(null);
            throw new Error(
              "It seems I don't have that many questions for your query"
            );
          } else {
            setFetchTime(Date.now());
            setFlashCards(
              results.map((questionItem, index) => {
                const answer = decodeString(questionItem.correct_answer);
                const options = [
                  ...questionItem.incorrect_answers.map((a) => decodeString(a)),
                  answer,
                ];
                return {
                  id: `${index}-${Date.now()}`,
                  type:
                    questionItem.type === "boolean"
                      ? "True/False"
                      : "Multiple Choice",
                  category: decodeString(questionItem.category),
                  difficulty:
                    questionItem.difficulty === "easy"
                      ? "Easy"
                      : questionItem.difficulty === "medium"
                      ? "Medium"
                      : "Hard",
                  question: decodeString(questionItem.question),
                  answer: answer,
                  options: options.sort(() => Math.random() - 0.5),
                };
              })
            );
          }
        })
        .catch((error) => {
          setFlashCards([]);
          handleError(error);
        })
        .finally(() => setLoading(false));
    }, delay);
  }

  return (
    <>
      <FormComponent
        categories={categories}
        onSubmit={handleSubmit}
        categoryEl={categoryEl}
        difficultyEl={difficultyEl}
        typeEl={typeEl}
        amountEl={amountEl}
        loading={loading}
        error={error}
      />
      <div className="container">
        {loading && <Skeleton />}
        {!loading && !error && <FlashCardList flashCards={flashCards} />}
      </div>
      {error && <p>Error: {error}</p>}
    </>
  );
}

export default App;
