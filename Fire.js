import FirebaseKeys from './config';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
class Fire {
  constructor() {
    console.log(FirebaseKeys);
    firebase.initializeApp(FirebaseKeys);
  }
  createdata = async () => {
    // Add a new document with a generated id.
    console.log('cliked');
    firebase
      .firestore()
      .collection('cities')
      .add({
        name: 'Tokyo',
        country: 'Japan',
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
  addPost = async ({text, localuri}) => {
    console.log('clicked post');
    const remoteUri = await this.uploadPhotoAsync(localuri);
    return new Promise((res, rej) => {
      this.firestore
        .collection('posts')
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then(ref => {
          res(ref);
          console.log('berhasil');
        })
        .catch(error => {
          rej(error);
          console.log('errornya', error.message);
        });
    });
  };
  uploadPhotoAsync = async uri => {
    const path = 'photos/' + this.uid + '/' + this.timestamp + '.jpg';

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase
        .storage()
        .ref(path)
        .put(file);

      upload.on(
        'state_changed',
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        },
      );
    });
  };

  // get firestore() {
  //   return firebase.firestore();
  // }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
