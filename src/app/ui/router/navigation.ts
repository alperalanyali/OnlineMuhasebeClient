export class Navigation
{
    routerLink:string ="";
    name:string ="";
    icon:string="";
}


export const Navigations : Navigation[]=[
    
    {
        routerLink : "/",
        name : "Ana Sayfa",
        icon:"fa fa-home "
    },
    {
        routerLink : "/ucafs",
        name : "Hesap Planı",
        icon:"fa fa-book"

        //<i class="fa-regular fa-square-list"></i>
    },
    {
        routerLink : "/navigationItems",
        name:"Menüler",
        icon:"fa fa-ellipsis-vertical"
        
    }    
]