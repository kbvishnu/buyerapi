import { Buyer } from "../model/buyer";


interface IBuyerRepo {
    deleteBuyer(buyerEmail: string): Promise<boolean>;
    getBuyer(buyerEmail: string): Promise<Buyer>;         
    getBuyers(): Promise<Buyer[]>;
    saveBuyer(buyer:Buyer):Promise<string>;
  }

export default IBuyerRepo;