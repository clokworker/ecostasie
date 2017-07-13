import { Component,NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Message} from 'primeng/primeng';
@Component({
    selector: 'app-root',
    templateUrl: './log.html',
    styleUrls: [
        './Frame.css'
        ],
    providers: []
})
export class Login{
    title:string;Usr:string;Pwd:string;I: Message []=[];
    constructor(private H:Http, private R:Router){
        console.log('Hi');
    }
    Getter(){
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"id": this.Usr}), { headers: H }).map(R=>{
            let A = R.json();
            //console.log(R.json())
            if(!R.json().DatabseError){
                if (!R.json().Fucktard){
                    if (R.json().Usr === this.Usr && R.json().Pswd === this.Pwd){
                        this.R.navigate(['main',R.json().id]);
                    } else {
                        console.log('oop')
                        this.I.push({severity:'info',summary:'Error de credenciales', detail:'Usuario y/o contraseña incorrectos'});
                    }
                } else {
                    this.I.push({severity:'info',summary:'Error de credenciales', detail:'Usuario y/o contraseña incorrectos'});
                }
            } else {
                this.I.push({severity:'error',summary:'Error Interno', detail: R.json().DatabseError});
            }
        }).subscribe();
    }
}