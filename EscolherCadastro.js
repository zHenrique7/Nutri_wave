import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EscolherCadastro({ navigation }) {
  return (
    <LinearGradient
      colors={['#4cf54cff', '#3b5bdb', '#36c736ff']}
      style={styles.gradient}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.box}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Selecione o tipo de usuário</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cadastro', { tipo: 'nutricionista' })}
          >
            <Text style={styles.buttonText}>Sou Nutricionista</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#3b5bdb' }]}
            onPress={() => navigation.navigate('Cadastro', { tipo: 'paciente' })}
          >
            <Text style={styles.buttonText}>Sou paciente</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Voltar</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#23c73eff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#40f31cff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#04e90fff',
  },
});
