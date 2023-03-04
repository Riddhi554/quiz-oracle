import he from 'he';
import ChoiceItem from './ChoiceItem';
function QuizItem({
    id,
    showAnswers,
    choices,
    getAnswer,
    selectedAnswers,
    ...data
}) {
    function sendAnswer(obj) {
        getAnswer(obj);
    }
    return (
        <div className='quiz-item'>
            <h4 className='quiz-question'>{he.decode(data.data.question)}</h4>
            <div className='quiz-choices'>
                {choices.map((choice) => {
                    let spanClass = '';
                    //check if choice is in the selectedAnswers array
                    const checkSelected = selectedAnswers.some(
                        (answer) => answer.txt === choice
                    );
                    if (showAnswers) {
                        if (
                            data.data.correct_answer === choice &&
                            checkSelected
                        ) {
                            spanClass = 'answer-correct';
                        } else if (
                            data.data.correct_answer !== choice &&
                            checkSelected
                        ) {
                            spanClass = 'answer-incorrect muted';

                        } else if (!checkSelected) {
                            spanClass = 'muted';
                        }
                    }

                    return (
                        <ChoiceItem
                            key={choice}
                            id={id}
                            sendAnswer={sendAnswer}
                            showAnswers={showAnswers}
                            choice={choice}
                            spanClass={spanClass}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default QuizItem;
