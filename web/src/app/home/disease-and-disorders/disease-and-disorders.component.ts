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
    ) { }

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
    srcs = []
    readURL(files: FileList,event){	
        if (event.target.files && event.target.files[0]) {	
            this.srcs = []
			Object.keys(files).forEach(i => {			
		        this.disease.images.push( files[i] ) 
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
                    this.srcs.push( (<FileReader>event.target).result ) 
				}	
			})	
		}	
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
        this.ToastrService.info(`Uploading Images`)
        for (let index = 0 ;index <= this.disease.images.length -1 ; index++){
            let file = await this.storage.ref( 'disease/' + this.disease.images[index].name).put(this.disease.images[index]);
            let photo_url = await file.ref.getDownloadURL();
            this.disease.images.splice(index,1,photo_url)
        }
        this.disease['created_at'] = Date.now()
        this.firestore.collection('diseases').add(this.disease)
        this.ToastrService.success(`${this.disease.title} has been saved`)
        this.retrieve()
    }

    update(disease,id){
        disease['updated_at'] = Date.now()
        this.firestore.collection('diseases').doc(id).update(disease)
        this.ToastrService.success(`${disease.title} has been updated`)
        this.retrieve()
    }

    
    clear(){
        this.srcs = []
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
