export default function MultipleChoiceQuestion({ question }: { question: any }) {
    return (
        question && question.answerOptions.map((a: any, aIndex: Number) => (
            <div className="mb-2">
                <hr />
                <div className="d-flex">
                    <input type="radio" className="form-check-input me-4" name={`multiple-choice-option-${question._id}`}
                        id={`multiple-choice-option-${question._id}-${aIndex}`} />
                    <label className="form-label"
                        htmlFor={`multiple-choice-option-${question._id}-${aIndex}`}>{a}</label>
                </div>
            </div>
        ))
    );
}