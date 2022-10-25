import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GraphicalDispositionComponent} from "./graphical-disposition/graphical-disposition.component";

const routes: Routes = [

  {path: 'graphicaldisposition',component:GraphicalDispositionComponent}

];
@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{}
