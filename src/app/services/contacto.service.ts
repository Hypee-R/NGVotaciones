import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {  collection, addDoc,  deleteDoc, doc, updateDoc, DocumentData, CollectionReference,  QuerySnapshot, getDocs, getFirestore, onSnapshot, setDoc,  } from 'firebase/firestore';
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

  async updatecontacto(docId: string, Lugar: string,Personaje: string) {
    const docRef = doc(this.db, 'regVotacines', docId);
    await updateDoc(docRef, { Lugar,Personaje })
   return this.toastr.warning('Registro Actualizado con exito!!','Actualizacion');
  }


    getcontactos(){
      const contactosCollection = collection(this.firestore, 'mensajesContacto');
      return collectionData(contactosCollection);
    }



    async getContactos() {
      const snapshot = await getDocs(this.contactoCol);
      return snapshot;
    }
    

  }
