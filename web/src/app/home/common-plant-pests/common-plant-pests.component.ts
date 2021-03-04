import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-plant-pests',
  templateUrl: './common-plant-pests.component.html',
  styleUrls: ['./common-plant-pests.component.scss']
})
export class CommonPlantPestsComponent implements OnInit {

    add:boolean = false

    constructor() { }

    ngOnInit(): void {
        this.retrieve()
    }

    retrieve(){

    }


    save(){

    }

    edit(){
    }

    deleteData(){
        alert('ma delete')
    }

    view(){
    }

   
}
