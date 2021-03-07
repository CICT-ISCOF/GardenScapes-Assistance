import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr'
import firebase from 'firebase'
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-common-plant-pests',
  templateUrl: './common-plant-pests.component.html',
  styleUrls: ['./common-plant-pests.component.scss']
})
export class CommonPlantPestsComponent implements OnInit {

    add:boolean = false

    constructor(
        private firestore : AngularFirestore,
        private ToastrService : ToastrService
    ) { 
        this.reader.onload = (event) => {
			this.src = String(event.target.result);
		};
    }

    ngOnInit(): void {
        this.retrieve()
    }

    storage = firebase.storage()

    pest:any = {
        images:[],
        title:'',
        description:''
    }

    src:any = "../../../assets//placeholders//green.png"

    pestInformation = {}

    pests = []
    petsId = []

    trigger(){
        document.getElementById('file-input').click()
    }
    reader = new FileReader()
    readURL(e: Event){
        this.pest.images = []
		const target = e.target as HTMLInputElement;
		if (target.files.length > 0) {
			this.reader.readAsDataURL(target.files[0]);
			this.pest.images.push(target.files[0]);
            this.src = target.files[0]
		}
    }

    retrieve(){
        this.pests = []
        this.petsId = []
        this.firestore.collection('pests').get().subscribe((pests) => {
            pests.forEach((pest) => {
                this.pests.push(pest.data())
                this.petsId.push(pest.id)
            })
        })
    }


    async save(){
        if(this.pest.images.length == 0){
           this.ToastrService.error(`Pest Images could not be empty`)
           return
        }
        if(this.pest.title == "" || this.pest.description == ""){
            this.ToastrService.error(`All Fields should  not be empty`)
            return
        }
        const file = await this.storage.ref(this.pest.images[0].name).put(this.pest.images[0]);
        const photo_url = await file.ref.getDownloadURL();
        this.pest.images[0] = photo_url
        this.firestore.collection('pests').add(this.pest)
        this.ToastrService.success(`${this.pest.title} has been saved`)
        this.retrieve()
    }

    update(pest,id){
        this.firestore.collection('pests').doc(id).update(pest)
        this.ToastrService.success(`${pest.title} has been updated`)
        this.retrieve()
    }

    clear(){
        this.pest ={
            images:[],
            title:'',
            description:''
        }
        this.retrieve()
    }

    deleteData(id){
        this.firestore.collection('pests').doc(id).delete()
        this.retrieve()
        this.ToastrService.info(`Pest has been deleted`)

    }

    view(pest){
        this.pestInformation = pest
    }

   
}
