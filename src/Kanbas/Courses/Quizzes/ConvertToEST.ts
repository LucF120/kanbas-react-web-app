export const nowInEST = () => {
    const nowUTC = new Date();
    const estOffset = -5 * 60 * 60 * 1000;
    const nowEST = new Date(nowUTC.getTime() + estOffset);

    return nowEST;
};