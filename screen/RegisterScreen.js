/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Entypo';
export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="'light-content" />
        <Image
          source={require('../assets/Group-1.png')}
          style={{marginTop: -150, marginLeft: -90}}
        />
        <Image
          source={require('../assets/Group-2.png')}
          style={{position: 'absolute', bottom: -210, right: -210}}
        />
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: 64,
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.greeting}>
            {'Hello! \nSign Up to get started'}
          </Text>
          <TouchableOpacity style={styles.avatar}>
            <Icon
              name="plus"
              size={40}
              color="#fff"
              style={{marginTop: 6, marginLeft: 2}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={{marginTop: 32}}>
            <View>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{color: '#FFF', fontWeight: '500'}}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 32}}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{color: '#414959', fontSize: 13}}>
              New to SocialApp?{' '}
              <Text style={{fontWeight: '500', color: '#E9446A'}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
  errorMessage: {
    marginTop: 20,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginTop: 30,
    marginHorizontal: 0,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21,22,48,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
