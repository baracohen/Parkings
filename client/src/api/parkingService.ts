import { ParkingModel, ParkingsObj, ParkingSpotModel } from '@/models/parkingsModel';
import UserModel from '@/models/userModel';
import axios from 'axios'

const url = 'http:localhost:5000/api/parkings'
export default class parkingService{

    static async login(email:string, pass:string): Promise<UserModel> {
      try{
        const res = await axios.post('http://localhost:5000/api/parkings/login', {
          email: email,
          pass: pass
        });
        return res.data;
      }catch(err) {
        return err
      }
    }

    static async getTodayUserParking(userId: string, date: string): Promise<any> {
      const _user = localStorage.getItem('user');
      if(_user) {
        try{
          const res = await axios.post('http://localhost:5000/api/parkings/todayUserParking', {
            userId: userId,
            date: date
          });
          return res.data;
        }catch(err) {
          return err
        }
      }
    }

    static async saveParkings(parkings: Array<ParkingSpotModel>):Promise<boolean> {
      try{
        const res = await axios.post("http://localhost:5000/api/parkings/saveParkings",{
          parkings: parkings,
        });
        return res.data;
      }catch(err) {
        return err
      }
    }
    
    
    static async getUserParkings(): Promise<Array<ParkingsObj>> {
      let userId;
      const _user = localStorage.getItem('user');
      if(_user && _user.length > 0) {
          userId = JSON.parse(_user).userId
      }
      try{
        const res = await axios.post("http://localhost:5000/api/parkings/userParkings",{
          userId: userId,
        });
        return res.data;
      }catch(err) {
        return err
      }
    }

    static async getTodayParkings(dates: string[], isAll: boolean ): Promise<Array<ParkingsObj>> {
      try{
        const res = await axios.post("http://localhost:5000/api/parkings/todayParkings", {
          dates:dates,
          isAll:isAll
        });
        return res.data;
      }catch(err) {
        return err
      }
    }


    static async getAvailableParkings(dates: string[], isAll: boolean): Promise<Array<ParkingsObj>> {
      try{
        const res = await axios.post('http://localhost:5000/api/parkings/todayParkings', {
          dates:dates,
          isAll: isAll
        });
        debugger;
        return res.data;
      }catch(err) {
        return err
      }
    }
}