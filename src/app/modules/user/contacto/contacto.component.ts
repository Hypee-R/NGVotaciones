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
      this.router.navigate(['/portal/contacto'], { replaceUrl: true });
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
      console.log(this.ContactoModels)
  
    })
  }

  





 
}


