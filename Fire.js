import FirebaseKeys from './config';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
// Required for side-effects
require('firebase/firestore');
class Fire {
  constructor() {
    firebase.initializeApp(FirebaseKeys);
  }
  editPost = async ({text, keys, status, localuri}) => {
    console.log('desc = ', text);
    console.log('kunci = ', keys);
    var remoteUri = localuri;
    if (status === 1) {
      remoteUri = await this.uploadPhotoAsync(localuri);
    }
    console.log('clicked edit');
    this.realdatabase
      .ref('posts/' + this.uid)
      .child(keys)
      .update({
        text,
        timestamp: this.timestamp,
        image: remoteUri,
      });
  };
  addPost = async ({text, localuri}) => {
    console.log('clicked post');
    const remoteUri = await this.uploadPhotoAsync(localuri);
    this.realdatabase
      .ref('posts/' + this.uid)
      .push()
      .set({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        image: remoteUri,
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

  get realdatabase() {
    return firebase.database();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
