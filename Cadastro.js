import React, { useState } from 'react';
import { Image } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Cadastro({ navigation, route }) {
    const tipo = route.params?.tipo; // Recebe "paciente" ou "nutricionista"

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacao, setConfirmacao] = useState('');

    // Campos extras para paciente
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');

    const cadastrar = () => {
        if (!nome || !email || !senha || !confirmacao) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        if (senha !== confirmacao) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }

        // Validações extras para paciente
        if (tipo === 'paciente') {
            if (!peso || !altura) {
                Alert.alert('Erro', 'Preencha peso e altura!');
                return;
            }

            // Validações simples
            if (isNaN(peso) || isNaN(altura)) {
                Alert.alert('Erro', 'Peso e altura devem ser números!');
                return;
            }
        }

        Alert.alert(
            'Sucesso!',
            `${tipo === 'paciente' ? 'Paciente' : 'Nutricionista'} ${nome} cadastrado com sucesso!`
        );

        navigation.goBack(); // Volta para login
    };

    return (
        <LinearGradient
            colors={['#4cf54cff', '#3b5bdb', '#36c736ff']}
            style={styles.gradient}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.container]}
                enableOnAndroid={true}
                extraScrollHeight={80}
                extraHeight={120}
                enableAutomaticScroll={true}
            >
                <View style={styles.loginBox}>
                    <Image
                        source={require('./assets/Images/Nutriwave.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>Criar Conta</Text>
                    <Text style={styles.subtitle}>
                        Cadastre-se como {tipo === 'paciente' ? 'Paciente' : 'Nutricionista'}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        placeholderTextColor="#999"
                        value={nome}
                        onChangeText={setNome}
                    />

                    {tipo === 'paciente' && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Peso (kg)"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                value={peso}
                                onChangeText={setPeso}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Altura (cm)"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                value={altura}
                                onChangeText={setAltura}
                            />
                        </>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={confirmacao}
                        onChangeText={setConfirmacao}
                    />

                    {/* Campos extras do paciente */}


                    <TouchableOpacity style={styles.button} onPress={cadastrar}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.link}>Já possui conta? Fazer login</Text>
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
        paddingHorizontal: 50,
        paddingTop: 50,
    },
    loginBox: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#23c73eff',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 25,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#40f31cff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#04e90fff',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 5,
        resizeMode: 'contain',
    },
});
