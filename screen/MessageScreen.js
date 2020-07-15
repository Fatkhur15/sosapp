/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Fire from '../Fire';
import ImagePicker from 'react-native-image-crop-picker';

// const firebase = require('firebase');
require('firebase/firestore');

export default class PostScreen extends React.Component {
  state = {
    text: this.props.navigation.state.params.texdesc,
    image: this.props.navigation.state.params.img,
    keys: this.props.navigation.state.params.kunci,
    status: 0,
  };
  handleEdit = () => {
    // Fire.shared.createdata();
    Fire.shared
      .editPost({
        text: this.state.text.trim(),
        keys: this.state.keys,
        status: this.state.status,
        localuri: this.state.image,
      })
      .then(ref => {
        this.setState({
          text: '',
          image: null,
          keys: '',
        });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error.serverResponse);
      });
  };
  pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({
        image: image.path,
        status: 1,
      });
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#D8D9DB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleEdit}>
            <Text style={{fontWeight: '500'}}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/Hima.jpg')} style={styles.avatar} />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{flex: 1}}
            placeholder="Want to share something?"
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Icon name="camera" size={32} color="#D8D9DB" />
        </TouchableOpacity>
        <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
          <Image
            source={{uri: this.state.image}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});
