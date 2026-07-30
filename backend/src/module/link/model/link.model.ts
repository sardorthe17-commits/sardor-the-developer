import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({collection:'links', timestamps:true, versionKey:false})
export class Links{
    @Prop({type:SchemaTypes.String})
    link_url:string
    
    @Prop({type:SchemaTypes.String})
    info:string

    @Prop({type:SchemaTypes.String})
    site_name:string
}

export const LinkSchema = SchemaFactory.createForClass(Links)