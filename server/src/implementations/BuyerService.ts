import {injectable, inject} from "tsyringe";
import IBuyerRepo  from "../interface/IBuyerRepo";
import { Buyer } from "../model/buyer";
import IBuyerService from "../interface/IBuyerService";

@injectable()
export class BuyerService implements IBuyerService{
    private buyerRepo: IBuyerRepo;  
  
    constructor (@inject("IBuyerRepo")buyerRepo: IBuyerRepo) { 
      this.buyerRepo = buyerRepo;
    }


    getBuyers(): Promise<Buyer[]> {
       return this.buyerRepo.getBuyers();
    }

    saveBuyer(buyer:Buyer):Promise<string>{
      return this.buyerRepo.saveBuyer(buyer);
      
    }

    getBuyer(buyerEmail:string): Promise<Buyer> {
      return this.buyerRepo.getBuyer(buyerEmail);
   }

   deleteBuyer(buyerEmail:string): Promise<boolean> {
    return this.buyerRepo.deleteBuyer(buyerEmail);
 }

}