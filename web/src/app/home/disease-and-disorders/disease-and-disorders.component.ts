import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr'
import firebase from 'firebase'

@Component({
  selector: 'app-disease-and-disorders',
  templateUrl: './disease-and-disorders.component.html',
  styleUrls: ['./disease-and-disorders.component.scss']
})
export class DiseaseAndDisordersComponent implements OnInit {

    constructor(
        private firestore : AngularFirestore,
        private ToastrService : ToastrService
    ) { 
      
    }

    ngOnInit(): void {
        this.retrieve()
    }

    storage = firebase.storage()

    disease:any = {
        images:[],
        title:'',
        description:''
    }

    diseaseInformation = {}
    diseases = []
    diseasseId = []


    trigger(){
        document.getElementById('file-input').click()
    }

    reader = new FileReader()
    readURL(e: Event){
        this.disease.images = []
		const target = e.target as HTMLInputElement;
        console.log(target.files.length)
		// if (target.files.length > 0) {
        //     this.reader.onload = (event) => {
        //         this.reader.readAsDataURL(target.files[0]);
		
        //     };
		// }
    }

    retrieve(){
        this.diseases = []
        this.diseasseId = []
        this.firestore.collection('diseases').get().subscribe((pests) => {
            pests.forEach((pest) => {
                this.diseases.push(pest.data())
                this.diseasseId.push(pest.id)
            })
        })
    }

    
    async save(){
        if(this.disease.images.length == 0){
           this.ToastrService.error(`Pest Images could not be empty`)
           return
        }
        if(this.disease.title == "" || this.disease.description == ""){
            this.ToastrService.error(`All Fields should  not be empty`)
            return
        }
        const file = await this.storage.ref(this.disease.images[0].name).put(this.disease.images[0]);
        const photo_url = await file.ref.getDownloadURL();
        this.disease.images[0] = photo_url
        this.firestore.collection('pests').add(this.disease)
        this.ToastrService.success(`${this.disease.title} has been saved`)
        this.retrieve()
    }

    update(disease,id){
        this.firestore.collection('diseases').doc(id).update(disease)
        this.ToastrService.success(`${disease.title} has been updated`)
        this.retrieve()
    }

    
    clear(){
        this.disease ={
            images:[],
            title:'',
            description:''
        }
        this.retrieve()
    }

    deleteData(id){
        this.firestore.collection('diseases').doc(id).delete()
        this.retrieve()
        this.ToastrService.info(`Disease or Disorder has been deleted`)

    }

    view(disease){
        this.diseaseInformation = disease
    }



}
