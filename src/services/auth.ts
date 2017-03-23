
import firebase from 'firebase';

export class AuthService {

    // ------------------------------------------------------------------
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    // ------------------------------------------------------------------
    login(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    // ------------------------------------------------------------------
    logout() {
        firebase.auth().signOut();
    }

    // ------------------------------------------------------------------
    geCurrentUser() {
        return firebase.auth().currentUser;
    }

}