import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, AsyncStorage, Image,
} from 'react-native';
import styles from './loginStyle.js';
import logo from './route.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      errorMessage: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  handleUsername = (text) => {
    this.setState({
      user: text,
    });
  };

  handlePassword = (text) => {
    this.setState({
      pass: text,
    });
  };

  focusNextField(id) {
    this.inputs[id].focus();
  }

  validateUsername() {
    const { user } = this.state;
    if (user.includes('@') && user.includes('.com')) {
      return null;
    }
    this.setState({
      errorMessage: 'Please enter a valid email.',
    });
  }

  handleSubmit(user, pass) {
    const { navigation } = this.props;
    const LOGIN = `https://b199aed0-ba7a-4eaa-89b1-6842bd35b436.mock.pstmn.io/driver/token?username=${user}&password=${pass}`;
    return fetch(LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((myJSON) => {
        console.log(JSON.stringify(myJSON));
        const obj = {
          token: myJSON.token,
        };
        if (obj.token === undefined) {
          this.setState({
            errorMessage: 'Invalid username or password.',
          });
        } else {
          AsyncStorage.setItem('token', JSON.stringify(obj));
          navigation.navigate('App');
        }
      })
      .catch((err) => {
        this.setState({
          errorMessage: 'Invalid username or password.',
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}> Ride Share</Text>
          </View>
          <View style={styles.image}>
            <Image source={logo} />
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.formTitle}>Sign in</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <TextInput
              autoCapitalize="none"
              blurOnSubmit={false}
              style={styles.textInput}
              placeholder="Username"
              value={this.state.username}
              onChangeText={this.handleUsername}
              onSubmitEditing={() => {
                this.validateUsername();
                this.focusNextField('two');
              }}
            />
          </View>
          <View style={styles.sectionContainer}>
            <TextInput
              secureTextEntry
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.handlePassword}
              onSubmitEditing={() => {
                this.handleSubmit(this.state.user, this.state.pass);
              }}
              ref={(input) => {
                this.inputs.two = input;
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.submitContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.handleSubmit(this.state.user, this.state.pass)}
              >
                <Text style={styles.submitButtonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
