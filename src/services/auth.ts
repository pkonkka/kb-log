
import firebase from 'firebase';

export class AuthService {

    // ------------------------------------------------------------------
    geCurrentUser() {
        return firebase.auth().currentUser;
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
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    // ------------------------------------------------------------------
    updateEmail(newEmail: string) {
        return firebase.auth().currentUser.updatePassword(newEmail);
    }

    // ------------------------------------------------------------------
    updatePassword(newPassword: string) {
        return firebase.auth().currentUser.updatePassword(newPassword);
    }

}