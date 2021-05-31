import { ParkingModel, ParkingsObj } from '@/models/parkingsModel';
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

    static async getTodayParkings(): Promise<Array<ParkingsObj>> {
      try{
        const res = await axios.post("http://localhost:5000/api/parkings/todayParkings");
        return res.data;
      }catch(err) {
        return err
      }
    }


    static async getAvailableParkings(dates: Date[]): Promise<Array<ParkingsObj>> {
      try{
        const res = await axios.post('http://localhost:5000/api/parkings/availableParkings', {
          dates:dates
        });
        return res.data;
      }catch(err) {
        return err
      }
    }
}