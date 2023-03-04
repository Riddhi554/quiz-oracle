function WelcomeScreen({startQuiz}) {
    return (
        <div className='quiz-welcome'>
            <h1>Quiz oracle</h1>
            <p>Quick quiz for everybody</p>
            <button className='btn' onClick={startQuiz}>
                Start quiz
            </button>
        </div>
    );
}

export default WelcomeScreen;
