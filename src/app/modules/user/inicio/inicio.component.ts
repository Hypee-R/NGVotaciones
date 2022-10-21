import { Component, ViewChild } from '@angular/core';
import {DialogModule} from 'primeng/dialog';

import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { ContactoModel } from 'src/app/models/contacto.model';
import { ContactoService } from 'src/app/services/contacto.service';
import { saveAs } from 'file-saver';
import { ConfirmationService } from 'primeng/api';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  ContactoModelDialog: boolean;
  selectedContactoModels: ContactoModel[];
  ContactoModel: ContactoModel;
  ContactoModels: any[] = [];
  contactomodel = {
    id: '',
   date: '',
  status: '',
     nombre: '',
    submission: '',
    app: '',
   fechaNa: '',
    correo: '',
    apm: '',
    telefono: '',
    adulto: '',
    facebook: '',
   instragram: '',
    nombreTutor: '',
    appTutor: '',
    apmTutor: '',
    Relacion: '',
    Infantil: '',
  Juvenil: '',
  Lugar: '',
     Personaje: '',


   }


  public csvRecords: any[] = [];

  convocatoriaForm: FormGroup;
  submitted: boolean;

  visible: boolean;
  convocatoriaModelDialog: boolean;
  convocatoriaModel: any;
  visibleDe:boolean = false

  
 

  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private exporExcel: ExcelService,
    private confirmationService: ConfirmationService,
      private firebaseService: ContactoService,
   
  ) { }
  ngOnInit(): void { 
    this.initForm();
    this.get();
  }
  initForm() {
    this.convocatoriaForm = this.fb.group({
      id: ['', [Validators.required]],
     nombre: ['', [Validators.required]],
      app: ['', [Validators.required]],

    })
  }
  async get() {
    const snapshot = await this.firebaseService.getContactos();
    this.updateConvocatoriaCollection(snapshot);
  }

  updateConvocatoriaCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.ContactoModels = [];
    snapshot.docs.forEach((mensaje) => {
      this.ContactoModels.push({ ...mensaje.data(), id: mensaje.id });
    })
  }

  editar(registro: any) {
    this.ContactoModel = { ...registro }
     this.firebaseService.updatecontacto( this.ContactoModel.id, this.ContactoModel.Lugar,
     this.ContactoModel.Personaje
     )
  }


   delete(docId: any) {


   this.confirmationService.confirm({
     message: '¿Está seguro de que desea eliminar el Registro  ?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
    accept: () => {
         this.firebaseService.deletecontacto(docId.id);
    }
  });
  }
  
  async add() {

        const { id,
          date,
          status,
       nombre,
       submission,
       app,
       fechaNa,
       correo,
       apm,
       telefono,
       adulto,
       facebook,
       instragram,
       nombreTutor,
       appTutor,
       apmTutor,
       Relacion,
       Infantil,
       Juvenil,
       Lugar,
       Personaje,
 } = this.contactomodel;
  this.contactoService.addVotacines({

       id:id,
          date: date,
       status: status,
       nombre: nombre,
       submission:  submission,
       app: app,
       fechaNa: fechaNa,
       correo: correo,
       apm:  apm,
       telefono: telefono,
       adulto: adulto,
       facebook: facebook,
       instragram: instragram,
       nombreTutor: nombreTutor,
       appTutor:  appTutor,
       apmTutor: apmTutor,
       Relacion: Relacion,
       Infantil:  Infantil,
       Juvenil:   Juvenil,
       Lugar:  Lugar,
       Personaje: Personaje,
      });
      this.toastr.success('Se dio de alta correctamente!', 'Success');
    }
     



        //   id: arr[i].id,
        //   date: arr[i].date,
        //   status: arr[i].status,
        //   submission: arr[i].submission,
        //   nombre: arr[i].nombre,
        //   fechaNa: arr[i].fechaNa,
        //   app: arr[i].app,
        //   correo: arr[i].correo,
        //   apm: arr[i].apm,
        //   telefono: arr[i].telefono,
        //   adulto: arr[i].adulto,
        //   facebook: arr[i].facebook,
        //   instragram: arr[i].instragram,
        //   nombreTutor: arr[i].nombreTutor,
        //   appTutor: arr[i].appTutor,
        //   apmTutor: arr[i].apmTutor,
        //   Relacion: arr[i].Relacion,
        //   Infantil: arr[i].Infantil,
        //   Juvenil: arr[i].Juvenil,
        //   Lugar:"",
        //   Personaje: "",


        // });

      
  

