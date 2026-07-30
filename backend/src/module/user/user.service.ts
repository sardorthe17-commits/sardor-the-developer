import { adminLogin, adminParol } from "../../common/configs/admin.config"

export class isAdminService{
    async detacting(payload:any){
        const {parol, login} = payload

        if(parol !== adminParol()) return {success:false, message:`Parol notog\'ri`}
        if(login !== adminLogin()) return {success:false, message:`Login notog\'ri`}
        if(!parol || !login) return {success:false}
        return {
            success:true,
        }
    }
}