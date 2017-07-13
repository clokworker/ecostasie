import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Cat.html',
    styleUrls: ['./Frame.css'],
    providers: [ConfirmationService]
})
export class Cats{
    G:Message []=[];I:MenuItem[]=[];Dis:boolean=false;
    Cats:any[]=[];F:string;E:string;Ori:any[]=[]; exists:boolean=true;ID:string;
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
                        this.R.navigate(['Cots']);
                    }
                }
            ]}
        ];
        this.Categorizer();
    }
    Categorizer(){
        this.F='';
        this.Ori=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Ori.push(I);
            });
        }).subscribe();
        this.Cats=this.Ori;
    }
    Adder(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatIns":1, "Name":this.F}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La categoria se agrego satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe();
    }
    Substracter(id:string){
        console.log(id)
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api',JSON.stringify({"CatDel":1, "ID":id}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'La categoria se elimino satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        });
    }
    Editer(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api',JSON.stringify({"CatUpd":1, "Name":this.E, "ID":this.ID}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La Categoria se modifico satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe()
        this.Dis=false;
    }
    Shower(id:string,Nm:string){
        this.Dis=true;
        this.E=Nm;
        this.ID=id;
    }
    Filter(){
        this.Cats = this.Ori.filter(I => I.Name.includes(this.F));
        this.exists = this.Cats.length > 0 ? true : false;
    }
}