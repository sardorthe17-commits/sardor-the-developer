import { Module } from "@nestjs/common";
import { isAdminController } from "./user.controller";
import { isAdminService } from "./user.service";

@Module({
    providers:[isAdminService],
    controllers:[isAdminController]
})
export class LinkModule{}