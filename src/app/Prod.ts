import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Prod.html',
    styleUrls: ['./Frame.css'],
    providers: [ConfirmationService]
})
export class Prods{
    G:Message []=[];I:MenuItem[]=[];
    Cat:SelectItem[]=[];Prod:any[]=[];Pop:boolean=false;Cate:string='';Pno:string='';DesC:string='';DesL:string='';ena=true;Ed:boolean=false;ID:string;
    constructor(private H:Http, private R:Router, private c:ConfirmationService){
        this.I = [{
            label: 'Administracion',
            items: [{
                        label: 'Usuarios', 
                        icon: 'fa-users',
                        command:()=>{
                            this.R.navigate(['Usr',1]);
                        }
                    },{
                        label: 'Proveedores',
                        icon:'fa-product-hunt',
                        command:()=>{
                            this.R.navigate(['Prov',1])
                        }
                    },{
                        label: 'Clientes',
                        icon:'fa-male',
                        command:()=>{
                            this.R.navigate(['Clt',1]);
                        }
                    },{
                        label: 'Categorias',
                        icon:'fa-linode',
                        command:()=>{
                            this.R.navigate(['Cat',1]);
                        }
                    },{
                        label: 'Productos',
                        icon:'fa-shopping-basket',
                        command:()=>{
                            this.R.navigate(['Prod',1]);
                        }
                    }
            ]},{
            label: 'Produccion',
            icon: 'fa-edit',
            items: [{
                    label: 'Cotizacion',
                    icon: ' fa-newspaper-o',
                    command:()=>{
                        this.R.navigate(['Cots',1]);
                    }
                }
            ]}
        ];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Cat.push({label:I.Name, value:I.Name});
            });
        }).subscribe();
        this.Producer();
    }
    DelProd(ID){
        this.c.confirm({
            message: 'Desea eliminar este producto?',
            accept: ()=>{
                console.log('sup')
                let H = new Headers();
                H.append('Content-Type', 'application/json');
                this.H.post('/api', JSON.stringify({"ProdDel":1, "ID":ID}), {headers:H}).map(R=>{
                    console.log(R.json())
                    if(!R.json().DatabseError){
                        if(R.json().affectedRows='1'){
                            this.Producer();
                            this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'El provedor se elimino satisfactoriamente'});
                        }
                    } else {
                        this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    }
                }).subscribe();
            }
        })
    }
    Edit(P){
        this.Pno=P.PartNo;this.DesC=P.ShortD;this.DesL=P.LongD;this.Cate=P.Cat;this.ID=P.id;this.Ed=true;
        console.log(P.id)
    }
    Producer(){
        this.Prod=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ProdLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Prod.push(I)
            });
        }).subscribe();
    }
    Cats(){
        this.Pop=true;
    }
    Adder(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        if(this.Ed){
            this.H.post('/api', JSON.stringify({"ProdUpd":1,"Part":this.Pno,"Short":this.DesC, "Long":this.DesL, "Cat":this.Cate, "ID":this.ID}),{headers:h}).map(R=>{
                if(!R.json().DatabseError){
                    if(R.json().affectedRows='1'){
                        this.Producer();
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El Producto se Modifico satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
        } else {
            this.H.post('/api', JSON.stringify({"ProdIns":1,"Part":this.Pno,"Short":this.DesC, "Long":this.DesL, "Cat":this.Cate}),{headers:h}).map(R=>{
                if(!R.json().DatabseError){
                    if(R.json().affectedRows='1'){
                        this.Producer();
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El Producto se agrego satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
        }
        this.Ed=false; this.Pno='';this.DesC='';this.DesL='';this.Cate='';
    }
    Upper(){
        if(this.Pno.length>3&&this.DesC.length>1&&this.DesL.length>1&&this.Cate.length>1){
            this.ena=false;
        } else {
            this.ena=true;
        }
    }
}