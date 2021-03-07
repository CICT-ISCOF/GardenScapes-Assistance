import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase'
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr'

@Component({
selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private router : Router,
        private ToastrService : ToastrService
    ) { }

    email =""
    password =""

    ngOnInit(): void {
        firebase.initializeApp(environment.firebase)
    }

    login(){
        console.log(this.email)
        console.log(this.password)

        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
            var user = userCredential.user;
            if(user.displayName != null){
                this.ToastrService.error(`Unable to Login as an administrator`)
                return
            }
            this.router.navigate(['/home/dashboard'])
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.ToastrService.error(errorCode)
            this.ToastrService.error(errorMessage)

        });

    }

}
