import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from './Screens/login/login.component';
import { SignUpComponent } from './Screens/sign-up/sign-up.component';
import { PageNotFoundComponent } from './Screens/page-not-found/page-not-found.component';
import { CommonPlantPestsComponent } from './home/common-plant-pests/common-plant-pests.component';
import { DiseaseAndDisordersComponent } from './home/disease-and-disorders/disease-and-disorders.component';
import { HelpfulTipsComponent } from './home/helpful-tips/helpful-tips.component';
import { UsersComponent } from './home/users/users.component';
import { PlantitasComponent } from './home/plantitas/plantitas.component';
import { ProductsComponent } from './home/products/products.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoginComponent, SignUpComponent, PageNotFoundComponent, CommonPlantPestsComponent, DiseaseAndDisordersComponent, HelpfulTipsComponent, UsersComponent, PlantitasComponent, ProductsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
