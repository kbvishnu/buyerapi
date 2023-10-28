
import { Mock, It, Times } from "moq.ts";
import { describe, expect,it } from '@jest/globals';

import IBuyerRepo from '../src/interface/IBuyerRepo';
import IBuyerService from '../src/interface/IBuyerService'
import { Buyer } from '../src/model/buyer';
import BuyerController from '../src/controller/BuyerController';
import {BuyerService} from '../src/implementations/BuyerService';


const arrangeBuyers=():Buyer=>{
  const buyer:Buyer = { 
    address:"E12, Richmond Street",
    city:"London",
    email:"primebuyer-london@buyers.com",
    firstName:"Prime",
    lastName:"Buyer",
    phone:"1234567890",
    pin:"WB12 JX2",
    state:"London"
  };
  return buyer;

}

describe('Validate buyer', () => {
 
 
  const mockBuyerRepo= new Mock<IBuyerRepo>();      
  const mockBuyerObject=mockBuyerRepo.object();  
  const buyerService:IBuyerService= new BuyerService(mockBuyerObject);
  const buyerController= new BuyerController(buyerService);

  it(`When buyer first name is empty`, async() => {
  
    const buyerFN=arrangeBuyers();
    buyerFN.firstName="";   
     
    try {
      
      await buyerController.saveBuyer(buyerFN);
    } catch(e) {          
      expect(e.message).toMatch("Firstname should follow min 5 to max 30 chars");
    }
  }),
  it(`When buyer last name is empty`, async() => {
  
    const buyerLN=arrangeBuyers();
    buyerLN.lastName="";   
   
    try {
      
      await buyerController.saveBuyer(buyerLN);
    } catch(e) {          
      expect(e.message).toMatch("Lastname should follow min 5 to max 30 chars");
    }
  }),
  it(`When buyer phone got more than 10 numbers`, async() => {
  
    const buyerP1=arrangeBuyers();
    buyerP1.phone="78923491289";   
    
    try {
      
      await buyerController.saveBuyer(buyerP1);
    } catch(e) {          
      expect(e.message).toMatch("Phone number should be 10 digits");
    }
  }),
  it(`When buyer has no phone`, async() => {
  
    const buyerP2=arrangeBuyers();
    buyerP2.phone="";   
   
    try {
      
      await buyerController.saveBuyer(buyerP2);
    } catch(e) {          
      expect(e.message).toMatch("Phone should be not null");
    }
  }),
  it(`When buyer has no phone`, async() => {
  
    const buyerP3=arrangeBuyers();
    buyerP3.phone="AB";   
    
    try {
      
      await buyerController.saveBuyer(buyerP3);
    } catch(e) {          
      expect(e.message).toMatch("Phone number should be 10 digits");
    }
  }),
  it(`When buyer has no email`, async() => {
  
    const buyerP4=arrangeBuyers();
    buyerP4.email="abcd";
    
    try {
      
      await buyerController.saveBuyer(buyerP4);
    } catch(e) {          
      expect(e.message).toMatch("Email should follow standard format");
    }
  })

});


describe('Get buyer', () => {   
      
  it(`Returns List of buyers `, async () => {
              
        
    const buyer= arrangeBuyers();
    const buyers=  [buyer];
    
    const mockBuyerRepo=  
    new Mock<IBuyerRepo>()    
    .setup(async instance => instance.getBuyers()).returnsAsync(buyers);

    const mockBuyerObject=mockBuyerRepo.object();   

    const buyerService:IBuyerService= new BuyerService(mockBuyerObject);
    const buyerController= new BuyerController(buyerService);   

    const actual = await buyerController.getBuyers();

    expect(actual).toBe(buyers);
    mockBuyerRepo.verify(instance=>instance.getBuyers,Times.Once());         
    
    })
         
})

describe('Save buyer', () => {
  
  it(`Returns buyer id`, async () => {
              
    const buyer =arrangeBuyers();

    const mockBuyerRepo=  
    new Mock<IBuyerRepo>()    
    .setup(async instance => instance.saveBuyer(It.IsAny<Buyer>())).returnsAsync("buyerId");

    const mockBuyerObject=mockBuyerRepo.object();   

    const buyerService:IBuyerService= new BuyerService(mockBuyerObject);
    const buyerController= new BuyerController(buyerService);         
            

    const actual = await buyerController.saveBuyer(buyer);

    expect(actual).toBe("buyerId");
    mockBuyerRepo.verify(instance=>instance.saveBuyer,Times.Once());         
    
    })
  
  })



 
 
    