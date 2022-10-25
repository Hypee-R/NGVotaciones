import { Component, OnInit } from '@angular/core';
import { DocumentData, query, QuerySnapshot } from 'firebase/firestore';
import { ContactoService } from 'src/app/services/contacto.service';
import { CategoriaModel } from '../../../models/categoria.model';
import { Router } from '@angular/router';
import { ConfigService } from 'src/config/config.service';
import {PaginatorModule} from 'primeng/paginator';
import { ContactoModel } from 'src/app/models/contacto.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  ContactoModels: any[] = [];
  ContactoModel: ContactoModel;
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
    RubroA: '',
    RubroB: '',
    Rubroc: '',
    RubroD: '',
    Puntaje:'',
  }

  categorias: any;
  convocatorias: any;
  loading: boolean = true;
  selectedCategoria: CategoriaModel;
  visibleSide: boolean = false;
  accion: string = "";
  constructor(
    private router: Router,
    public configService: ConfigService,
    private authService: ConfigService,
    private firebaseService: ContactoService,
  ) {
 
   }

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


  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
}

//Aqui tenemos el primer registro para ir actualizandolo y agregarle el rubro etc
first: number = 0;



onPageChange(event) {
  console.log(event);

    this.first = event.first;
}

//Refrescamos los registros para volver al primero 
refresh() {
    this.first = 0;

}

editar(registro: any) {
// Registro del usuario calificado
  console.log(registro)
   this.ContactoModel = { ...registro }
   this.firebaseService.updatecontacto(this.ContactoModel.id, this.ContactoModel.Lugar, this.ContactoModel.Personaje, this.ContactoModel.RubroA,this.ContactoModel.RubroB,this.ContactoModel.RubroC,
    this.ContactoModel.RubroD, this.ContactoModel.Folio
    
   )
}


}