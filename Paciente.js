import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Paciente({ navigation }) {
  const [caloriasHoje] = useState(470);
  const metaCalorias = 1420;

  const refeicoes = [
    {
      id: 1,
      tipo: "Café da manhã",
      horario: "08:00",
      alimentos: "Aveia com frutas, 1 banana, Leite desnatado",
      calorias: 320,
      status: "Concluída",
    },
    {
      id: 2,
      tipo: "Lanche da manhã",
      horario: "10:00",
      alimentos: "1 maçã, 10 amêndoas",
      calorias: 150,
      status: "Concluída",
    },
    {
      id: 3,
      tipo: "Almoço",
      horario: "12:30",
      alimentos: "Peito de frango grelhado, Arroz integral, Brócolis",
      calorias: 450,
      status: "Pendente",
    },
    {
      id: 4,
      tipo: "Lanche da tarde",
      horario: "15:30",
      alimentos: "Iogurte natural, 1 colher de mel",
      calorias: 120,
      status: "Pendente",
    },
    {
      id: 5,
      tipo: "Jantar",
      horario: "19:00",
      alimentos: "Salmão grelhado, Batata doce, Aspargos",
      calorias: 380,
      status: "Pendente",
    },
  ];

  return (
    <ScrollView style={styles.container}>

      {/* TOPO COM LOGO + BOTÃO SAIR */}
      <View style={styles.topBar}>
        <Image
           source={require('./assets/Images/Nutriwave.png')}
          style={styles.logo}
        />

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="exit-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Calorias de hoje */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calorias Hoje</Text>
        <Text style={styles.caloriasValor}>{caloriasHoje}</Text>
        <Text style={styles.cardSub}>de {metaCalorias} kcal</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(caloriasHoje / metaCalorias) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Peso atual */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Peso Atual</Text>
        <Text style={styles.caloriasValor}>65 kg</Text>
        <Text style={styles.cardSub}>IMC: 23.9</Text>
      </View>

      {/* Objetivo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Objetivo</Text>
        <Text style={styles.cardSub}>Perder peso</Text>
        <Text style={styles.cardSub}>Meta estabelecida</Text>
      </View>

      {/* Dieta de Hoje */}
      <View style={styles.dietaContainer}>
        <Text style={styles.dietaTitulo}>Dieta de Hoje</Text>

        {refeicoes.map((ref) => (
          <View key={ref.id} style={styles.refeicaoCard}>
            <View style={styles.refeicaoLinha}>
              <Text style={styles.refeicaoTipo}>{ref.tipo}</Text>

              <View
                style={[
                  styles.statusBadge,
                  ref.status === "Concluída"
                    ? styles.statusOk
                    : styles.statusPendente,
                ]}
              >
                <Text style={styles.statusTexto}>{ref.status}</Text>
              </View>
            </View>

            <Text style={styles.refHorario}>{ref.horario}</Text>
            <Text style={styles.refAlimentos}>{ref.alimentos}</Text>

            <View style={styles.refRodape}>
              <Text style={styles.kcalTexto}>{ref.calorias} kcal</Text>

              <TouchableOpacity style={styles.btnRegistrar}>
                <Text style={styles.btnRegistrarTxt}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.btnPlanoCompleto}>
          <Text style={styles.btnPlanoCompletoTxt}>Ver Plano Completo</Text>
        </TouchableOpacity>
      </View>

      {/* Evolução do Peso */}
      <View style={styles.graficoContainer}>
        <Text style={styles.graficoTitulo}>Evolução do Peso</Text>

        <View style={styles.graficoBarras}>
          {[65, 64.5, 64, 63.5, 63, 62.8, 62.5].map((peso, i) => (
            <View key={i} style={styles.barraColuna}>
              <View
                style={[
                  styles.barra,
                  { height: (peso - 60) * 10 },
                ]}
              />
              <Text style={styles.barraLabel}>Sem {i + 1}</Text>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F7F1",
    padding: 10,
  },

  /* LOGO + SAIR */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  logo: {
    width: 150,
    height: 80,
    resizeMode: "contain",
  },

  logoutBtn: {
    padding: 6,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  caloriasValor: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 6,
  },
  cardSub: {
    color: "#444",
  },

  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 20,
    marginTop: 8,
  },
  progressFill: {
    height: 6,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
  },

  dietaContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  dietaTitulo: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  refeicaoCard: {
    backgroundColor: "#F8FBF8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  refeicaoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  refeicaoTipo: {
    fontSize: 15,
    fontWeight: "600",
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusOk: { backgroundColor: "#C8F7C5" },
  statusPendente: { backgroundColor: "#FFE0B2" },
  statusTexto: {
    fontSize: 12,
    fontWeight: "700",
  },

  refHorario: { color: "#333", marginTop: 4 },
  refAlimentos: { marginTop: 4, color: "#444" },

  refRodape: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  kcalTexto: { fontWeight: "700" },

  btnRegistrar: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnRegistrarTxt: { color: "#fff", fontSize: 13 },

  btnPlanoCompleto: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  btnPlanoCompletoTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  graficoContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 30,
  },
  graficoTitulo: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  graficoBarras: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  barraColuna: { alignItems: "center" },

  barra: {
    width: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },

  barraLabel: {
    marginTop: 4,
    fontSize: 11,
  },
});
