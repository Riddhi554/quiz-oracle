import he from 'he';
function ChoiceItem({id, choice, sendAnswer, showAnswers, spanClass}) {
    function click(e) {
        [...e.target.parentNode.children].forEach((elem) =>
            elem.classList.remove('selected')
        );
        e.target.classList.add('selected');
        if (!showAnswers) {
            sendAnswer({id, txt: e.target.textContent});
        }
    }
    return (
        <span key={choice} onClick={click} className={spanClass}>
            {he.decode(choice)}
        </span>
    );
}

export default ChoiceItem;
