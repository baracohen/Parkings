export default class commonUtils{

    static setDateFormat(date: Date) {
        return ('0' + date.getDate()).slice(-2) + '.'
        + ('0' + (date.getMonth()+1)).slice(-2) + '.'
        + date.getFullYear();
    }

    static getRangeDates (startDate:Date, endDate:Date) {

        const arr = new Array();
        const dt = new Date(startDate);
        while (dt <= endDate) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
       }


}