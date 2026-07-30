import { Body, Controller, Post } from "@nestjs/common";
import { isAdminService } from "./user.service";

@Controller('login')
export class isAdminController{
    constructor(
        private readonly service:isAdminService
    ){}
    @Post()
    async isAdmin(@Body() payload:any){
        return await this.service.detacting(payload)
    }
}