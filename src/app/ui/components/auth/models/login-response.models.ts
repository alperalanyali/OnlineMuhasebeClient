import { CompanyModel } from "./company.model";
import { TokenModel } from "./token.model";
export class LoginResponseModel{
    token:TokenModel;        
    email:string = "";
    userId:string = "";
    fullName:string = "";
    companies:CompanyModel[]=[];
    company:CompanyModel;
    year:number =0
}