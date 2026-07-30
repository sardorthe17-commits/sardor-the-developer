import { adminLogin, adminParol } from "../../common/configs/admin.config"
import { Injectable } from "@nestjs/common";
import { adminLogin, adminParol } from "../../common/configs/admin.config"

@Injectable()
export class isAdminService{
    async detacting(payload:any){
        const {parol, login} = payload
        console.log(parol, login);
        if(parol != adminParol()) return {success:false, message:`Parol notog\\'ri`}
        if(login != adminLogin()) return {success:false, message:`Login notog\\'ri`}
        if(!parol || !login) return {success:false}
        return {
            success:true,
        }
    }
}