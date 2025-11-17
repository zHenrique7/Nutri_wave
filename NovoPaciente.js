import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// Cores do gradiente do nutricionista com 50% de opacidade
const GRADIENT_COLORS = ['#3CBA9220', '#3CD3AD20', '#FFFFFF'];


// --- COMPONENTE MODAL (ADAPTADO PARA SUCESSO OU ERRO) ---
const CustomModal = ({ isVisible, onClose, message, isSuccess }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
                <Ionicons
                    name={isSuccess ? "checkmark-circle" : "alert-circle"}
                    size={40}
                    color={isSuccess ? "#27ae60" : "#e74c3c"} // Verde para sucesso, Vermelho para erro
                    style={{ marginBottom: 10 }}
                />
                < Text style={modalStyles.modalText} > {message} </Text>
                < TouchableOpacity
                    style={[modalStyles.buttonClose, { backgroundColor: isSuccess ? "#27ae60" : "#e74c3c" }]}
                    onPress={onClose}
                >
                    <Text style={modalStyles.textStyle}> Fechar </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);




// Função para formatar a data automaticamente (DD/MM/AAAA)
const formatDate = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');


    if (cleaned.length > 8) {
        cleaned = cleaned.substring(0, 8);
    }

    let formattedText = cleaned;

    if (cleaned.length > 2) {
        formattedText = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
    }


    if (cleaned.length > 4) {
        formattedText = formattedText.substring(0, 5) + '/' + formattedText.substring(5);
    }


    return formattedText;
};




// --- COMPONENTE PRINCIPAL ---
export default function NovoPaciente({ navigation }) {
    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascText, setDataNascText] = useState('');


    // Novos Estados para Validação e Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    // Estado para rastrear campos com erro (chaves: 'nome', 'peso', etc.)
    const [errorFields, setErrorFields] = useState({});

    // Função de Validação
    const validarCampos = () => {
        const errors = {};

        if (!nome.trim()) errors.nome = true;
        if (!dataNascText.trim()) errors.dataNascText = true;
        if (!peso.trim()) errors.peso = true;
        if (!altura.trim()) errors.altura = true;
        if (!objetivo.trim()) errors.objetivo = true;

        // Validação simples de e-mail (opcional)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) errors.email = true;


        setErrorFields(errors);
        return Object.keys(errors).length === 0;
    };




    const cadastrarPaciente = () => {
        if (!validarCampos()) {
            // Se houver erros de validação
            setIsModalSuccess(false);
            setModalMessage("Campos incorretos ou vazios! Por favor, verifique os campos destacados em vermelho.");
            setModalVisible(true);
            return;
        }


        // Se a validação passar (SUCESSO)
        setIsModalSuccess(true);
        setModalMessage(`Paciente ${nome} cadastrado com sucesso!`);
        setModalVisible(true);
    };


    const closeModal = () => {
        setModalVisible(false);
        if (isModalSuccess) {
            // Só navega de volta se o cadastro foi um sucesso
            navigation.goBack();
        }
    }




    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            style={styles.gradient}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                enableOnAndroid={true}
                extraScrollHeight={80}
                enableAutomaticScroll={true}
            >

                {/* Botão Voltar */}
                < TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()
                }>
                    <Ionicons name="arrow-back" size={22} color="#000" />
                    <Text style={styles.backText}> Voltar </Text>
                </TouchableOpacity>


                {/* CAIXA BRANCA CENTRALIZADA */}
                <View style={styles.contentBox}>
                    <Text style={styles.title}> Cadastrar Paciente </Text>


                    {/* Campo Nome */}
                    <TextInput
                        placeholder="Nome Completo"
                        placeholderTextColor="#999"
                        value={nome}
                        onChangeText={setNome}
                        style={
                            [
                                styles.input,
                                errorFields.nome && styles.errorBorder // <--- ESTILO CONDICIONAL
                            ]}
                    />


                    {/* CAMPO DATA DE NASCIMENTO */}
                    < TextInput
                        placeholder="Data de Nascimento (DD/MM/AAAA)"
                        placeholderTextColor="#999"
                        value={dataNascText}
                        onChangeText={(text) => setDataNascText(formatDate(text))}
                        keyboardType="number-pad"
                        maxLength={10}
                        style={
                            [
                                styles.input,
                                errorFields.dataNascText && styles.errorBorder // <--- ESTILO CONDICIONAL
                            ]}
                    />

                    {/* Campos Peso e Altura */}
                    < TextInput
                        placeholder="Peso Inicial (kg)"
                        placeholderTextColor="#999"
                        value={peso}
                        onChangeText={setPeso}
                        keyboardType="numeric"
                        style={
                            [
                                styles.input,
                                errorFields.peso && styles.errorBorder
                            ]}
                    />
                    <TextInput
                        placeholder="Altura (cm)"
                        placeholderTextColor="#999"
                        value={altura}
                        onChangeText={setAltura}
                        keyboardType="numeric"
                        style={
                            [
                                styles.input,
                                errorFields.altura && styles.errorBorder
                            ]}
                    />
                    <TextInput
                        placeholder="Objetivo (Ex: Perder peso)"
                        placeholderTextColor="#999"
                        value={objetivo}
                        onChangeText={setObjetivo}
                        style={
                            [
                                styles.input,
                                errorFields.objetivo && styles.errorBorder
                            ]}
                    />

                    {/* Campo E-mail */}
                    < TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={
                            [
                                styles.input,
                                errorFields.email && styles.errorBorder
                            ]}
                    />

                    <TouchableOpacity style={styles.button} onPress={cadastrarPaciente} >
                        <Text style={styles.buttonText}> Cadastrar </Text>
                    </TouchableOpacity>


                </View>
            </KeyboardAwareScrollView>

            {/* RENDERIZAR O MODAL CUSTOMIZADO */}
            <CustomModal
                isVisible={modalVisible}
                onClose={closeModal}
                message={modalMessage}
                isSuccess={isModalSuccess}
            />

        </LinearGradient>
    );
}


// ------------------ ESTILOS DO MODAL -------------------


const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: Dimensions.get('window').width * 0.8,
    },
    buttonClose: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});


// ------------------ ESTILOS PRINCIPAIS -------------------
const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        paddingBottom: 20, // Garante que a caixa não fique cortada na parte inferior
    },
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    backText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: "600",
        color: '#000',
    },
    contentBox: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 8,
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#23c73eff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1, // Borda padrão
        borderColor: '#ddd', // Cor da borda padrão
    },
    // NOVO ESTILO PARA CAMPOS COM ERRO
    errorBorder: {
        borderColor: '#e74c3c', // Vermelho para erros
        borderWidth: 2,
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
});

