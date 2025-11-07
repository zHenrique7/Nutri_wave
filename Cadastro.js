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

export default function Cadastro({ navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacao, setConfirmacao] = useState('');

    const cadastrar = () => {
        if (!nome || !email || !senha || !confirmacao) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        if (senha !== confirmacao) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }

        Alert.alert(
            'Sucesso!',
            `Nutricionista ${nome} cadastrado com sucesso!`
        );

        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={['#0BA360', '#3CBA92', '#3CD3AD']}
            style={styles.gradient}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.container]}
                enableOnAndroid={true}
                extraScrollHeight={60}
                extraHeight={80}
                enableAutomaticScroll={true}
            >

                <View style={styles.loginBox}>
                    <Image
                        source={require('./assets/Images/Nutriwave.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>Criar Conta</Text>
                    <Text style={styles.subtitle}>
                        Cadastro para Nutricionista
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        placeholderTextColor="#999"
                        value={nome}
                        onChangeText={setNome}
                    />

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
        paddingHorizontal: 40,
        paddingTop: 30,
        paddingBottom: 20
    },
    loginBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 8,
        marginBottom: 50
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#23c73eff',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 13,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#40f31cff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    link: {
        color: '#04e90fff',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 5,
    },
});
