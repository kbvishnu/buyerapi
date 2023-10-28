import { Get, Route } from "tsoa";



@Route("ping")
export  class PingController {
  @Get("/")
  public  getPing(): string {
    return "Buyer API is running";
  }
} 

export default  PingController 