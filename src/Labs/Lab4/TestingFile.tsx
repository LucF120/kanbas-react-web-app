export default function TestingFile() {
    const handleClick = (parameter = "Hello") => {
        console.log(parameter)
      }
    return (
        <button onClick={handleClick}>
  Hello
</button>
    );
}