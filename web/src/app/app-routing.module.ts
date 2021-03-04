import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


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

const routes: Routes = [
	{
		path: "",
		component:LoginComponent
	},
	{
		path: "sign-up",
		component:SignUpComponent
	},
    {
		path: "home",
		component:AdminLayoutComponent,
        children: [
            {
                path: "dashboard",
                loadChildren:
                "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
            },
            {
                path: "common-plant-pests",
                component:CommonPlantPestsComponent
            },
            {
                path: "plant-disease-and-disorders",
                component:DiseaseAndDisordersComponent
            },
            {
                path: "helpful-tips",
                component:HelpfulTipsComponent
            },
            {
                path: "users",
                component:UsersComponent
            },
            {
                path: "plantitas",
                component:PlantitasComponent
            },
            {
                path: "products",
                component:ProductsComponent
            },
        ] 
	},
	{
		path: "",
		component: AdminLayoutComponent,
		children: [
		{
			path: "",
			loadChildren:
			"./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
		}
		]
	}, {
		path: '',
		component: AuthLayoutComponent,
		children: [
		{
			path: '',
			loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
		}
		]
	},
	// {
	// 	path: "**",
	// 	redirectTo: "404",
	// 	component:PageNotFoundComponent
	// }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
