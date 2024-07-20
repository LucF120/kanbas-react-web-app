// Convert YYYY-MM-DDTHH:MM to "Month Day at HH:MM (am/pm)"
const dateToString = (date: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

    return months[monthNum] + " " + day + " at " + hourNum + ":" + minute + " " + timeOfDay;
}

export default dateToString;