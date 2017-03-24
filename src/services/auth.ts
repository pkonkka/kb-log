
import firebase from 'firebase';

export class AuthService {

    // ------------------------------------------------------------------
    getCurrentUser(): firebase.User {
        return firebase.auth().currentUser;
    }

    // ------------------------------------------------------------------
    login(email: string, password: string): firebase.Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    // ------------------------------------------------------------------
    logout(): firebase.Promise<any> {
        return firebase.auth().signOut();
    }

    // ------------------------------------------------------------------
    sendPasswordResetEmail(email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    // ------------------------------------------------------------------
    signup(email: string, password: string): firebase.Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    // ------------------------------------------------------------------
    updateEmail(newEmail: string): firebase.Promise<any> {
        return firebase.auth().currentUser.updatePassword(newEmail);
    }

    // ------------------------------------------------------------------
    updatePassword(newPassword: string): firebase.Promise<any> {
        return firebase.auth().currentUser.updatePassword(newPassword);
    }

}