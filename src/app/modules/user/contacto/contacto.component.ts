import { Component, OnInit ,EventEmitter,Output,Input, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VariablesService } from 'src/app/services/variablesGL.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { ContactoModel } from 'src/app/models/contacto.model';
import { ConfigService } from 'src/config/config.service';
import { Router, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  selectedContactoModels: ContactoModel[];
  ContactoModel: ContactoModel;
  ContactoModels: any[] = [];
  contactomodel = {
    id: '',
   date: '',
  //   status: '',
  //   nombre: '',
  //   submission: '',
  //   app: '',
  //   fechaNa: '',
  //   correo: '',
  //   apm: '',
  //   telefono: '',
  //   adulto: '',
  //   facebook: '',
  //   instragram: '',
  //   nombreTutor: '',
  //   appTutor: '',
  //   apmTutor: '',
    Relacion: '',
    Infantil: '',
  Juvenil: '',
  Lugar: '',
     Personaje: '',


   }


  public csvRecords: any[] = [];
  visible: boolean;


  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,
      private firebaseService: ContactoService,
      private authService: ConfigService,
      private router: Router
  ) { }
  ngOnInit(): void { 

    this.get();
    if (this.authService.Usuario){
      console.log("Autenticado")
      this.router.navigate(['/portal/categorias'], { replaceUrl: true });
    }else{
      console.log("no Autenticado")
      this.router.navigate(['/portal/login'], { replaceUrl: true });
    }
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

  

  async add() {
    const recorreArray = (arr) => {
      for (let i = 0; i <= arr.length - 1; i++) {
        console.log(arr[i]);
        // this.contactoService.addVotacines({
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
      }
    }


    

    recorreArray(this.csvRecords);

      
      this.toastr.success('Se dio de alta correctamente!', 'Success');

  }






  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
console.log("==============LLegamos a cargar la data=============")
    let text = [];
    let files = $event.srcElement.files;

    // if (this.isCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log("===============Aqui recorremos el arreglo y extraemos uno por uno=======================");


      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    // } else {
    //   alert("Please import valid .csv file.");
    //   this.fileReset();
    // }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let dataArr = [];


    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = (<string>csvRecordsArray[i]).split(',');

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length == headerLength) {

        let csvRecord: CSVRecord = new CSVRecord();

        console.log("===============Aqui agrega todas las columnas como te dije  con su nombre correcto y su data[0] posicion correcta =======================");

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
  // isCSVFile(file: any) {
  //   return file.name.endsWith(".csv");
  // }

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


