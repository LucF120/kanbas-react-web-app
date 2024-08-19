import moment from 'moment-timezone';

export const nowInEST = () => {
    return moment.tz("America/New_York").format("YYYY-MM-DDTHH:mm:ss") + "Z";
};

export const nextWeekInEST = () => {
    const nowEST = moment.tz("America/New_York");
    const oneWeekLater = nowEST.add(1, 'weeks'); // Add 1 week

    return oneWeekLater.format("YYYY-MM-DDTHH:mm:ss") + "Z";
};