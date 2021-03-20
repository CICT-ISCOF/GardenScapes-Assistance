import { Component, OnInit } from '@angular/core';
import firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    constructor (
        private firestore: AngularFirestore,
        private ToastrService: ToastrService
    ) { }

    
    ngOnInit(): void {
        this.retrieve()
    }
    
    products = []

    product = {}

    showGuide = false
    showVariety = false
    ShowLayoutIdea = false

    
    retrieve() {
        this.firestore.collection( 'product' ).valueChanges().subscribe( data => {
            this.products = data
        } )
    }

    view( product ) {
        this.product = product
    }
}
