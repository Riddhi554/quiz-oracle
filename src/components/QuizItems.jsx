import QuizItem from './QuizItem';

function QuizItems({
    quizItems,
    startQuiz,
    checkAnswers,
    showAnswers,
    getAnswer,
    countCorrect,
    selectedAnswers,
}) {
    return (
        <div className='quiz-items'>
            {quizItems.map((item) => {
                return (
                    <QuizItem
                        key={item.id}
                        id={item.id}
                        data={item}
                        choices={item.choices}
                        showAnswers={showAnswers}
                        getAnswer={getAnswer}
                        selectedAnswers={selectedAnswers}
                    />
                );
            })}
            <div className='quiz-items-btns'>
                {!showAnswers ? (
                    <button className='btn' onClick={checkAnswers}>
                        Check answers
                    </button>
                ) : (
                    <>
                        <span>
                            You scored {countCorrect()}/{quizItems.length}{' '}
                            correct answers
                        </span>
                        <button className='btn' onClick={startQuiz}>
                            Play again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default QuizItems;
