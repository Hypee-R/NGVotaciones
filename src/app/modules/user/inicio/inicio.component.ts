import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import * as XLSX from 'xlsx';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VariablesService } from 'src/app/services/variablesGL.service';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  data: [][];
  constructor() { }

  ngOnInit(): void {
  }

 
  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      let x = this.data.slice(1);
      console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }

}