import React, {Component} from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import imgLogin from '../../../assets/imgs/login.jpg';
import commonStyles from '../../commonStyles';
import AuthInput from '../../components/AuthInput';

import {server, showError, showSuccess} from '../../common';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  stageNew: false,
};

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      this.signup();
    } else {
      this.signin();
    }
  };

  signin = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password,
      });
      axios.defaults.headers.common['Authorization'] = `bearer ${
        res.data.token
      }`;
      AsyncStorage.setItem('userData', JSON.stringify(res.data));

      this.props.navigation.navigate('Home', res.data);
    } catch (error) {
      showError(error);
    }
  };

  signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });

      showSuccess('Usuário Cadastrado!');
      this.setState({...initialState});
    } catch (error) {
      showError(error);
    }
  };

  render() {
    const validations = [];

    validations.push(this.state.email && this.state.email.includes('@'));
    validations.push(this.state.password && this.state.password.length >= 6);

    if (this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim().length >= 3);
      validations.push(this.state.confirmPassword === this.state.password);
    }

    const validForm = validations.reduce((t, a) => t && a);
    return (
      <ImageBackground source={imgLogin} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>
          {this.state.stageNew && (
            <AuthInput
              placeholder="Nome"
              icon="user"
              value={this.state.name}
              style={styles.input}
              onChangeText={text => this.setState({name: text})}
            />
          )}
          <AuthInput
            placeholder="E-mail"
            icon="at"
            value={this.state.email}
            style={styles.input}
            onChangeText={text => this.setState({email: text})}
          />
          <AuthInput
            placeholder="Senha"
            icon="lock"
            value={this.state.password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
          />
          {this.state.stageNew && (
            <AuthInput
              placeholder="Confirmar Senha"
              icon="lock"
              value={this.state.confirmPassword}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={text => this.setState({confirmPassword: text})}
            />
          )}
          <TouchableOpacity
            onPress={() => this.signinOrSignup()}
            disabled={!validForm}>
            <View
              style={[
                styles.button,
                validForm ? {} : {backgroundColor: '#AAA'},
              ]}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            this.setState({stageNew: !this.state.stageNew});
          }}>
          <Text style={styles.buttonText}>
            {this.state.stageNew
              ? 'Já possui conta?'
              : 'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: commonStyles.colors.secundary,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 20,
  },
});
