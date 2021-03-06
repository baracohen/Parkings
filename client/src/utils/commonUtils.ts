import parkingService from "@/api/parkingService";
import { ParkingModel, ParkingsObj, ParkingSpotModel } from "@/models/parkingsModel";
import Swal from 'sweetalert2'

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

    static async cancelConnection(parkingObj : ParkingModel) {
        return await parkingService.cancelConnection(parkingObj)
    
    }


    static getRangeDates (startDate:Date, endDate:Date) {

        const arr = new Array();
        const dt = new Date(startDate);
        const _endDate = new Date(endDate)
        while (dt.setHours(0, 0, 0, 0) <= _endDate.setHours(0, 0, 0, 0)) {
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
          return await parkingService.saveParkings(obj)
    }

    static getUser(){
        const _user = localStorage.getItem('user');
        if(_user && _user.length > 0) {
            return _user
        }
    }

    static checkIfUserBookedInThisDay(parkings: ParkingsObj[], date: string, userId: string){
        const _parkings = parkings.filter(obj => {return obj.date === date});
        if(_parkings && _parkings.length > 0) {
            const isDisabled = _parkings[0].parkings.filter((obj: ParkingModel) => {return obj.userId == userId});
            if(isDisabled && isDisabled.length > 0 ) {
                return true
            }
        }
        
        return false
    }

    static setAvailableParkings(data: ParkingsObj[], userId: string) {
        const _data = [] as ParkingsObj[];
                
        data.forEach(obj => {
          let element = [] as ParkingModel[]
              element = obj.parkings.filter(obj => {return obj.isAvailable === true || obj && obj.userId == userId})
              obj.parkings = element

              _data.push(obj);
        });
        return _data;
    }
    static showSucssesModal(title: string, showConfirmButton:boolean) {
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: showConfirmButton,
            timer: 2000
          });
    }
    static showSucssesModalWithoutTimer(title: string, showConfirmButton:boolean) {
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: showConfirmButton,
          });
    }
    
    static showErrorModal(title: string,  ) {
        Swal.fire({
            icon: 'error',
            title: title,
            showConfirmButton: true,
          });
    }


}