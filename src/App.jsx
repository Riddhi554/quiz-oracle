import {useState} from 'react';
import QuizItems from './components/QuizItems';
import WelcomeScreen from './components/WelcomeScreen';
import {nanoid} from 'nanoid';

function App() {
    const [quizStart, setQuizStart] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [quizItems, setQuizItems] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    async function getQuiz() {
        const apiUrl = 'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy';
        const req = await fetch(apiUrl);
        const data = await req.json();
        const quizObjects = data.results.map((obj) => {
            const choices = [obj.correct_answer, ...obj.incorrect_answers].sort(
                () => 0.5 - Math.random()
            );
            return {...obj, id: nanoid(), choices};
        });
        setQuizItems(quizObjects);
    }
    function startQuiz() {
        setQuizStart(true);
        setShowAnswers(false);
        setSelectedAnswers([]);
        getQuiz();
    }
    function checkAnswers() {
        setShowAnswers((prevState) => !prevState);
    }
    function getAnswer(obj) {
        setSelectedAnswers((prevState) => {
            //check if answer from given QuizItem was send
            if (
                prevState.length > 0 &&
                prevState.some((item) => item.id === obj.id)
            ) {
                // if answer from give QuizItem was clicked replace it with the new answer
                const oldState = prevState.filter((item) => item.id !== obj.id);
                return [...oldState, obj];
            }
            return [...prevState, obj];
        });
    }
    function countCorrect() {
        let count = 0;
        quizItems.forEach((item) => {
            if (
                selectedAnswers.some(
                    (answer) => answer.txt === item.correct_answer
                )
            ) {
                count++;
            }
        });
        return count;
    }
    const quizItemsProps = {
        quizItems,
        startQuiz,
        checkAnswers,
        showAnswers,
        getAnswer,
        countCorrect,
        selectedAnswers,
    };
    return (
        <div className='container'>
            {!quizStart && <WelcomeScreen startQuiz={startQuiz} />}
            {quizStart && <QuizItems {...quizItemsProps} />}
        </div>
    );
}

export default App;
