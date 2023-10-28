
import * as mongodb from "mongodb";
import IBuyerRepo  from "../interface/IBuyerRepo";
import { Buyer } from "../model/buyer";
import {collections} from "../database";


export class BuyerRepo implements IBuyerRepo{
    private buyerCollection : mongodb.Collection<Buyer>;
  
    constructor () { 
      this.buyerCollection = collections.buyers;
    }


    async getBuyers(): Promise<Buyer[]> {
       return await this.buyerCollection.find({}).toArray();
    }

    async saveBuyer(buyer:Buyer):Promise<string>{
      const result = await this. buyerCollection.insertOne(buyer);
  
        if (result.acknowledged) 
           return result.insertedId.toString();
        
        throw new Error("Failed while trying to insert buyer");          
        
    }

    async getBuyer(buyerEmail:string): Promise<Buyer> {
      const filter: mongodb.Filter<Buyer> = {       
        email :buyerEmail
      } 
      return await this.buyerCollection.findOne(filter);
   }


    async deleteBuyer(buyerEmail:string): Promise<boolean> {
      const filter: mongodb.Filter<Buyer> = {       
        email :buyerEmail
      } 
      const delResult= await this.buyerCollection.deleteOne(filter);
      return delResult.acknowledged;
   }

}