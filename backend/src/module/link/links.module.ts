import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Links, LinkSchema } from "./model/link.model";
import { LinkService } from "./links.service";
import { LinkController } from "./links.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Links.name, schema:LinkSchema}])
    ],
    providers:[LinkService],
    controllers:[LinkController]
})
export class UserModule{}