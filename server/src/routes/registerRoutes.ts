import { Application } from "express";
import buyerRouter from "../routes/buyer.routes" 
import BuyerController from "../controller/BuyerController";
import { container } from "tsyringe";
import { registerDependencies } from "../di/DependencyRegister";
import PingController from "../controller/PingController";
import pingRouter from "./ping.routes";

export default function registerRoutes(app: Application) {

    registerDependencies();
    
     
    app.use("/ping", pingRouter(new PingController()));

    app.use('/buyer', buyerRouter(container.resolve(BuyerController)));


}