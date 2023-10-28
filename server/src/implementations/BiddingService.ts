 

import { injectable } from 'tsyringe';
import axios from 'axios';
 
import { ValidateError } from 'tsoa';
import IBidService from '../interface/IBidService';
import { Bid } from '../model/bid';


 @injectable()
export class BiddingService implements IBidService{
    private bidServiceEndPoint: string;  
  
    constructor () { 
      this.bidServiceEndPoint = "http://localhost:4000/bid/";
    }


    async saveBid(bid:Bid):Promise<string|null>{
      let bidId:string;
      await axios.post(this.bidServiceEndPoint, bid)
      .then(function (response) {        
        if(response.status==201)                       
          bidId=response.data; 
        else 
         throw new Error("Error while saving bid");
      })
      .catch(function (error) {  
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
         
      });  
      return bidId; 
    }


    async getBids(productId:string): Promise<Bid[]|null> {       
      
      let bid:Bid[]=[];
      await axios.get(this.bidServiceEndPoint+"show-bids/"+productId)
      .then(function (response) {   
          if(response.status==200)
          {
            if(!response.data){
              console.log(response.data);
              bid= <Bid[]>JSON.parse(response.data);
            }
          }
      })
      .catch(function (error) {  
         console.log(error);
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
      });     
      return bid;
    }    
}