import { Component, OnInit ,EventEmitter,Output,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VariablesService } from 'src/app/services/variablesGL.service';
import { ContactoService } from 'src/app/services/contacto.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
editar() {
throw new Error('Method not implemented.');
}
delete() {
throw new Error('Method not implemented.');
}

  @Output() fetchNominaciones: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() accion: string;
  contactoForm: FormGroup;
  submitted: boolean;

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
  exporExcel: any;

  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
  
  }


  async add() {
    const { id ,date , status,nombre ,submission ,app ,fechaNa ,correo ,apm ,telefono ,adulto ,facebook, instragram ,
   nombreTutor,
    appTutor ,
    apmTutor , } = this.contactomodel;
    await   this.contactoService.addVotacines({

      id :id,
      date :date,
      status : status,
      nombre : nombre,
      submission :submission,
      app : app,
      fechaNa : fechaNa,
      correo : correo,
      apm : apm,
      telefono : telefono,
      adulto : adulto,
      facebook : facebook,
      instragram : instragram,
      nombreTutor : nombreTutor,
    appTutor : appTutor,
    apmTutor : apmTutor,
      
     
    });
    this.toastr.success('Alguien Se pondra en contacto!', 'Success');
  }

  Excel() {
    this.exporExcel.convoc()

  }


  }



