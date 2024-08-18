export default function TrueFalseQuestion({ question }: { question: any }) {
    return (
        <div>
            <div className="mb-2">
                <hr />
                <div className="d-flex">
                    <input type="radio" className="form-check-input me-4" name={`true-false-option-${question._id}`}
                        id={`true-false-option-${question._id}-true`} />
                    <label className="form-label"
                        htmlFor={`true-false-option-${question._id}-true`}>True</label>
                </div>
            </div>
            <div className="mb-2">
                <hr />
                <div className="d-flex">
                    <input type="radio" className="form-check-input me-4" name={`true-false-option-${question._id}`}
                        id={`true-false-option-${question._id}-false`} />
                    <label className="form-label"
                        htmlFor={`true-false-option-${question._id}-false`}>False</label>
                </div>
            </div>
        </div>
    );
}