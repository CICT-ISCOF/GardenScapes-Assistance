import { Component, OnInit } from '@angular/core';
import firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plantitas',
  templateUrl: './plantitas.component.html',
  styleUrls: ['./plantitas.component.scss']
})
export class PlantitasComponent implements OnInit {

    constructor (
        private firestore: AngularFirestore,
        private ToastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.retrieve()
    }
    plantitas = []
    
    plantita = {}
    
    showGuide =false
    showVariety =false
    retrieve() {
        this.firestore.collection( 'plantitas' ).valueChanges().subscribe( data => {
            this.plantitas = data
        })
    }
    

    view( plantita ) {
        this.plantita = plantita
    }
}
