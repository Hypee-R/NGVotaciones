import { Component, ViewChild } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  contactomodel = {
    id : '',
    date : '',
    status : '',
    nombre : '',
    submission : '',
    app : '',
    fechaNa : '',
    correo : '',
    apm : '',
    telefono : '',
    adulto : '',
    facebook : '',
    instragram : '',
    nombreTutor : '',
  appTutor : '',
  apmTutor : '',
  }


  public csvRecords: any[] = [];


  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,
  
  //  private firebaseService: ContactoService,
  ) { }
  ngOnInit(): void { }


  async add() {
    const recorreArray = (arr) => {
      for(let i=0; i<=arr.length-1; i++){
      console.log(arr[i]);
      this.contactoService.addVotacines({
        id: arr[i].title,
        date: arr[i].title,
    status: arr[i].title,
    submission: arr[i].title,
       nombre: arr[i].title, 
       fechaNa:arr[i].title,
              app: arr[i].title,
              correo: arr[i].title,
              apm: arr[i].title,
              telefono: arr[i].title,
              adulto: arr[i].title,
              facebook: arr[i].title,
              instragram: arr[i].title,
              nombreTutor: arr[i].title,
              appTutor: arr[i].title,
              apmTutor: arr[i].title,
            });
      }
    }

    recorreArray(this.csvRecords);




  
  }






  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

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
        console.log("===============Aqui recorremos el arreglo y extraemos uno por uno=======================");
  
        
      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
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
        csvRecord.name = data[4].trim();
        csvRecord.firstName = data[8].trim();
        csvRecord.lastName = data[6].trim();
        csvRecord.email = data[7].trim();
        csvRecord.phoneNumber = data[9].trim();
        csvRecord.date = data[1].trim();
        csvRecord.status = data[2].trim();
        csvRecord.submissionId = data[3].trim();
        csvRecord.adult = data[10].trim();
        csvRecord.userFacebook = data[11].trim();
        csvRecord.userInstagram = data[12].trim();
        csvRecord.tutorName = data[13].trim();
        csvRecord.tutorLastName = data[14].trim();
        csvRecord.tutorFirstName = data[15].trim();
        csvRecord.tutorRelationship = data[16].trim();
        csvRecord.childish = data[17].trim();
        csvRecord.youth = data[18].trim();
        dataArr.push(csvRecord);
      }
    }
   
   
    
    return dataArr;
  }


  
  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
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
  public name: any;
  public lastName: any;
  public firstName: any;
  public email: any;
  public phoneNumber: any;
  public title: any;
  public occupation: any;
  public date: any;
  public status: any;
  public submissionId: any;
  public adult: any;
  public userFacebook: any;
  public userInstagram: any;
  public tutorName: any;
  public tutorLastName: any;
  public tutorFirstName: any;
  public tutorRelationship: any;
  public childish: any;
  public youth: any;

  constructor(
   
  ) {

  }




}

