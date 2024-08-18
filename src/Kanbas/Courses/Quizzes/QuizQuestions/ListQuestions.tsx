import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";

export default function ListQuestions({ quiz, sanitizeHTML }: { quiz: any; sanitizeHTML: (html: any) => any; }) {
    return (
        <div className="row">
            <div className="col-12">
                {quiz && quiz.questions.map((q: any, index: Number) => (
                    <div className="row border border-secondary mt-2 mb-4 mt-4 ms-3 me-3 w-75">
                        <div className="col-6 bg-secondary">
                            <h3 className="mt-2 mb-2">{q.title}</h3>
                        </div>
                        <div className="col-6 text-end bg-secondary">
                            <h3 className="mb-2 mt-2">{q.points} pts</h3>
                        </div>
                        <div className="col-12 mt-4 mb-4 text-left" dangerouslySetInnerHTML={sanitizeHTML(q.question)} />
                        <div className="mb-2">
                            {q.answerType === "Multiple Choice" &&
                                <MultipleChoiceQuestion question={q} />
                            }
                            {q.answerType === "True/False" &&
                                <TrueFalseQuestion question={q} />
                            }
                            {q.answerType === "Fill In the Blank" &&
                                <OpenEndedQuestion question={q} />
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-12">
                <div className="w-75 ms-3 me-3">
                    <hr />
                    <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end">Submit Quiz</button>
                </div>
            </div>
        </div>


    );
}