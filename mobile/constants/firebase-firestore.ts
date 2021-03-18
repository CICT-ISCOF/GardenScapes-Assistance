import firebase from 'firebase'

export default function Collection( collection: any ) {
    return firebase.firestore().collection( collection )
}