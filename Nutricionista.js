import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableWithoutFeedback
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Necessário para animação no Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Nutricionista({ navigation, route }) {

  const nomeNutri = route.params?.nome || "Nutricionista";

  const [menuAtivo, setMenuAtivo] = useState(false);

  const [pacientes, setPacientes] = useState([
    { id: '1', nome: 'João', usuario: 'joao01' },
    { id: '2', nome: 'Maria', usuario: 'mariaa' }
  ]);

  const adicionarPaciente = () => {
    fecharMenu();
    navigation.navigate('IncluirPaciente', {
      addPaciente: (novoPaciente) => {
        setPacientes([...pacientes, novoPaciente]);
      }
    });
  };

  const gerenciarPacientes = () => {
    fecharMenu();
    Alert.alert("Em breve", "Tela de gerenciamento 😁");
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const abrirFecharMenu = () => {
    LayoutAnimation.easeInEaseOut();
    setMenuAtivo(!menuAtivo);
  };

  const fecharMenu = () => {
    if (menuAtivo) {
      LayoutAnimation.easeInEaseOut();
      setMenuAtivo(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={fecharMenu}>
      <LinearGradient
        colors={['#0BA360', '#3CBA92', '#3CD3AD']}
        style={styles.gradient}
      >
        <View style={styles.container}>

          <View style={styles.headerBox}>
            <Text style={styles.header}>Bem-vindo, {nomeNutri} 👋</Text>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={abrirFecharMenu}
            >
              <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
          </View>

          {/* ================= MENU EXPANDÍVEL ================= */}
          {menuAtivo && (
            <View style={styles.menuContent}>
              <TouchableOpacity style={styles.menuItem} onPress={adicionarPaciente}>
                <Text style={styles.menuText}>Adicionar Paciente</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={gerenciarPacientes}>
                <Text style={styles.menuText}>Gerenciar Pacientes</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.subtitulo}>Seus Pacientes</Text>

          <FlatList
            data={pacientes}
            keyExtractor={(item) => item.id}
            style={styles.lista}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => Alert.alert("Em breve", "Tela do paciente 😁")}
              >
                <Text style={styles.nomePaciente}>{item.nome}</Text>
                <Text style={styles.usuarioPaciente}>Usuário: {item.usuario}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.logout} onPress={logout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitulo: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 12,
  },
  menuButton: {
    backgroundColor: '#00A185',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },

  // ===== MENU EXPANDÍVEL =====
  menuContent: {
    backgroundColor: '#ffffffCC',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  menuItem: {
    backgroundColor: '#3CBA92',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  lista: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 4,
  },
  nomePaciente: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0BA360',
  },
  usuarioPaciente: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  logout: {
    backgroundColor: '#FF7373',
    padding: 12,
    borderRadius: 12,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
