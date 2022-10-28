import { Component, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { ContactoModel } from 'src/app/models/contacto.model';
import { ContactoService } from 'src/app/services/contacto.service';
import { saveAs } from 'file-saver';
import { ConfirmationService } from 'primeng/api';
import { Router, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ConfigService } from 'src/config/config.service';
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
    submission: '',
    nombre: '',
    fechaNa: '',
    app: '',
    correo: '',
    apm: '',
    telefono: '',
    Categoria: '',
    facebook: '',
    instragram: '',
    nombreTutor: '',
    appTutor: '',
    apmTutor: '',
    Relacion: '',
    Lugar: '',
    Personaje: '',
    Folio:'',
    Puntaje:'',
   
    RubroA:'' ,
    RubroB: '' ,
    RubroC:  '' ,
    RubroD:  '' ,
    RubroA2: '',
    RubroB2: '',
    RubroC2: '',
    RubroD2: '',
    RubroA3: '',
    RubroB3: '',
    RubroC3: '',
    RubroD3: '',
    RubroA4: '',
    RubroB4: '',
    RubroC4: '',
    RubroD4: '',



  }


  public csvRecords: any[] = [];

  convocatoriaForm: FormGroup;
  submitted: boolean;

  visible: boolean;
  convocatoriaModelDialog: boolean;
  convocatoriaModel: any;
  visibleDe: boolean = false




  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private exporExcel: ExcelService,
    private confirmationService: ConfirmationService,
    private firebaseService: ContactoService,
    private authService: ConfigService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.get();

    if (this.authService.Usuario) {
      console.log("Autenticado")
      this.router.navigate(['/portal/inicio'], { replaceUrl: true });
    } else {
      console.log("no Autenticado")
      this.router.navigate(['/portal/login'], { replaceUrl: true });
    }
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

  guardar(registro: any) {
    console.log(registro)
    this.ContactoModel = { ...registro }
    this.firebaseService.updatecontactoLugarPersonaje(
      this.ContactoModel.id, 
      this.ContactoModel.Lugar,
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
     Categoria,
      facebook,
      instragram,
      nombreTutor,
      appTutor,
      apmTutor,
      Relacion,
      
      Lugar,
      Personaje,
      RubroA,
       RubroB,
        RubroC,
     RubroD,
     Folio,
     
     RubroA2,
     RubroB2,
      RubroC2,
   RubroD2,
   RubroA3,
   RubroB3,
    RubroC3,
 RubroD3,
 RubroA4,
 RubroB4,
  RubroC4,
RubroD4,


    } = this.contactomodel;
    this.contactoService.addVotacines({

      id: id,
      date: date,
      status: status,
      submission: submission,
      nombre: nombre,
      fechaNa: fechaNa,
       app: app,
      
      correo: correo,
      apm: apm,
      telefono: telefono,
      Categoria:Categoria,
      facebook: facebook,
      instragram: instragram,
      nombreTutor: nombreTutor,
      appTutor: appTutor,
      apmTutor: apmTutor,
      Relacion: Relacion,
      
     
      Lugar: Lugar,
      Personaje: Personaje,
      RubroA: RubroA,
      RubroB: RubroB,
      RubroC:  RubroC,
      RubroD:  RubroD,
      Folio:Folio,
    

      RubroA2:RubroA2,
      RubroB2:RubroB2,
       RubroC2:RubroC2,
    RubroD2:RubroD2,

    RubroA3:RubroA3,
    RubroB3:RubroB3,
     RubroC3:RubroC3,
  RubroD3:RubroD3,

  RubroA4:RubroA4,
  RubroB4:RubroB4,
   RubroC4:RubroC4,
RubroD4:RubroD4,
Puntaje:0

    });
    this.toastr.success('Se dio de alta correctamente!', 'Success');
  }






  openNew() {
  /*   this.ContactoModel = {id:'',
       date: '', status: '', nombre: '',
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
       RubroA: '',
     RubroB: '',
     RubroC: '',
     RubroD: '',
      Folio:'',
     
 
     };
     */this.visible = true;

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
        csvRecord.Categoria = data[10].trim();
        csvRecord.facebook = data[11].trim();
        csvRecord.instragram = data[12].trim();
        csvRecord.nombreTutor = data[13].trim();
        csvRecord.appTutor = data[14].trim();
        csvRecord.apmTutor = data[15].trim();
        csvRecord.Relacion = data[16].trim();
       
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
          Categoria: arr[i].Categoria.replace(/["']/g, ""),
          facebook: arr[i].facebook,
          instragram: arr[i].instragram,
          nombreTutor: arr[i].nombreTutor,
          appTutor: arr[i].appTutor,
          apmTutor: arr[i].apmTutor,
          Relacion: arr[i].Relacion,
    //      Infantil: arr[i].Infantil,
     //     Juvenil: arr[i].Juvenil,
         
          Lugar: "",
          Personaje: "",
          RubroA: "",
          RubroB: "",
          RubroC: "",
          RubroD: "",
          Folio: "",
          RubroA2: "",
          RubroB2: "",
          RubroC2: "",
          RubroD2: "",
          RubroA3: "",
          RubroB3: "",
          RubroC3: "",
          RubroD3: "",
          RubroA4: "",
          RubroB4: "",
          RubroC4: "",
          RubroD4: "",
          Puntaje:0
          
        });
      }
    }

    recorreArray(data);

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
  public submission: any;
  public nombre: any;
  public fechaNa: any;
  public app: any;
  public correo: any;
  public apm: any;
  public telefono: any;
  public Categoria: any;
  public facebook: any;
  public instragram: any;
  public nombreTutor: any;
  public appTutor: any;
  public apmTutor: any;
  public Relacion: any;
  

  constructor(

  ) {

  }



}


