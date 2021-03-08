import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    constructor(
        private firestore : AngularFirestore,

    ) { }

    ngOnInit(): void {    
        this.getUsers()
    }

    users = []
    userInfo = {}

    getUsers(){
        this.users = []
        this.firestore.collection('users').get().subscribe((users) => {
            users.forEach((user) =>{
                this.users.push(user.data())
            })
        })
    }

    setStatus(user){
        this.firestore.collection('users', ref => ref
           .where('email','==',user.email)
        ).get().subscribe((users) => {
            users.forEach((user) =>{
                let blocked = user.data()['blocked'] == true ? false : true
                this.firestore.collection('users').doc(user.id).update({
                    blocked:blocked
                })
            })
        })
        this.getUsers()
    }

    deleteUser(){

    }

    view(user){
        this.userInfo = user
    }

}
