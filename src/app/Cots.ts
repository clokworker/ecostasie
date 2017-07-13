import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import {Dict} from './ImgDict';
declare let pdfMake;
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Cots.html',
    styleUrls: ['./Frame.css'],
    providers: [ConfirmationService]
})
export class Cot{
    I:MenuItem[]=[];ID:string;User:string[]=[];N:number;T:string='';E:string='';At:string='';Dir:string='';Tel:string='';Fx:string='';Em:string='';
    B:Array<{Nom:string,ID:number,D:Array<{Cant:number,Unit:string,Desc:string,Prov:string,CInicial:number,Dcto:number,Utilidad:number,Ctot:number,DeliveryC:number,DeliveryT:string,ID:number,Fact:boolean}>}>=[];
    X:Array<{Ro:string,fill:string}>=[];value:boolean=false;selectedValue: string='pesos';Coin:string='';
    Cm:boolean=false;P:any[]=[];PP:any[]=[];P2:any[]=[];Cl:SelectItem[]=[];Cc:SelectItem[]=[];Clnt:any;Cnt:any;Co:boolean=false;
    Majora:number;Minora:number;Field:string;Con=console;BODY:any[];FF:string;Nt:string[]=[];Tc:string[]=[];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r: ActivatedRoute){
        this.B.push({Nom:'',ID:1,D:[{Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:null,DeliveryT:'',ID:1,Fact:false}]});
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
        this.X.push({Ro:'Empresa',fill:''},{Ro:'Atencion',fill:''},{Ro:'Direccion',fill:''},{Ro:'Telefono',fill:''},{Ro:'E-Mail',fill:''},)
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({'ProdLst': 1}), {headers: h}).map(R=>{
            if(R.json()){
                R.json().forEach(I => {
                    this.P.push(I)
                });
            }
        }).subscribe();
        this.H.post('/api', JSON.stringify({'ProLst': 1}), {headers: h}).map(R=>{
            if(R.json()){
                R.json().forEach(I => {
                    this.PP.push(I)
                });
            }
        }).subscribe();
        this.H.post('/api', JSON.stringify({"CliLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Cl.push({label:I.Alias, value:{name:I.Alias,cont:I.Contactos,tel:I.Tel,dir:I.Direccion}})
            });
        }).subscribe();
    }
    ngOnInit(){
        this.r.params.subscribe((P:Params)=>{
            this.ID= P['id'];
            let H = new Headers();
            H.append('Content-Type', 'application/json');
            this.H.post('/api', JSON.stringify({"Maker":this.ID}),{headers:H}).map(R=>{
                console.log(R.json()[0].id)
                this.User.push(R.json()[0].Name);
                this.User.push(R.json()[0].Position);
                this.User.push(R.json()[0].mail);
                //this.N=R.json()[0].id+1000;
            }).subscribe();
        });
         let H = new Headers();
         H.append('Content-Type', 'application/json');
         this.H.post('/api', JSON.stringify({"Cots":this.ID}),{headers:H}).map(R=>{
             this.N= R.json()[0].N+1001;
             console.log(this.N);
         }).subscribe();
        console.log();
    }
    Upper(D, IDM, IDm){
        console.log(this.B[IDM-1].D[IDm].CInicial)
        //console.log(JSON.stringify(this.B[IDM-1].D[IDm].Cant))
        this.B[IDM-1].D[IDm].Ctot = this.B[IDM-1].D[IDm].Cant * (this.B[IDM-1].D[IDm].CInicial*((this.B[IDM-1].D[IDm].Utilidad/100)+1)*(1-(this.B[IDM-1].D[IDm].Dcto/100))+(1*this.B[IDM-1].D[IDm].DeliveryC))
    }
    Nani(N){
        return (!isNaN(N)&&N!='')
    }
    OPer(E:Event, IDM, IDm, OP:OverlayPanel, Arr:any[], F:string, FF:string){
        console.log(IDM);console.log(IDm);
        this.Majora=IDM; this.Minora=IDm;
        this.P2=Arr;
        this.Field=F;
        this.FF=FF;
        OP.show(E)
    }
    Arr(A, V:string, F:string){
        this.P2=A.filter(I => I[F].includes(V))
    }
    One(IDM, IDm, F:string, OP:OverlayPanel, C:string){
        OP.hide();
        this.B[IDM-1].D[IDm][F]=C;
        if(F!='Prov'){
            this.B[IDM-1].D[IDm][F=='Desc' ? 'Unit': 'Desc']=this.P.find(I=>C==I[this.Field])[ F=='Desc' ? 'PartNo': 'ShortD'];
        }
    }
    Sel(){
        this.Cc=[]
        console.log(JSON.stringify(this.Clnt));
        let Cc:string[] = this.Clnt.cont.split('|');
        Cc.forEach((I)=>{
            let c = I.split(' - ');
            this.Cc.push({label:c[0],value:{Atn:c[0],Mail:c[2]}})
        });
        //this.At=this.Clnt.cont.slice(0, this.Clnt.cont.indexOf(' - '));
        this.X[0].fill=this.Clnt.name
        this.X[2].fill = this.Clnt.dir;
        this.X[3].fill=this.Clnt.tel;
        //this.Em=this.Clnt.cont.slice(this.Clnt.cont.lastIndexOf(' - ') +3,-1);
    }
    Set(){
        this.X[1].fill=this.Cnt.Atn;
        this.X[4].fill=this.Cnt.Mail;
    }
    Prodder(ID:number){
        this.B[ID-1].D.push({Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:null,DeliveryT:'',ID:this.B[ID-1].D.length+1,Fact:false});
        console.log(this.X[0].fill)
    }
    Modder(){
        this.B.push({Nom:'',ID:this.B[this.B.length-1].ID+1,D:[{Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:null,DeliveryT:'',ID:1,Fact:false}]});
    }
    Maker(){
        let pdf = pdfMake;
        let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        let D= new Date();
        let body=[]; let S:number=0;let notes=[];let comme=[];
        body.push([
                    {
                        border:[false,false,false,false],
                        colSpan:6,
                        text:' ',
                    },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                ],[
                    {
                        border:[false,false,false,true],
                        colSpan:6,
                        fillColor:'#3464E3',
                        text:this.T,
                        color:'#FFFFFF',
                        alignment:'center'
                    },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                ]);
        this.B.forEach(I=>{
            let s:number=0;
            body.push(
                [
                    {
                        border:[false,false,false,true],
                        colSpan:6,
                        text:' ',
                    },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                ],[
                    {
                        colSpan:6,
                        fillColor:'#66aaff',
                        text:I.Nom,
                        alignment:'center'
                    },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                ],[
                        {
                            text:'Cantidad',
                            alignment:'center'
                        },{
                            text:'Unidad/Parte',
                            alignment:'center'
                        },{
                            text:'Descripcion',
                        },{
                            text:'Precio unitario',
                            alignment:'justify'
                        },{
                            text:'Precio total',
                            alignment:'justify'
                        },{
                            text:'Tiempo de entrega',
                            alignment:'center'
                        }
                    ]
            );
            I.D.forEach(I=>{
                s=s+I.Ctot;
                body.push(
                    [
                        {
                            text:I.Cant,
                            alignment:'center'
                        },{
                            text:I.Unit,
                            alignment:'center'
                        },{
                            text:I.Desc,
                        },{
                            text:'$ '+parseFloat((I.Ctot/I.Cant).toFixed(2)).toLocaleString('en-US'),
                            alignment:'justify'
                        },{
                            text:'$ '+parseFloat(I.Ctot.toFixed(2)).toLocaleString('en-US'),
                            alignment:'justify'
                        },{
                            text:I.DeliveryT,
                            alignment:'center'
                        }
                    ]
                )
            })
            S=S+s;
            body.push(
                [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subotal'
                    },{
                        text:'$ '+parseFloat((s-(s*0.16)).toFixed(2)).toLocaleString('en-US'),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'IVA'
                    },{
                        text:'$ '+parseFloat((s*0.16).toFixed(2)).toLocaleString('en-US'),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:this.Co ? 'Dolares' : 'Pesos',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Total'
                    },{
                        text:'$ '+parseFloat(s.toFixed(2)).toLocaleString('en-US'),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]
            )
        })
        body.push(
            [
                {
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' '
                },{
                    border:[false,false,false,false],
                    text:' '
                },{
                    border:[false,false,false,false],
                    text:' ',
                    alignment:'center'
                }
            ],[
                {
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    text:'Subotal General'
                },{
                    text:'$ '+parseFloat((S-(S*0.16)).toFixed(2)).toLocaleString('en-US'),
                    alignment:'justify'
                },{
                    border:[false,false,false,false],
                    text:' ',
                    alignment:'center'
                }
            ],[
                {
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    text:'IVA'
                },{
                    text:'$ '+parseFloat((S*0.16).toFixed(2)).toLocaleString('en-US'),
                    alignment:'justify'
                },{
                    border:[false,false,false,false],
                    text:this.Co ? 'Dolares' : 'Pesos',
                    alignment:'center'
                }
            ],[
                {
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    border:[false,false,false,false],
                    text:' ',
                },{
                    text:'Gran Total'
                },{
                    text:'$ '+parseFloat(S.toFixed(2)).toLocaleString('en-US'),
                    alignment:'justify'
                },{
                    border:[false,false,false,false],
                    text:' ',
                    alignment:'center'
                }
            ]
        );
        notes.push(
            [
                {
                    border:[undefined],
                    text:'Notas:'
                },{
                    border:[undefined],
                    text:' '
                }
            ]
        );
        this.Nt.forEach(I=>{
            notes.push(
                [
                    {
                        border:[undefined],
                        text:' '
                    },{
                        border:[undefined],
                        text:I
                    }
                ]
            )
        });
        this.Tc.forEach(I=>{
            comme.push({
                text:I,
                fontSize:8
            });
        });
        pdf.createPdf({ content:[
                {
                    columns:[
                        {
                            image: Dict.ELogo,
                            width:210,//Base:83 Mult:8.3
                            margin:[0,25,0,0]
                        },{
                            image: Dict.HPLogo,
                            width:70,//Base: Mult:2
                            margin:[160,25,0,0]
                        }
                    ]
                },{
                    columns:[
                        {
                            table:{
                                widths:['auto',200],
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            text:' ',
                                            fontSize : 7
                                        },{
                                            border:[false,false,false,true],
                                            text:' ',
                                            fontSize : 7
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,true],
                                            text:' ',
                                            fontSize : 7
                                        },{
                                            border:[false,false,false,true],
                                            text:' ',
                                            fontSize : 7
                                        }
                                    ],[
                                        {
                                            text:'Empresa:',
                                            border:[true,true,true,false],
                                            fontSize : 7
                                        },{
                                            border:[true,true,true,true],
                                            text:this.X[0].fill,
                                            fontSize : 7,
                                            bold:true
                                        }
                                    ],[
                                        {
                                            text:'Atencion:',
                                            border:[true,false,true,false],
                                            fontSize : 7
                                        },{
                                            border:[true,false,true,false],
                                            text:this.X[1].fill,
                                            fontSize : 7,
                                            color:'#1481ff'
                                        }
                                    ],[
                                        {
                                            border:[true,false,true,false],
                                            text:'Dirección',
                                            fontSize : 7
                                        },{
                                            border:[true,false,true,false],
                                            text:this.X[2].fill,
                                            fontSize : 7
                                        }
                                    ],[
                                        {
                                            border:[true,false,true,false],
                                            text:'Telefono:',
                                            fontSize : 7
                                        },{
                                            border:[true,false,true,false],
                                            text:'',
                                            fontSize : 7
                                        }
                                    ],[
                                        {
                                            border:[true,false,true,true],
                                            text:'e-mail:',
                                            fontSize : 7
                                        },{
                                            border:[true,false,true,true],
                                            text:this.X[4].fill,
                                            fontSize : 7,
                                            color:'#1481ff'
                                        }
                                    ]
                                ]
                            }
                        },{
                            style: 'tableExample',
                            table:{
                                widths:['auto','auto'],
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            text:'Cotizacion:'
                                        },{
                                            border:[false,false,false,true],
                                            text:'COT-'+this.N,
                                            alignment:'center',
                                            color:'#c40000',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,true],
                                            text:' '
                                        }, {
                                            border:[false,false,false,true],
                                            text:' '
                                        }
                                    ],[
                                        {
                                            border:[true,true,false,true],
                                            text:'Fecha de Expedicion:'
                                        },{
                                            border:[false,true,true,true],
                                            text:D.getDate()+'-'+M[D.getMonth()]+'-'+D.getFullYear().toString().slice(-2),
                                            color:'#1481ff',
                                            alignment:'right',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[true,true,false,true],
                                            text:'Cotizacion vigente hasta:'
                                        },{
                                            border:[false,true,true,true],
                                            text: new Date(D.getFullYear(), D.getMonth()+1, 0).getDate()+'-'+M[D.getMonth()]+'-'+D.getFullYear().toString().slice(-2),
                                            color:'#1481ff',
                                            alignment:'right',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[true,true,true,false],
                                            text:'Ejecutivo'
                                        },{
                                            border:[true,true,true,false],
                                            text:this.User[0] //dd
                                        }
                                    ],[
                                        {
                                            border:[true,false,true,false],
                                            text:'email'
                                        },{
                                            border:[true,false,true,false],
                                            text:this.User[2],
                                            alignment:'right',
                                            color:'#1481ff'
                                        }
                                    ],[
                                        {
                                            border:[true,false,true,true],
                                            text:'Puesto'
                                        },{
                                            border:[true,false,true,true],
                                            text:this.User[1]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                },{
                    style:{
                        fontSize:9
                    },
                    table:{
                        widths:['auto','auto','*','auto','auto','auto'],
                        body:body
                    }
                },{
                    style:{
                        fontSize:7
                    },
                    table:{
                        widths:[22,'auto'],
                        body:notes,
                        layout:{
                            defaultBorder: false,
                        }
                    }
                },{
                    text:' '
                },{
                    text:' '
                },{
                    text:' '
                },{
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[200],
                        body:[
                            [
                                {
                                    fillColor:'#010577',
                                    text:'Terminos Comerciales:',
                                    color:'#FFFFFF'
                                }
                            ]
                        ]
                    }
                },comme,{
                    text:' '
                },{
                    text:' '
                },{
                    text:this.User[0],
                    fontSize:9,
                    color:'#080eaa'
                },{
                    text:this.User[1],
                    fontSize:9,
                    color:'#080eaa'
                }
            ],styles:{
                tableExample:{
			        margin: [95, 0, 0, 0],
                    fontSize:7
		        }
            }
        }).open();
        let H = new Headers();
         H.append('Content-Type', 'application/json');
         this.H.post('/api', JSON.stringify({"CotsUp":1, 'Nom':this.T,'Emp':this.Clnt, 'Contact':this.Cnt, 'Coin':this.Co, 'Dateg':D.getDate(), 'ChangeTy':this.Coin, 'Cont':this.B}),{headers:H}).map(R=>{
             //this.N= R.json()[0].N+1001;
             //console.log(this.N);
         }).subscribe();
    }
}
