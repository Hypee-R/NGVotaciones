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

  @Output() fetchNominaciones: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() accion: string;
  contactoForm: FormGroup;
  submitted: boolean;

  contactomodel = {

    
  nombre: "",
  app: "",
  fechaNa: "",
    
  }

  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
  
  }


  async add() {
    const { nombre, app,fechaNa, } = this.contactomodel;
    await   this.contactoService.addVotacines({
      nombre: nombre,
      app: app,
      fechaNa:fechaNa,
    });
    this.toastr.success('Alguien Se pondra en contacto!', 'Success');
  }




  }



