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