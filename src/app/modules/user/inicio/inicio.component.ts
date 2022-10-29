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
    Folio: '',
    Puntaje: '',
    Interpretacion1: 0,
    Creatividad1: 0,
    ImagenCaracterizacion1: 0,
    Extra1: 0,

    Interpretacion2: 0,
    Creatividad2: 0,
    ImagenCaracterizacion2: 0,
    Extra2: 0,
    Interpretacion3: 0,
    Creatividad3: 0,
    ImagenCaracterizacion3: 0,
    Extra3: 0,
    Interpretacion4: 0,
    Creatividad4: 0,
    ImagenCaracterizacion4: 0,
    Extra4: 0,



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
      Folio,
     
      Interpretacion1,
      Creatividad1,
      ImagenCaracterizacion1,
      Extra1,

      Interpretacion2,
      Creatividad2,
      ImagenCaracterizacion2,
      Extra2,
      Interpretacion3,
      Creatividad3,
      ImagenCaracterizacion3,
      Extra3,
      Interpretacion4,
      Creatividad4,
      ImagenCaracterizacion4,
      Extra4,


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
      Categoria: Categoria,
      facebook: facebook,
      instragram: instragram,
      nombreTutor: nombreTutor,
      appTutor: appTutor,
      apmTutor: apmTutor,
      Relacion: Relacion,


      Lugar: Lugar,
      Personaje: Personaje,
      Folio: Folio,

      Interpretacion1: Interpretacion1,
      Creatividad1: Creatividad1,
      ImagenCaracterizacion1:  ImagenCaracterizacion1,

      Extra1: Extra1,

      Interpretacion2: Interpretacion2,
      Creatividad2: Creatividad2,
      ImagenCaracterizacion2: ImagenCaracterizacion2,
      Extra2: Extra2,
      Interpretacion3: Interpretacion3,
      Creatividad3: Creatividad3,
      ImagenCaracterizacion3: ImagenCaracterizacion3,
      Extra3: Extra3,
      Interpretacion4: Interpretacion4,
      Creatividad4: Creatividad4,
      ImagenCaracterizacion4: ImagenCaracterizacion4,
      Extra4: Extra4,





      Puntaje: 0,

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
    this.exporExcel.con(this.ContactoModels)

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

          id: arr[i].id.replace(/["']/g, ""),
          date: arr[i].date.replace(/["']/g, ""),
          status: arr[i].status.replace(/["']/g, ""),
          submission: arr[i].submission.replace(/["']/g, ""),
          nombre: arr[i].nombre.replace(/["']/g, ""),
          fechaNa: arr[i].fechaNa.replace(/["']/g, ""),
          app: arr[i].app.replace(/["']/g, ""),
          correo: arr[i].correo.replace(/["']/g, ""),
          apm: arr[i].apm.replace(/["']/g, ""),
          telefono: arr[i].telefono.replace(/["']/g, ""),
          Categoria: arr[i].Categoria.replace(/["']/g, ""),
          facebook: arr[i].facebook.replace(/["']/g, ""),
          instragram: arr[i].instragram.replace(/["']/g, ""),
          nombreTutor: arr[i].nombreTutor.replace(/["']/g, ""),
          appTutor: arr[i].appTutor.replace(/["']/g, ""),
          apmTutor: arr[i].apmTutor.replace(/["']/g, ""),
          Relacion: arr[i].Relacion.replace(/["']/g, ""),
          //      Infantil: arr[i].Infantil,
          //     Juvenil: arr[i].Juvenil,

          Lugar: "",
          Personaje: "",
          Folio: "",

          Interpretacion1: 0,
          Creatividad1:0,
          ImagenCaracterizacion1: 0,
          Extra1: 0,

          Interpretacion2: 0,
          Creatividad2: 0,
          ImagenCaracterizacion2: 0,
          Extra2: 0,
          Interpretacion3: 0,
          Creatividad3: 0,
          ImagenCaracterizacion3: 0,
          Extra3: 0,
          Interpretacion4: 0,
          Creatividad4: 0,
          ImagenCaracterizacion4: 0,
          Extra4: 0,
          Puntaje: 0,

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


