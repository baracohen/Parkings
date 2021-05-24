import { ParkingModel } from '@/models/parkingsModel';
import axios from 'axios'

const url = 'http:localhost:5000/api/parkings'
export default class parkingService{

    //get parkings
    static login(email:string, pass:string) {
        return new Promise((resolve, rej) => {
            try{
                axios.post('http://localhost:5000/api/parkings/login', {
                    email: email,
                    pass: pass
                  })
                  .then((res :any) => {
                    resolve(res); 
                  }, (error:any) => {
                    rej(error)
                  });
            }catch(err) {
                rej(err)
            }
        })

  
    
    }
    static getUserParkings() {
        return new Promise((resolve, rej) => {
            try{
                let userId;
                const _user = localStorage.getItem('user');
                if(_user && _user.length > 0) {
                    userId = JSON.parse(_user).userId
                }
                console.log(userId);
                axios.post('http://localhost:5000/api/parkings/userParkings', {
                    userId: userId,
                  })
                  .then((res) => {
                    resolve(res.data); 
                  }, (error) => {
                    rej(error)
                  });
            }catch(err) {
                rej(err)
            }
        })
    
    }
    //update parkings
    static async getTodayParkings(): Promise<Array<ParkingModel>> {
      try{
        const res = await axios.post("http://localhost:5000/api/parkings/todayParkings");
        return res.data;
      }catch(err) {
        return err
      }
    }


    static async getAvailableParkings(dates: Date[]): Promise<Array<ParkingModel>> {
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