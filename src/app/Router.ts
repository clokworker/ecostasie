import { Component,NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Login} from './Log';
import {Main} from './Main'
const Aroute: Routes =[
  {path: 'main', component: Main},
  {path: '', component:Login, children:[]}
];
@Component({
  selector: 'app-root',
  templateUrl: './Frame.html',
  styleUrls: ['./Frame.css']
})
@NgModule({
  declarations:[Login],
  imports:[
    RouterModule.forRoot(Aroute),
    RouterModule,
  ]
})
export class Routing {
  title = 'app works!';
}
