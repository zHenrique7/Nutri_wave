import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalhesPaciente({ route, navigation }) {
  const { paciente } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#333" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      {/* Cabeçalho */}
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.nome}>{paciente.nome}</Text>
          <Text style={styles.idade}>{paciente.idade} anos</Text>
        </View>

        <View
          style={[
            styles.status,
            { backgroundColor: paciente.status === "Ativo" ? "#27ae60" : "#999" },
          ]}
        >
          <Text style={styles.statusText}>{paciente.status}</Text>
        </View>
      </View>

      {/* Dados Pessoais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Peso Atual:</Text>
          <Text style={styles.value}>{paciente.peso} kg</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>IMC:</Text>
          <Text style={styles.value}>{paciente.imc}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Objetivo:</Text>
          <Text style={styles.value}>{paciente.objetivo}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Variação:</Text>
          <Text style={[styles.value, { color: paciente.variacao.includes('-') ? "#27ae60" : "#2980b9" }]}>
            {paciente.variacao}
          </Text>
        </View>
      </View>

      {/* Progresso */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progresso</Text>

        <Text style={styles.label}>Peso inicial: 69 kg</Text>
        <Text style={styles.label}>Progresso total: {paciente.variacao}</Text>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: "30%" }]} />
        </View>

        <Text style={styles.progressText}>Meta mensal: -2.0 kg</Text>
      </View>

      {/* Histórico */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico de Consultas</Text>

        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>Consulta Inicial</Text>
          <Text style={styles.historySub}>Peso: 69 kg | IMC: 25.4</Text>
          <Text style={styles.historyDate}>19/07/2024</Text>
        </View>

        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>Acompanhamento - Semana 2</Text>
          <Text style={styles.historySub}>Peso: 68.2 kg | IMC: 25.1</Text>
          <Text style={styles.historyDate}>07/08/2024</Text>
        </View>

        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>Próxima Consulta</Text>
          <Text style={styles.historySub}>Acompanhamento mensal</Text>
          <Text style={[styles.historyDate, { color: "#2980b9" }]}>28/08/2024 (Agendada)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf7eb",
    padding: 14,
  },

  // Botão de voltar
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
  },

  // Card superior
  headerCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: {
    fontSize: 20,
    fontWeight: "700",
  },
  idade: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  // Seções
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },

  // Barra de progresso
  progressBarBg: {
    height: 10,
    backgroundColor: "#cdd",
    borderRadius: 6,
    marginTop: 10,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#27ae60",
    borderRadius: 6,
  },
  progressText: {
    marginTop: 8,
    fontSize: 12,
    color: "#555",
  },

  // Histórico
  historyItem: {
    marginBottom: 14,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  historySub: {
    fontSize: 13,
    color: "#555",
  },
  historyDate: {
    fontSize: 12,
    marginTop: 4,
  },
});
