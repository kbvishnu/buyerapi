// import {injectable, inject} from "tsyringe";
// import IBuyerRepo  from "../interface/IBuyerRepo";
// import { Buyer } from "../model/buyer";
// import IBuyerService from "../interface/IBuyerService";
// import { Bid } from "../model/bid";
// import { ValidateError } from "tsoa";
// import axios from 'axios';
// import IBidService from "../interface/IBidService";
// import { Product } from "src/model/product";

// @injectable()
// export class BidService implements IBidService{
//     private bidServiceEndpoint: string;  
  
//     constructor () { 
//       this.bidServiceEndpoint = "http://localhost:4000/bid";
//     }
   
    

//     async saveBid(bid:Bid):Promise<string|null>{
//       let bidId:string;
//       await axios.post(this.bidServiceEndpoint, bid)
//       .then(function (response) {         
//         bidId =response.data as string;    
//       })
//       .catch(function (error) {  
//          const errMsg= error?.response?.data;         
//          throw new ValidateError(errMsg.details,errMsg.name);
         
//       });  
//       return bidId; 
//     } 

// } 