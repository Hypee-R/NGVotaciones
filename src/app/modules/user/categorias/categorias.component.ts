import { Component, OnInit } from '@angular/core';
import { DocumentData, query, QuerySnapshot } from 'firebase/firestore';
import { ContactoService } from 'src/app/services/contacto.service';
import { CategoriaModel } from '../../../models/categoria.model';
import { Router } from '@angular/router';
import { ConfigService } from 'src/config/config.service';
import {PaginatorModule} from 'primeng/paginator';
import { ContactoModel } from 'src/app/models/contacto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  ContactoModels: any[] = [];
  categoria : String;
  catedata: valuefilter[];
  selectedCategoriaFilter: valuefilter;


states = ["option1", "option2", "option3",]
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
 
    facebook: '',
    instragram: '',
    nombreTutor: '',
    appTutor: '',
    apmTutor: '',
    Relacion: '',
    Categoria:'',
    Lugar: '',
    Personaje: '',
    RubroA: '',
    RubroB: '',
    RubroC: '',
    RubroD: '',
    Puntaje:'',
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

  categorias: any;
  convocatorias: any;
  loading: boolean = true;
  selectedCategoria: CategoriaModel;
  visibleSide: boolean = false;
  accion: string = "";
INFANTIL: any;
JUVENIL: any;
 
  constructor(
    private toastr: ToastrService,
    private router: Router,
    public configService: ConfigService,
    private authService: ConfigService,
    private firebaseService: ContactoService,
  ) {
  
   }

  ngOnInit(): void {
    this.catedata = [
      {name: 'INFANTIL', code: 'INFANTIL'},
      {name: 'JUVENIL', code: 'JUVENIL'},
      {name: 'ADULTO', code: 'ADULTO'},
   
  ];

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
    // if(this.selectedCategoriaFilter==undefined){
    //    this.toastr.warning('No se  agrego un filtro de busqueda!!', 'Error');}
    //    else{
        // aqui esta el valor afiltrar

       // console.log(this.selectedCategoriaFilter.code)
     // dataNominacion.evaluacion=this.selectedEvaluacion.code;
     const snapshot = await this.firebaseService.getContactos();
     this.updateConvocatoriaCollection(snapshot);
      //  }
   
  }

  updateConvocatoriaCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.ContactoModels = [];

    // console.log( this.selectedCategoriaFilter.code)
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
   this.firebaseService.updatecontacto(this.ContactoModel.id, this.ContactoModel.Lugar, 
    this.ContactoModel.Personaje, this.ContactoModel.RubroA,this.ContactoModel.RubroB,this.ContactoModel.RubroC,
    this.ContactoModel.RubroD, this.ContactoModel.Folio, this.ContactoModel.RubroA2,this.ContactoModel.RubroB2,this.ContactoModel.RubroC2,
    this.ContactoModel.RubroD2,this.ContactoModel.RubroA3,this.ContactoModel.RubroB3,this.ContactoModel.RubroC3,
    this.ContactoModel.RubroD3,this.ContactoModel.RubroA4,this.ContactoModel.RubroB4,this.ContactoModel.RubroC4,
    this.ContactoModel.RubroD4,
    
   )
}

setState(){
  console.log(this.categoria);
  var select = document.getElementById("feedingHay");
  var options=document.getElementsByTagName("option");
  console.log( select);
  console.log(options)

if(this.categoria== "INFANTIL"){

  this.ContactoModel.nombre;
  


}if(this.categoria== "JUVENIL"){

  this.ContactoModel.nombre;
  


}
if(this.categoria== "ADULTO"){

  this.ContactoModels;
  


}



}



}
interface valuefilter {
    name: string;
    code: string;
}