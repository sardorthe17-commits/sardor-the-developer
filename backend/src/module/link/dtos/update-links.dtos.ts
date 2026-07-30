import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateLinkDtos {
    @IsString()
    @MaxLength(4)
    link_url?:string
    
    @IsString()
    @MaxLength(3)
    site_name?:string

    @MinLength(5)
    @IsString()
    info?:string
} 