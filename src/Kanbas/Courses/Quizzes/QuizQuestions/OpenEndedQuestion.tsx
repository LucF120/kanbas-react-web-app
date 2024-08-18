export default function OpenEndedQuestion({ question }: { question: any }) {
    return (
        <div className="mb-2">
            <hr />
            <input className="form-control" id={`open-ended-${question._id}`} />
        </div>
    );
}