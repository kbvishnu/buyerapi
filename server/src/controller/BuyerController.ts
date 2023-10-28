
import "reflect-metadata";
import IBuyerService from "../interface/IBuyerService";
import {injectable, inject, singleton} from "tsyringe";
import { Buyer } from "../model/buyer";
import { ValidationError } from "../exception/ValidationError";
import {  Body, Get, Post, Route, SuccessResponse } from "tsoa";
import IBidService from "../interface/IBidService";
import { Bid } from "../model/bid";


@singleton()
@injectable()
@Route("buyer")

export class BuyerController {
    private buyerService: IBuyerService;  
    private bidService: IBidService;
    
    constructor (@inject("IBuyerService")buyerService: IBuyerService,
    @inject("IBidService")bidService: IBidService) { 
      this.buyerService = buyerService;
      this.bidService= bidService;
    }
    
  /**
   * Retrieves the list  of a buyers.
   
   */
    @Get("/get-buyers")
     public async getBuyers(): Promise<Array<Buyer>| null>{
      return await this.buyerService.getBuyers();       
    }

    @SuccessResponse("201", "Created")  
    @Post("place-bid")
      public async saveBuyer( @Body() buyer:Buyer): Promise<string> {
         let buyerId: string;
         let deleteRequired: boolean;
         try{
          const buyerDb= await this.buyerService.getBuyer(buyer.email);
          console.log(JSON.stringify(buyerDb));
          if(buyerDb)
            buyerId= buyerDb._id as unknown  as string ;
          else
          {
            const validationMsg= this.validateBuyer(buyer)
            if(!validationMsg)  {
              buyerId= await this.buyerService.saveBuyer(buyer);
              console.log(buyerId);
              deleteRequired=true; 
          }
          else
           throw new ValidationError(validationMsg);           
          }

          if(buyerId)
          {
            buyer.bid.buyerId=buyerId;
            buyer.bid.buyerEmail= buyer.email;
            buyer.bid.requestedDate= new Date();
            const bidId= await this.bidService.saveBid(buyer.bid); 
            console.log(bidId);
            if(bidId)
              return buyerId;
          }
          else
           throw new ValidationError("Failed to save seller and product");


         }
         catch(error)
        {
          console.log("deleting buyer");
          if(buyerId && deleteRequired)
            await this.buyerService.deleteBuyer(buyer.email);          
          throw error;
        }        
    }
    

    validateBuyer= (buyer: Buyer):string=> {
      
      if(buyer.firstName.length<5 || buyer.firstName.length>30)
        return "Firstname should follow min 5 to max 30 chars";
    
      if(buyer.lastName.length<5 || buyer.lastName.length>30)  
        return "Lastname should follow min 5 to max 30 chars";      
      
      const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!regexp.test(buyer.email))
        return "Email should follow standard format";
  
      if(!buyer.phone)
        return "Phone should be not null";      
        
      if(buyer.phone.length!=10)
        return "Phone number should be 10 digits";
      
      if(isNaN(+buyer.phone))
        return "Phone number be a number";
      
      return "";
    }

    
    @SuccessResponse("201", "Created")  
    @Post("update-bid/{productid}/{buyerEmailid}/{newbidAmount}")
      public async updateBid( productid:string,buyerEmailid:string,newbidAmount:number): Promise<string> {
         let buyerId: string;
         
         try{

          const buyerDb= await this.buyerService.getBuyer(buyerEmailid);
          if(buyerDb)
            buyerId= buyerDb._id as unknown  as string ;
          else
            throw new ValidationError("Invalid buyer email");           
          
          const bid:Bid = { "buyerEmail": buyerEmailid, "buyerId":buyerId,
            "productId":productid,"requestedDate":new Date(), "bidAmount":newbidAmount};
          
          const bidId= await this.bidService.saveBid(bid); 
          if(bidId)
              return bidId;
          else
              throw new ValidationError("Failed to upate bid");

         }
         catch(error)
         {
           console.error(error);
         }             
    }
  }
  
  export default BuyerController ;



