import { container, Lifecycle } from "tsyringe";
import IBuyerRepo from "../interface/IBuyerRepo";
import IBuyerService from "../interface/IBuyerService";
import {BuyerRepo }from "../implementations/BuyerRepo";
import {BuyerService} from "../implementations/BuyerService";
import BuyerController from "../controller/BuyerController"; 
import IBidService from "../interface/IBidService";
import { BiddingService } from "../implementations/BiddingService";
// import IProductService from "../interface/IProductService";
// import { ProductService } from "../implementations/ProductService";



export  function registerDependencies() {
    
    
    container.register<IBuyerRepo>('IBuyerRepo', {useClass: BuyerRepo},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IBuyerService>('IBuyerService', {useClass: BuyerService},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IBidService>('IBidService', {useClass: BiddingService},  
    { lifecycle: Lifecycle.Singleton } );

   
    container.registerSingleton(BuyerController); 
    
    return container;
    
}


   