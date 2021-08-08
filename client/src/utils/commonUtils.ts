import parkingService from "@/api/parkingService";
import { ParkingModel, ParkingSpotModel } from "@/models/parkingsModel";
import swal from "sweetalert";

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
        _date.setMonth(_date.getMonth() + 1 );
        
        const name = weekdayName + ' ' + _date.getDate() + '.' + _date.getMonth() + '.' + _date.getFullYear() ; 
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
       

    static async saveConnection (parkingObj : ParkingModel) {
        const user =  localStorage.getItem("user");

        const obj= {} as ParkingSpotModel

          obj.parkingId = parkingObj.parkingId,
          obj.date = parkingObj.date,
          obj.floor = parkingObj.floor,
          obj.userId = JSON.parse(user as string).userId
        debugger;
        const data = await parkingService.saveParkings(obj)
        if(data) {
         swal("Congrats! all the parkings are saved for you!", {
              icon: "success",
          });
        } else {
            swal("Someone has ordered some of the parkings, please refresh the page and try again", {
              icon: "error",
          });
        }


    }


}