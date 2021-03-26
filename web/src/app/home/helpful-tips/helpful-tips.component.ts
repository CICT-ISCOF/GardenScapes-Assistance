import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr'
import firebase from 'firebase'

@Component({
  selector: 'app-helpful-tips',
  templateUrl: './helpful-tips.component.html',
  styleUrls: ['./helpful-tips.component.scss']
})
export class HelpfulTipsComponent implements OnInit {

    constructor(
        private firestore : AngularFirestore,
        private ToastrService : ToastrService
    ) { }

    ngOnInit(): void {
        this.retrieve()
    }

    storage = firebase.storage()

    tip:any = {
        images:[],
        title:'',
        description:'',
        category:''
    }

    tipInformation = {}
    tips = []
    tipIds = []


    trigger(){
        document.getElementById('file-input').click()
    }

    srcs = []
    readURL(files: FileList,event){	
        if (event.target.files && event.target.files[0]) {	
            this.srcs = []
			Object.keys(files).forEach(i => {			
		        this.tip.images.push( files[i] ) 
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
                    this.srcs.push( (<FileReader>event.target).result ) 
				}	
			})	
		}	
    }

    retrieve(){
        this.tips = []
        this.tipIds = []
        this.firestore.collection('tips').get().subscribe((pests) => {
            pests.forEach((pest) => {
                this.tips.push(pest.data())
                this.tipIds.push(pest.id)
            })
        })
    }

      
    async save(){
        if(this.tip.images.length == 0){
           this.ToastrService.error(`Pest Images could not be empty`)
           return
        }
        if(this.tip.title == "" || this.tip.description == ""){
            this.ToastrService.error(`All Fields should  not be empty`)
            return
        }
        this.ToastrService.info(`Uploading Images`)
        for (let index = 0 ;index <= this.tip.images.length -1 ; index++){
            let file = await this.storage.ref( 'tips/' + this.tip.images[index].name).put(this.tip.images[index]);
            let photo_url = await file.ref.getDownloadURL();
            this.tip.images.splice(index,1,photo_url)
        }
        this.tip['created_at'] = Date.now()
        this.firestore.collection('tips').add(this.tip)
        this.ToastrService.success(`${this.tip.title} has been saved`)
        this.retrieve()
    }

    update(tip,id){
        tip['updated_at'] = Date.now()
        this.firestore.collection('tips').doc(id).update(tip)
        this.ToastrService.success(`${tip.title} has been updated`)
        this.retrieve()
    }

    
    clear(){
        this.srcs = []
        this.tip ={
            images:[],
            title:'',
            description:''
        }
        this.retrieve()
    }

    deleteData(id){
        this.firestore.collection('tips').doc(id).delete()
        this.retrieve()
        this.ToastrService.info(`Tip has been deleted`)

    }

    view(tip){
        this.tipInformation = tip
    }

}
