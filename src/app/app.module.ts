import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {ButtonModule, GrowlModule, FileUploadModule, FieldsetModule, ToggleButtonModule, InputMaskModule, InputTextModule, SelectButtonModule, CalendarModule, ToolbarModule, DataGridModule, MenubarModule, PanelModule, ConfirmDialogModule, DataTableModule, DropdownModule, CheckboxModule, DataListModule, DialogModule, InputTextareaModule, ListboxModule, OverlayPanelModule, RadioButtonModule, ChipsModule} from 'primeng/primeng';
import {Login} from './Log';
import {Main} from './Main';
import {Users} from './Usr';
import {Provs} from './Prov';
import {Prods} from './Prod';
import {Cats} from './Cat';
import {Client} from './Clnt';
import {Cot} from './Cots';
import {Explorer} from './Exp';
const Aroute: Routes =[
  {path: '', component:Login},
  {path: 'main/:id', component: Main},
  {path: 'Usr/:id', component:Users},
  {path: 'Prov/:id', component:Provs},
  {path: 'Prod/:id', component:Prods},
  {path: 'Cat/:id', component:Cats},
  {path: 'Clt/:id', component:Client},
  {path: 'Cots/:id', component:Explorer},
  {path: 'Gen/:id', component:Cot},
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: Main }
];
@NgModule({
  declarations: [
    Login, Main, Users, Provs, Prods, Cats, Client, Cot, Explorer
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ButtonModule, GrowlModule, FileUploadModule, FieldsetModule, ToggleButtonModule, InputMaskModule, InputTextModule, SelectButtonModule, CalendarModule, PanelModule, ToolbarModule, DataGridModule, MenubarModule, ConfirmDialogModule, DataTableModule, DropdownModule, CheckboxModule, DataListModule, DialogModule, InputTextareaModule, ListboxModule, OverlayPanelModule, RadioButtonModule, ChipsModule, 
    RouterModule.forRoot(Aroute)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
