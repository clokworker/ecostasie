import { Component,NgModule, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService, DataTableModule,SharedModule} from 'primeng/primeng';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Usr.html',
    styleUrls: ['./Frame.css'],
    providers: [ConfirmationService]
})
export class Users{
    I:MenuItem[]=[];
    Bloods:SelectItem[]=[];G:Message []=[];Emp:any[]=[];
    BloodType:string;Nm:string="";Ap:string="";Am:string="";P:string="";Dp:string="";Dir:string="";Cel:string="";TelA:string="";NSS:string="";RFC:string="";FIn:Date;Br:Date;Cm:boolean= false;Pass:string="";E:boolean;ID:string="";
    Imger:string="";dis:boolean=true;Img:string="1";ena:boolean=true;
    constructor(private H:Http, private R:Router, private C:ConfirmationService){
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
        this.Imger="http://192.168.17.5:4200/nope.png";
        console.log('Hi');
        this.Tabler();
        this.Bloods.push({label: 'O-', value: 'O-'}, {label: 'O+', value:'O+'},{label: 'A+', value:'A+'}, {label: 'A-', value:'A-'}, {label: 'B-', value:'B-'}, {label: 'B+', value:'B+'}, {label: 'AB-', value:'AB-'}, {label: 'AB+', value:'AB+'});
    }
    Tabler(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"UsrLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe();
    }
    onSelect(e){
        if(this.Nm.length>3&&this.Ap.length>3){
            this.Img=this.Nm.slice(0,3)+this.Ap.slice(-3,this.Ap.length);
        } else {
            this.G.push({severity:'warn',summary:'Ingrese el nombre y apellido!', detail:'Se necesita esa informacion!'});
        }
    }
    onUpload(e){
        this.G.push({severity:'success',summary:'Se subio correctamente la imagen', detail:'Sin errores en el servidor'});
        this.Imger=this.Imger.slice(0,-8)+this.Nm.slice(0,3)+this.Ap.slice(-3,this.Ap.length)+".jpg".toLowerCase();
    }
    onError(e){
        this.G.push({severity:'error',summary:'Error en servidor', detail:'Verifica conexion o contacta al administrador'});
    }
    Upper(){
        if(this.Nm.length>3&&this.Ap.length>3){
            this.dis=false;
        }
        if(this.Nm.length>3&&this.Ap.length>3&&this.Am.length>3&&this.P.length>3&&this.Pass.length>5){
            this.ena=false;
        } else {
            this.ena=true;
        }
    }
    notFound(){
        this.Imger="http://192.168.17.5:4200/nope.png";
    }
    EditEmp(E){
        console.log(JSON.stringify(E));
        this.E=true;
        let e=E.Name.split(" ");
        this.Nm=e[0]; this.Ap=e[1]; this.Am=e[2]; this.P=E.Position; this.Dp=E.Dept; this.Dir=E.Dir; this.Cel= E.Cel; this.TelA = E.TelA; this.NSS= E.NSS; this.RFC = E.RFC; this.BloodType = E.Blod; this.ID=E.id;
        this.FIn = new Date(E.Datein); this.Br=new Date(E.Birth); 
        this.Imger=this.Imger.slice(0,-8)+this.Nm.slice(0,3)+this.Ap.slice(-3,this.Ap.length)+".jpg".toLowerCase();
    }
    ElimEmp(E){
        this.C.confirm({
            message: 'Desea Eliminar al empleado?',
            accept: ()=>{
                console.log('sup')
                let H = new Headers();
                H.append('Content-Type', 'application/json');
                this.H.post('/api', JSON.stringify({"UsrDel":1, "ID":E.id}), {headers:H}).map(R=>{
                    console.log(R.json())
                    if(!R.json().DatabseError){
                        if(R.json().affectedRows='1'){
                            this.Tabler();
                            this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'El usuario se elimino satisfactoriamente'});
                        }
                    } else {
                        this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    }
                }).subscribe();
            }
        });
    }
    Registerer(){
        console.log(this.FIn)
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        if(this.E){
            this.H.post('/api', JSON.stringify({"UsrUpd": 1, "User":this.Nm.slice(0,1)+this.Ap, "Pwd":this.Pass, "Name":this.Nm+' '+this.Ap+' '+this.Am, "Position":this.P, "Dept":this.Dp, "Address":this.Dir, "Cel":this.Cel, "TelA":this.TelA, "NSS":this.NSS, "RFC":this.RFC, "Blood":this.BloodType, "FIn":this.FIn, "Bir": this.Br, "Cm":this.Cm, 'Mail':this.Nm.slice(0,1)+this.Ap,"ID":this.ID}), { headers: H }).map(R=>{
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
            this.E=false;
        } else {
            console.log(new Date(this.Br))
            this.H.post('/api', JSON.stringify({"UsrIns": 1, "User":this.Nm.slice(0,1)+this.Ap, "Pwd":this.Pass, "Name":this.Nm+' '+this.Ap+' '+this.Am, "Position":this.P, "Dept":this.Dp, "Address":this.Dir, "Cel":this.Cel, "TelA":this.TelA, "NSS":this.NSS, "RFC":this.RFC, "Blood":this.BloodType, "FIn":new Date(this.FIn).toISOString().substring(0, 10), "Bir": new Date(this.Br).toISOString().substring(0, 10), "Cm":this.Cm, 'Mail':this.Nm.slice(0,1)+this.Ap}),{ headers: H }).map(R=>{
                console.log(R.json())
                if(!R.json().DatabaseError){
                    if(R.json().affectedRows='1'){
                        this.Tabler();
                        this.G.push({severity:'success',summary:'Registro Completado', detail:'El nuevo usuario se agrego a la base de datos satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Regsitro',      detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
    }
    this.Nm=""; this.Ap=""; this.Am=""; this.P=""; this.Dp=""; this.Dir=""; this.Cel= ""; this.TelA = ""; this.NSS=""; this.RFC =""; this.BloodType = ""; this.ID=""; this.Pass=""; this.Br=null; this.FIn= null;
    }
}