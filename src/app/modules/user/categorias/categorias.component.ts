import { Component, OnInit } from '@angular/core';
import { DocumentData, query, QuerySnapshot } from 'firebase/firestore';
import { ContactoService } from 'src/app/services/contacto.service';
import { CategoriaModel } from '../../../models/categoria.model';
import { Router } from '@angular/router';
import { ConfigService } from 'src/config/config.service';
import { PaginatorModule } from 'primeng/paginator';
import { ContactoModel } from 'src/app/models/contacto.model';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  ContactoModels: any[] = [];
  categoria: String;
  catedata: valuefilter[];
  selectedCategoriaFilter: valuefilter;
  total: number;


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
    Categoria: '',
    Lugar: '',
    Personaje: '',



    Interpretacion1: 0,
    Creatividad1: 0,
    ImagenCaracterizacion1: 0,
    Extra1: 0,

    Interpretacion2: 0,
    Creatividad2: 0,
    ImagenCaracterizacion2: 0,
    Extra2: 0,
    Interpretacion3: 0,
    Creatividad3: 0,
    ImagenCaracterizacion3: 0,
    Extra3: 0,
    Interpretacion4: 0,
    Creatividad4: 0,
    ImagenCaracterizacion4: 0,
    Extra4: 0,
    Puntaje: 0

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
    private exporExcel: ExcelService,
    private firebaseService: ContactoService,
  ) {

  }

  ngOnInit(): void {
    this.catedata = [
      { name: 'INFANTIL', code: 'Infantil' },
      { name: 'JUVENIL', code: 'Juvenil' },
      { name: 'ADULTO', code: 'Adulto' },

    ];



    if (this.authService.Usuario) {
      console.log("Autenticado")
      this.router.navigate(['/portal/categorias'], { replaceUrl: true });
    } else {
      console.log("no Autenticado")
      this.router.navigate(['/portal/login'], { replaceUrl: true });
    }

  }

  onChange(event) {

    this.get();

  }

  async get() {
    if (this.selectedCategoriaFilter == undefined) {
      this.toastr.warning('No se  agrego un filtro de busqueda!!', 'Error');
    }
    else {

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
  Excel() {
    this.exporExcel.convoc(this.ContactoModels)

  }


  //Refrescamos los registros para volver al primero 
  refresh() {
    this.first = 0;

  }

  editar(registro: any) {
    this.total = parseInt(this.ContactoModels[this.first].Interpretacion1) + parseInt(this.ContactoModels[this.first].Creatividad1)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion1) + parseInt(this.ContactoModels[this.first].Extra1)
      + parseInt(this.ContactoModels[this.first].Interpretacion2) + parseInt(this.ContactoModels[this.first].Creatividad2)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion2) + parseInt(this.ContactoModels[this.first].Extra2)
      + parseInt(this.ContactoModels[this.first].Interpretacion3) + parseInt(this.ContactoModels[this.first].Creatividad3)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion3) + parseInt(this.ContactoModels[this.first].Extra3)
      + parseInt(this.ContactoModels[this.first].Interpretacion4) + parseInt(this.ContactoModels[this.first].Creatividad4)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion4) + parseInt(this.ContactoModels[this.first].Extra4);


    // Registro del usuario calificado
    console.log(registro.Puntaje =this.total)
    console.log(registro.Puntaje);
    //this.ContactoModel.Puntaje=this.total;
    //console.log(this.ContactoModel.Puntaje)
    this.ContactoModel = { ...registro }
    this.firebaseService.updatecontacto(this.ContactoModel.id, this.ContactoModel.Lugar,
      this.ContactoModel.Personaje, this.ContactoModel.Interpretacion1, this.ContactoModel.Creatividad1, this.ContactoModel.ImagenCaracterizacion1,
      this.ContactoModel.Extra1, this.ContactoModel.Folio, this.ContactoModel.Interpretacion2, this.ContactoModel.Creatividad2, this.ContactoModel.ImagenCaracterizacion2,
      this.ContactoModel.Extra2, this.ContactoModel.Interpretacion3, this.ContactoModel.Creatividad3, this.ContactoModel.ImagenCaracterizacion3,
      this.ContactoModel.Extra3, this.ContactoModel.Interpretacion4, this.ContactoModel.Creatividad4, this.ContactoModel.ImagenCaracterizacion4,
      this.ContactoModel.Extra4, this.ContactoModel.Puntaje

    )
  }

  sumaRubros() {
    this.total = parseInt(this.ContactoModels[this.first].Interpretacion1) + parseInt(this.ContactoModels[this.first].Creatividad1)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion1) + parseInt(this.ContactoModels[this.first].Extra1)
      + parseInt(this.ContactoModels[this.first].Interpretacion2) + parseInt(this.ContactoModels[this.first].Creatividad2)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion2) + parseInt(this.ContactoModels[this.first].Extra2)
      + parseInt(this.ContactoModels[this.first].Interpretacion3) + parseInt(this.ContactoModels[this.first].Creatividad3)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion3) + parseInt(this.ContactoModels[this.first].Extra3)
      + parseInt(this.ContactoModels[this.first].Interpretacion4) + parseInt(this.ContactoModels[this.first].Creatividad4)
      + parseInt(this.ContactoModels[this.first].ImagenCaracterizacion4) + parseInt(this.ContactoModels[this.first].Extra4);
  }

  setState() {
    console.log("estamos en el change");




  }



}
interface valuefilter {
  name: string;
  code: string;
}