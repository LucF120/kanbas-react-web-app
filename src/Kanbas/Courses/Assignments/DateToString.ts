// Convert YYYY-MM-DDTHH:MM to "Month Day at HH:MM (am/pm)"
const dateToString = (date: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let month = date[5] + date[6];
    let monthNum = parseInt(month);
    let day = "";

    if (date[8] === "0") {
        day = date[9];
    } else {
        day = date[8] + date[9];
    }

    let hour = date[11] + date[12];
    let minute = date[14] + date[15];
    let hourNum = parseInt(hour);
    let timeOfDay = "";
    if (hourNum >= 12) {
        timeOfDay = "pm";
        hourNum = hourNum - 12;
    } else {
        if (hourNum == 0) {
            hourNum = 12;
        }
        timeOfDay = "am";
    }

    return months[monthNum-1] + " " + day + " at " + hourNum + ":" + minute + " " + timeOfDay;
}

export const dateTimeConvert = (date: string): string => {
    const localDate = new Date(date);
    const datePart = localDate.toLocaleDateString('sv-SE');
    const timePart = localDate.toLocaleTimeString('sv-SE', { hour12: false });
    return `${datePart}T${timePart}`;
};

export default dateToString;