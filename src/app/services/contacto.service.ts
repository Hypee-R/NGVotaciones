import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {  collection, addDoc,  deleteDoc, doc, updateDoc, DocumentData, CollectionReference,  QuerySnapshot, getDocs, getFirestore, onSnapshot, setDoc, orderBy,query, where  } from 'firebase/firestore';
import { ContactoModel } from '../models/contacto.model';
import { VariablesService } from './variablesGL.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  db: Firestore;
  contactoCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  listaNominaciones: [] = [];

  constructor(
    private toastr: ToastrService,
    private firestore: Firestore,
    private afs: Firestore,
    private variablesGL: VariablesService,
  ){
    this.db = getFirestore();
    this.contactoCol = collection(this.db, 'regVotacines');
   // Get Realtime Data
   onSnapshot(this.contactoCol, (snapshot) => {
    this.updatedSnapshot.next(snapshot);
  }, (err) => {
    console.log(err);
  })
  }

  getVotaciones(){
    const contactosCollection = collection(this.firestore, 'regVotacines');
    return collectionData(query(contactosCollection, orderBy("id", "asc")));
  }
  getVotacionesFiltro(){
    const contactosCollection = collection(this.firestore, 'regVotacines');
    return collectionData(query(contactosCollection,where("Categoria", "==", "Infantil"), orderBy("id", "asc")));
    // this.juesesCol = query(collection(this.db, 'usuarios'), where("rol", "==", "juez"))
  }

  async addVotacines(contacto: ContactoModel){
    await setDoc(doc(this.afs, "regVotacines", contacto.id), contacto).then(docRef => {
      console.log('El Registro se grabo con el ID: ', contacto.id);
      this.variablesGL.endProcessNominacion.next(contacto.id);
    })
    .catch(error => {
      console.log('EL Registro no se grabo: ', error);
      this.variablesGL.endProcessNominacion.next('');
    });
    
  }

  async addVotacinesRegistro(contacto: ContactoModel){
    await addDoc(collection(this.afs,'regVotacinesPrueba'), contacto)
    .then(docRef => {
      console.log('El Registro se grabo con el ID: ', docRef.id);
      this.variablesGL.endProcessNominacion.next(docRef.id);
    })
    .catch(error => {
      console.log('EL Registro no se grabo: ', error);
      this.variablesGL.endProcessNominacion.next('');
    });
  }
  async addcontacto(contacto: ContactoModel) {
    await setDoc(doc(this.afs, "regVotacinesPrueba", contacto.id), contacto).then(docRef => {
      console.log('El Registro se grabo con el ID: ', contacto.id);
      this.variablesGL.endProcessNominacion.next(contacto.id);
    })
    .catch(error => {
      console.log('EL Registro no se grabo: ', error);
      this.variablesGL.endProcessNominacion.next('');
    });
    
    return this.toastr.success('Registro Guardado  con exito!!', 'Exito');
  }

  async deletecontacto(docId: string) {
    const docRef = doc(this.db, 'regVotacines', docId)
   await deleteDoc(docRef);
   return    this.toastr.error('Registro Eliminado con exito!!','Advertencia');
  }

  async updatecontacto(docId: string, Lugar: string,Personaje:string,RubroA:string,RubroB:string ,RubroC:string ,RubroD:string ,Folio:string,RubroA2:string,RubroB2:string ,RubroC2:string ,RubroD2:string,RubroA3:string,RubroB3:string ,RubroC3:string ,RubroD3:string,RubroA4:string,RubroB4:string ,RubroC4:string ,RubroD4:string,Puntaje:number) {
    console.log(Puntaje)
    const docRef = doc(this.db, 'regVotacines', docId);
    await updateDoc(docRef, { Lugar,Personaje,RubroA,RubroB,RubroC,RubroD,Folio,RubroA2,RubroB2,RubroC2,RubroD2,RubroA3,RubroB3,RubroC3,RubroD3,RubroA4,RubroB4,RubroC4,RubroD4,Puntaje})
    return this.toastr.success('Registro Guardado con exito!!','Exito');
  }

  async updatecontactoLugarPersonaje(docId: string, Lugar: string,Personaje:string ) {
    const docRef = doc(this.db, 'regVotacines', docId);
    await updateDoc(docRef, { Lugar,Personaje})
    return this.toastr.success('Registro Guardado con exito!!','Exito');
  }

    getcontactos(){
      const contactosCollection = collection(this.firestore, 'mensajesContacto');
      return collectionData(query(contactosCollection, orderBy("id", "asc")));
    }



    async getContactos() {
      const snapshot = await getDocs(this.contactoCol);
      return snapshot;
    }
    getVotacionesFiltrotest(){
      const contactosCollection = collection(this.firestore, 'regVotacines');
      return collectionData(query(contactosCollection,where("Categoria", "==", "Infantil"), orderBy("id", "asc")));
      // this.juesesCol = query(collection(this.db, 'usuarios'), where("rol", "==", "juez"))
    }
  
    
    async getContactosFiltro(filtro:any) {
      const contactosCollection = collection(this.firestore, 'regVotacines');
      const q = query(contactosCollection,where("Categoria", "==", filtro), orderBy("id", "asc"));
      const snapshot = await getDocs(q);
      
      return snapshot;
    }
    


  }
