export default class commonUtils{

    static setDateFormat(date: Date) {
        return ('0' + date.getDate()).slice(-2) + '.'
        + ('0' + (date.getMonth()+1)).slice(-2) + '.'
        + date.getFullYear();
    }

    static saveDateFormat(date: string) {

        const arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const dateObj = new Date(date)
        const weekdayNumber = dateObj.getDay();
        const weekdayName = arrayOfWeekdays[weekdayNumber];

        const _date = new Date(date);
        const name = weekdayName + ' ' + _date.getDay() + '.' + _date.getMonth() + '.' + _date.getFullYear() ; 
        return name;
    }



    static getRangeDates (startDate:string, endDate:string) {

        const arr = new Array();
        const dt = new Date(startDate);
        const _endDate = new Date(endDate)
        while (dt <= _endDate) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
       }
       
       static setIsSelectedFalse (parkingsArr: any) {
            
            const newArr: any = [];
            if(parkingsArr && parkingsArr.length > 0) {
                parkingsArr.forEach((obj:any) => {
                    if(obj.parkings && obj.parkings.length > 0) {
                        obj.parkings.forEach((element:any) => {
                            element.isSelected = false;
                        });
                    }
                });
            }   

            return newArr;
       }


}