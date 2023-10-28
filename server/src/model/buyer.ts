import * as mongodb from "mongodb";
import { Bid } from "./bid";
 
export interface Buyer {
   firstName: string;
   lastName: string;
   address: string;
   city: string;
   state: string;
   pin: string;
   phone:string;
   email:string; 
   bid: Bid;
   _id?: mongodb.ObjectId;
}
