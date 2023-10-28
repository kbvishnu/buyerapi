
import { Bid } from "../model/bid";



interface IBidService {         
    saveBid(bid:Bid): Promise<string|null>;
    
  }

export default IBidService;