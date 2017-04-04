// ----------------------------------------------------------------------
//
//  Firebase authentication service
//
// ----------------------------------------------------------------------
import firebase from 'firebase';

export class AuthService {

    // ------------------------------------------------------------------
    getCurrentUser(): firebase.User {
        return firebase.auth().currentUser;
    }

    // ------------------------------------------------------------------
    getCurrentUserProfile() {
        const user = firebase.auth().currentUser;
        
        if (user) {
            let userProfile = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
                uid: user.uid
            }
            return userProfile;            
        }
        return null;
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
    sendEmailVerification(): firebase.Promise<any> {
        const user= firebase.auth().currentUser;
        return user.sendEmailVerification();
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

    // ------------------------------------------------------------------
    updateProfile(displayName: string, photoUrl: string): firebase.Promise<any> {

        const user = firebase.auth().currentUser;      
   
        return user.updateProfile({
            displayName: displayName,
            photoURL: photoUrl
        });

    }


}