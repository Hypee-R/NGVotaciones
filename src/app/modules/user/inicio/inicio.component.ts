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
    nombre: '',
    app: '',
    fechaNa: '',

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
             nombre: arr[i].title,
              app: arr[i].title,
              fechaNa:arr[i].title,
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
        csvRecord.firstName = data[0].trim();
        csvRecord.lastName = data[1].trim();
        csvRecord.email = data[2].trim();
        csvRecord.phoneNumber = data[3].trim();
        csvRecord.title = data[4].trim();
        csvRecord.occupation = data[5].trim();

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

  public firstName: any;
  public lastName: any;
  public email: any;
  public phoneNumber: any;
  public title: any;
  public occupation: any;

  constructor(
   
  ) {

  }




}

