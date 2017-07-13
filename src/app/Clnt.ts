import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import * as FileSaver from 'file-saver'; 
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Clnt.html',
    styleUrls: ['./Frame.css'],
    providers: [ConfirmationService]
})
export class Client{
    I:MenuItem[]=[];Pro:any[]=[];States:SelectItem[]=[];Cont:string[]=[];G:Message []=[];B:Array<{ID:number, Tel:Array<{ID:number,Tel:string}>, Mail:Array<{ID:number,Mail:string}>}>=[];Cels:Array<{ID:number,Cel:string[]}>=[];Mails:string[]=[];
    Nm:string='';Dir:string='';r:string='';C:string='';Estado:string='';ID:string;CP:string='';RFC:string='';ena:boolean=true;Conts:string; Edit:boolean=false; T:string;
    constructor(private H:Http, private R:Router, private c:ConfirmationService){}
    ngOnInit(){
        this.B.push({ID:this.B.length, Tel:[{ID:0,Tel:''}], Mail:[{ID:0,Mail:''}]});
        //console.log(this.B[0].Tel[0].Tel)
        this.Cont.push('');
        this.Mails.push('');
        this.Cels.push({ID:this.Cels.length, Cel:['']});
        this.States.push({label:'Aguascalientes', value:'Aguascalientes'}, {label:'Baja California', value:'Baja California'}, {label:'Baja California Sur', value: 'Baja California Sur'}, {label:'Campeche', value:'Campeche'}, {label:'Chiapas', value:'Chiapas'}, {label:'Chihuahua', value:'Chihuahua'}, {label:'CDMX', value:'CDMX'}, {label:'Coahuila', value:'Coahuila'}, {label:'Colima', value:'Colima'}, {label:'Durango', value:'Durango'}, {label:'Estado de Mexico', value:'Estado de Mexico'}, {label:'Guanajuato', value:'Guanajuato'}, {label: 'Guerrero', value:'Guerrero'}, {label:'Hidalgo', value:'Hidalgo'}, {label:'Jalisco', value:'Jalisco'}, {label:'Michoacan', value:'Michoacan'}, {label:'Morelos', value:'Morelos'}, {label:'Nayarit', value:'Nayarit'}, {label:'Nuevo Leon', value:'Nuevo Leon'}, {label:'Oaxaca', value:'Oaxaca'}, {label:'Puebla', value:'Puebla'}, {label:'Queretaro', value:'Queretaro'}, {label: 'Quintana Roo', value:'Quintana Roo'}, {label:'San Luis Potosi', value:'San Luis Potosi'}, {label:'Sinaloa', value:'Sinaloa'}, {label:'Sonora', value:'Sonora'}, {label:'Tabasco', value:'Tabasco'}, {label:'Tamaulipas', value:'Tamaulipas'}, {label:'Tlaxcala', value:'Tlaxcala'}, {label:'Veracruz', value:'Veracruz'}, {label:'Yucatan', value:'Yucatan'}, {label:'Zacatecas', value:'Zacatecas'});
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
        this.Tabler();
    }
    Tabler(){
        this.Pro=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CliLst":1}),{headers:h}).map(R=>{
            //console.log(R);
            R.json().forEach(I => {
                //console.log(I.Contactos);
                if (I.Contactos==null){console.log('popo')}
                I.Contactos = I.Contactos == null ? '' : I.Contactos.replace('|','|').slice(0,-1);
                this.Pro.push(I);
                //console.log(I.Contactos);
            });
        }).subscribe();
    }
    Registerer(){
        this.Conts='';
        this.B.forEach((I, N)=>{
            let b:string ='';
            let a:string='';
            I.Tel.forEach((i)=>{
                b = b+ i.Tel + '_';
            });
            I.Mail.forEach((i)=>{
                a = a+i.Mail + '_';
            })
             console.log(b)
            this.Conts = this.Conts + this.Cont[I.ID]+' - '+ b.slice(0,-1) + ' - ' +a.slice(0,-1) + ' - ' + this.Mails[I.ID]+'|';
        });
        console.log(this.Conts);
        this.Conts=this.Conts.slice(0,-3);
        console.log(this.Conts)
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        if(this.Edit){
            this.H.post('/api', JSON.stringify({"CliUpd":1, "Alias":this.Nm, "Razon":this.r, "Direccion":this.Dir, "Ciudad":this.C, "Estado":this.Estado, "RFC":this.RFC, "CP":this.CP, "Contactos":this.Conts, 'Telefono':this.T, "ID":this.ID}),{headers:H}).map(R=>{
                console.log(R.json())
                if(!R.json().DatabseError){
                    if(R.json().affectedRows='1'){
                        this.Tabler();
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El usuario se modifico satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
        }else{
            console.log(this.Conts);
            this.H.post('/api', JSON.stringify({"CliIns":1, "Alias":this.Nm, "Razon":this.r, "Direccion":this.Dir, "Ciudad":this.C, "Estado":this.Estado, "RFC":this.RFC, "CP":this.CP, "Contactos":this.Conts,'Telefono':this.T}),{headers:H}).map(R=>{
                console.log(R.json())
                if(!R.json().DatabseError){
                    if(R.json().affectedRows='1'){
                        this.Tabler();
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El usuario se modifico satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
        }//*/
        this.Dir="";this.Nm="";this.C="";this.Estado="";this.RFC="";this.CP="";this.r='';
        this.B=[];
        this.Cont=[];
        this.Mails=[];
        this.Cels=[];
        this.B.push({ID:this.B.length, Tel:[{ID:0,Tel:''}], Mail:[{ID:0,Mail:''}]});
        this.Cont.push('');
        this.Mails.push('');
        this.Cels.push({ID:this.Cels.length, Cel:['']});
        this.Tabler();
    }
    Upper(){
        if(this.Cont.length>0&&this.Nm.length>1&&this.Dir.length>15&&this.r.length>10&&this.C.length>3&&this.CP.length>4&&this.RFC.length>0&&this.Estado.length>0){
            this.ena=false;
        }
    }
    EditPro(P){
        this.Nm=P.Alias; this.r=P.Razon; this.C=P.Ciudad; this.Dir=P.Direccion;
        this.Estado=P.Estado;this.CP=P.CP;this.RFC=P.RFC; let Cont= P.Contactos==null ? [''] : P.Contactos.split('|'); this.ID=P.id;
        console.log(Cont)
        this.Edit=true;
        this.B=[];
        this.Cont=[];
        Cont.forEach((I,N)=>{
            this.B.push({ID:this.B.length, Tel:[], Mail:[]});
            let x = I.split(' - ');
            console.log(x[0])
            console.log(x[1])
            console.log(x[2])
            this.Cont.push(x[0]);
            if(x[1]){
                let b = x[1].split('_');
                b.forEach((i,n)=>{
                    this.B[N].Tel.push({ID:n,Tel:i})
                })
            }
            if(x[2]){
                let b = x[2].split('_');
                b.forEach((i,n)=>{
                    this.B[N].Mail.push({ID:n,Mail:i})
                })
            }
        });
    }
    ElimPro(P){
        console.log('v')
        this.c.confirm({
            message: 'Desea Eliminar al Cliente?',
            accept: ()=>{
                console.log('sup')
                let H = new Headers();
                H.append('Content-Type', 'application/json');
                this.H.post('/api', JSON.stringify({"CliDel":1, "ID":P.id}), {headers:H}).map(R=>{
                    console.log(R.json())
                    if(!R.json().DatabseError){
                        if(R.json().affectedRows='1'){
                            this.Tabler();
                            this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'El cliente se elimino satisfactoriamente'});
                        }
                    } else {
                        this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    }
                }).subscribe();
            }
        });
    }
    AddC(){
        this.B.push({ID:this.B.length, Tel:[{ID:this.B[this.B.length-1].Tel.length,Tel:''}], Mail:[{ID:this.B[this.B.length-1].Mail.length, Mail:''}]});
        this.Cont.push('');
        this.Mails.push('');
        this.Cels.push({ID:this.Cels.length, Cel:['']});
    }
    AddT(I){
        this.B[I].Tel.push({ID:this.B[I].Tel.length,Tel:''})
    }
    AddM(I){
        this.B[I].Mail.push({ID:this.B[I].Mail.length,Mail:''})
    }
    export(){
        let a:string[]=[];
        this.Pro.forEach((I)=>{
            console.log(JSON.stringify(I));
            a=a.concat(JSON.stringify(I).split(','));
            a[a.length-1]='}'
        });
        a[7].split(' - ')
        a.forEach((I,i)=>{
            a[i]=I.slice(I.indexOf(':')+1, I.length).replace(/[\"']+/g,'');
        });
        a=['Alias,Razon,Direccion,Ciudad,Estado,RFC,CP,Contactos,\n'+a.join(',').replace('},','\n').replace(/[\{\}']+/g,'')]
        console.log(a)
        FileSaver.saveAs(new File(a, 'Try.csv', {type:'data:text/csv;charset=utf-8,'}))
        console.log('s')
    }
}