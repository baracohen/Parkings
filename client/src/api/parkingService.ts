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
                  .then((response) => {
                    resolve(response); 
                  }, (error) => {
                    rej(error)
                  });
            }catch(err) {
                rej(err)
            }
        })

  
    
    }
    static getParkings() {
        // try{

        // }catch(err) {

        // }
    
    }
    //update parkings
    static updateParkings() {
        
    }

}