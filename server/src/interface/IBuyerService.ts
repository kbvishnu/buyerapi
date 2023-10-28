
import { Buyer } from "../model/buyer";


interface IBuyerService {
    deleteBuyer(buyerId: string): Promise<boolean>;
    getBuyer(email: string): Promise<Buyer>;         
    getBuyers(): Promise<Buyer[]>
    saveBuyer(buyer:Buyer):Promise<string>;
  }

export default IBuyerService;