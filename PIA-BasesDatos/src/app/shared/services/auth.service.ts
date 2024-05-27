import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData: any;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private firestore: AngularFirestore
  ) {
    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isLoggedInSubject.next(true); // Notificar que el usuario ha iniciado sesión correctamente
      } else {
        localStorage.setItem('user', 'null');
        this.isLoggedInSubject.next(false); // Notificar que el usuario ha cerrado sesión correctamente
      }
    });

  }

  signUpWithEmailAndPassword(email: string, password: string, nombre: string, rol: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Actualiza los datos del usuario en Firestore
        this.updateUserData(nombre, email, rol);
        this.observeUserState();
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
      });
  }

  // Función para actualizar los datos del usuario en Firestore
  private async updateUserData(nombre: string, email: string, rol: string) {
    const user = await this.firebaseAuthenticationService.currentUser;
    if (user) {
      const userData = {
        nombre: nombre,
        email: email,
        rol: rol
      };
      return this.firestore.collection('usuarios').doc(user.uid).set(userData);
    } else {
      console.error('Error: Usuario no encontrado.');
      return Promise.reject('Usuario no encontrado.');
    }
  }
  


/*
  updateUserData(user: any) {
    // Guardar datos adicionales en Firestore
    return this.firestore.collection('users').doc(user.uid).set({
      email: user.email,
      // Puedes agregar más campos aquí si es necesario
    });
  }*/


  // log-in with email and password
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  // log-in with google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);
      })
  }

  /*signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }*/

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.isLoggedInSubject.next(false); // Notificar que el usuario ha cerrado sesión correctamente
      this.router.navigate(['login']);
    })
  }


  isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

}