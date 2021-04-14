import React, {Component} from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import imgLogin from '../../../assets/imgs/login.jpg';
import commonStyles from '../../commonStyles';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      stageNew: false,
    };
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      Alert.alert('Sucesso!', 'Criar Conta!');
    } else {
      Alert.alert('Sucesso!', 'Logar');
    }
  };

  render() {
    return (
      <ImageBackground source={imgLogin} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>
          {this.state.stageNew && (
            <TextInput
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChangeText={text => this.setState({name: text})}
            />
          )}
          <TextInput
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={text => this.setState({email: text})}
          />
          <TextInput
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
          />
          {this.state.stageNew && (
            <TextInput
              placeholder="Confirmar Senha"
              value={this.state.confirmPassword}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={text => this.setState({confirmPassword: text})}
            />
          )}
          <TouchableOpacity onPress={() => this.signinOrSignup()}>
            <View style={styles.button}>
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
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 20,
  },
});
