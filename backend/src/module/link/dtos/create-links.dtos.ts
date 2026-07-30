import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class LinksCreateDtos{
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    link_url:string
    
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    site_name:string

    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    info:string
}