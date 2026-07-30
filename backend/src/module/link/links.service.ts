import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Links } from "./model/link.model";
import { Model } from "mongoose";
import { LinksCreateDtos } from "./dtos/create-links.dtos";
import { UpdateLinkDtos } from "./dtos/update-links.dtos";

@Injectable()
export class LinkService{
    constructor(
        @InjectModel(Links.name) private readonly model:Model<Links>
    ){}

    async create(dtos:LinksCreateDtos){
        const link = await this.model.findOne({site_name:dtos.site_name})

        if(link) return {seccuss:false, message:`${dtos.site_name} nomli site bor!`}

        await this.model.create({
            link_url:dtos.link_url,
            site_name:dtos.site_name,
            info:dtos.info
        });

        return {
            seccuss:true,
            message:`Loyxa qo'shildi!`
        }
    }
    async getAll(){
        const date = await this.model.find()
        return {seccuss:true, data:date}
    }
    async update(id:string, dtos:UpdateLinkDtos){
        const link = await this.model.findById(id)

        if(!link) return {seccuss:false, message:`Topilmadi!`}

        await this.model.findByIdAndUpdate(id,{
            site_name:dtos.site_name ?? link.site_name,
            link_url:dtos.link_url ?? link.link_url,
            info:dtos.info ?? link.info,
        })

        return {
            seccuss:true,
            message:`Loyxa Yangilandi!`
        }
    }
    async delete(id:string){
        const link = await this.model.findByIdAndDelete(id)
        if(!link) return {seccuss:false, message:`Topilmadi!`}
        return{
            seccess:true,
            message:`Loyha Tozalandi!`
        }
    }

}