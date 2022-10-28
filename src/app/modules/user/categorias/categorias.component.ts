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
  total:number;


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
    RubroA: 0,
    RubroB: 0,
    RubroC: 0,
    RubroD: 0,
   
    RubroA2: 0,
    RubroB2: 0,
    RubroC2: 0,
    RubroD2: 0,
    RubroA3: 0,
    RubroB3: 0,
    RubroC3: 0,
    RubroD3: 0,
    RubroA4: 0,
    RubroB4: 0,
    RubroC4: 0,
    RubroD4: 0,
    Puntaje:0

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
      {name: 'INFANTIL', code: 'Infantil'},
      {name: 'JUVENIL', code: 'Juvenil'},
      {name: 'ADULTO', code: 'Adulto'},
   
  ];

      

    if (this.authService.Usuario){
      console.log("Autenticado")
      this.router.navigate(['/portal/categorias'], { replaceUrl: true });
    }else{
      console.log("no Autenticado")
      this.router.navigate(['/portal/login'], { replaceUrl: true });
    }

  }

  onChange(event) {
   
    this.get();
      
  }

  async get() {
   if(this.selectedCategoriaFilter==undefined){
        this.toastr.warning('No se  agrego un filtro de busqueda!!', 'Error');}
       else{
  
        console.log(this.selectedCategoriaFilter.code)

     const snapshot = await this.firebaseService.getContactosFiltro(this.selectedCategoriaFilter.code);
     this.updateConvocatoriaCollection(snapshot);
       }
   
  }

  updateConvocatoriaCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.ContactoModels = [];

    // console.log( this.selectedCategoriaFilter.code)
    snapshot.docs.forEach((mensaje) => {
      this.ContactoModels.push({ ...mensaje.data(), id: mensaje.id });
    console.log(mensaje.data());
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
  this.total = parseInt(this.ContactoModels[this.first].RubroA)+parseInt(this.ContactoModels[this.first].RubroB)
  +parseInt(this.ContactoModels[this.first].RubroC)+parseInt(this.ContactoModels[this.first].RubroD)
  +parseInt(this.ContactoModels[this.first].RubroA2)+parseInt(this.ContactoModels[this.first].RubroB2)
  +parseInt(this.ContactoModels[this.first].RubroC2)+parseInt(this.ContactoModels[this.first].RubroD2)
  +parseInt(this.ContactoModels[this.first].RubroA3)+parseInt(this.ContactoModels[this.first].RubroB3)
  +parseInt(this.ContactoModels[this.first].RubroC3)+parseInt(this.ContactoModels[this.first].RubroD3)
  +parseInt(this.ContactoModels[this.first].RubroA4)+parseInt(this.ContactoModels[this.first].RubroB4)
  +parseInt(this.ContactoModels[this.first].RubroC4)+parseInt(this.ContactoModels[this.first].RubroD4);
  

// Registro del usuario calificado
  console.log(registro.Puntaje=this.total)
  console.log(registro.Puntaje);
  // this.ContactoModel.Puntaje=this.total;
  // console.log(this.ContactoModel.Puntaje)
   this.ContactoModel = { ...registro }
   this.firebaseService.updatecontacto(this.ContactoModel.id, this.ContactoModel.Lugar, 
    this.ContactoModel.Personaje, this.ContactoModel.RubroA,this.ContactoModel.RubroB,this.ContactoModel.RubroC,
    this.ContactoModel.RubroD, this.ContactoModel.Folio, this.ContactoModel.RubroA2,this.ContactoModel.RubroB2,this.ContactoModel.RubroC2,
    this.ContactoModel.RubroD2,this.ContactoModel.RubroA3,this.ContactoModel.RubroB3,this.ContactoModel.RubroC3,
    this.ContactoModel.RubroD3,this.ContactoModel.RubroA4,this.ContactoModel.RubroB4,this.ContactoModel.RubroC4,
    this.ContactoModel.RubroD4,this.ContactoModel.Puntaje
    
   )
}

sumaRubros(){
  this.total = parseInt(this.ContactoModels[this.first].RubroA)+parseInt(this.ContactoModels[this.first].RubroB)
  +parseInt(this.ContactoModels[this.first].RubroC)+parseInt(this.ContactoModels[this.first].RubroD)
  +parseInt(this.ContactoModels[this.first].RubroA2)+parseInt(this.ContactoModels[this.first].RubroB2)
  +parseInt(this.ContactoModels[this.first].RubroC2)+parseInt(this.ContactoModels[this.first].RubroD2)
  +parseInt(this.ContactoModels[this.first].RubroA3)+parseInt(this.ContactoModels[this.first].RubroB3)
  +parseInt(this.ContactoModels[this.first].RubroC3)+parseInt(this.ContactoModels[this.first].RubroD3)
  +parseInt(this.ContactoModels[this.first].RubroA4)+parseInt(this.ContactoModels[this.first].RubroB4)
  +parseInt(this.ContactoModels[this.first].RubroC4)+parseInt(this.ContactoModels[this.first].RubroD4);
}

setState(){
  console.log("estamos en el change");




}



}
interface valuefilter {
    name: string;
    code: string;
}