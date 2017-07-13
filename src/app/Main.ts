import { Component,NgModule } from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import { Router, Params, ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './Main.html',
    styleUrls: ['./Frame.css']
})
export class Main{
    I:MenuItem[]=[];ID:string;
    constructor(private R:Router, private r:ActivatedRoute){
        this.I = [{
            label: 'Administracion',
            items: [{
                        label: 'Usuarios', 
                        icon: 'fa-users',
                        command:()=>{
                            this.R.navigate(['Usr',this.ID]);
                        }
                    },{
                        label: 'Proveedores',
                        icon:'fa-product-hunt',
                        command:()=>{
                            this.R.navigate(['Prov',this.ID])
                        }
                    },{
                        label: 'Clientes',
                        icon:'fa-male',
                        command:()=>{
                            this.R.navigate(['Clt',this.ID]);
                        }
                    },{
                        label: 'Categorias',
                        icon:'fa-linode',
                        command:()=>{
                            this.R.navigate(['Cat',this.ID]);
                        }
                    },{
                        label: 'Productos',
                        icon:'fa-shopping-basket',
                        command:()=>{
                            this.R.navigate(['Prod',this.ID]);
                        }
                    }
            ]},{
            label: 'Produccion',
            icon: 'fa-edit',
            items: [{
                    label: 'Cotizacion',
                    icon: ' fa-newspaper-o',
                    command:()=>{
                        this.R.navigate(['Cots',this.ID]);
                    }
                }
            ]}
        ];
    }
    ngOnInit() {
        this.r.params.subscribe((P:Params)=>{
            this.ID= P['id']
        })
        console.log(this.ID)
    }
}