openNew() {
  this.ContactoModel={date:'',status:'',  nombre: '',
  submission: '',
  app: '',
 fechaNa: '',
  correo: '',
  apm: '',
  telefono: '',
  adulto: '',
  facebook: '',
 instragram: '',
  nombreTutor: '',
  appTutor: '',
  apmTutor: '',
  Relacion: '',
  Infantil: '',
Juvenil: '',
Lugar: '',
   Personaje: '',};
  this.visible = true;
  
}


Excel() {
  this.exporExcel.convoc(this.ContactoModels)

}
  hideDialog() {
    this.visibleDe = false;
    this.visible = false;
    this.submitted = false;
  }






  @ViewChild('fileImportInput') fileImportInput: any;
  fileChangeListener($event: any): void {
    console.log("Recorremos el archivo")
    let text = [];
    let files = $event.srcElement.files;

     if (this.isCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.savedatafile(this.csvRecords);
            


      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
       
      };

     } else {
        
      this.toastr.warning('Por favor importe un archivo .csv Valido!');
    
       this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let dataArr = [];


    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = (<string>csvRecordsArray[i]).split(',');
      if (data.length == headerLength) {

        let csvRecord: CSVRecord = new CSVRecord();

        csvRecord.id = data[0].trim();
        csvRecord.date = data[1].trim();
        csvRecord.status = data[2].trim();
        csvRecord.submission = data[3].trim();
        csvRecord.nombre = data[4].trim();
        csvRecord.fechaNa = data[5].trim();
        csvRecord.app = data[6].trim();
        csvRecord.correo = data[7].trim();
        csvRecord.apm = data[8].trim();
        csvRecord.telefono = data[9].trim();
        csvRecord.adulto = data[10].trim();
        csvRecord.facebook = data[11].trim();
        csvRecord.instragram = data[12].trim();
        csvRecord.nombreTutor = data[13].trim();
        csvRecord.appTutor = data[14].trim();
        csvRecord.apmTutor = data[15].trim();
        csvRecord.Relacion = data[16].trim();
        csvRecord.Infantil = data[17].trim();
        csvRecord.Juvenil = data[18].trim();
        dataArr.push(csvRecord);
      }
    }



    return dataArr;
  }


 
  // CHECK IF FILE IS A VALID CSV FILE
   isCSVFile(file: any) {
     return file.name.endsWith(".csv");
   }

   savedatafile(data) {
    console.log("save data field")
    console.log(data)
    const recorreArray = (arr) => {
      for (let i = 0; i <= arr.length - 1; i++) {
        console.log(arr[i]);
   this.contactoService.addVotacines({

          id: arr[i].id,
           date: arr[i].date,
          status: arr[i].status,
          submission: arr[i].submission,
           nombre: arr[i].nombre,
           fechaNa: arr[i].fechaNa,
           app: arr[i].app,
           correo: arr[i].correo,
          apm: arr[i].apm,
          telefono: arr[i].telefono,
           adulto: arr[i].adulto,
           facebook: arr[i].facebook,
           instragram: arr[i].instragram,
          nombreTutor: arr[i].nombreTutor,
           appTutor: arr[i].appTutor,
           apmTutor: arr[i].apmTutor,
           Relacion: arr[i].Relacion,
           Infantil: arr[i].Infantil,
           Juvenil: arr[i].Juvenil,
           Lugar:"",
           Personaje: "",


          } ) ;
        }
      }
  
      recorreArray (data);
  
      this.toastr.success('Registro Guardado  con exito!!', 'Exito');
  
      this.get();
    
    }
  
  


  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }

}

export class CSVRecord {

  public id: any;
  public date: any;
  public status: any;
  public nombre: any;
  public submission: any;
  public app: any;
  public fechaNa: any;
  public correo: any;
  public apm: any;
  public telefono: any;
  public adulto: any;
  public facebook: any;
  public instragram: any;
  public nombreTutor: any;
  public appTutor: any;
  public apmTutor: any;
  public Relacion: any;
  public Infantil: any;
  public Juvenil: any;

  constructor(

  ) {

  }



}


