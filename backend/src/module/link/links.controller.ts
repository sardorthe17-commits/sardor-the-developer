import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LinkService } from "./links.service";
import { LinksCreateDtos } from "./dtos/create-links.dtos";
import { UpdateLinkDtos } from "./dtos/update-links.dtos";

@Controller('login')
export class LinkController{
    constructor(
        private readonly servic:LinkService
    ){}

    @Post()
    async create(@Body() dtos:LinksCreateDtos){
        return await this.servic.create(dtos)
    }
    @Get()
    async getAll(){
        return await this.servic.getAll()
    }

    @Put(':id')
    async update(@Body() dtos:UpdateLinkDtos, @Param('id') id:string){
        return await this.servic.update(id,dtos)
    } 

    @Delete(':id')
    async delete(@Param('id') id:string){
        await this.servic.delete(id)
    }
}