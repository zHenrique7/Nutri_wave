import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// RECEBE navigation do React Navigation
export default function NutricionistaDashboard({ navigation }) {

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("M");

  const pacientes = [
    {
      nome: "Ana Silva",
      idade: 28,
      peso: 68.5,
      imc: 25.2,
      objetivo: "Perder peso",
      variacao: "-0.5 kg",
      status: "Ativo",
    },
    {
      nome: "João Santos",
      idade: 35,
      peso: 82.3,
      imc: 26.0,
      objetivo: "Ganho de massa muscular",
      variacao: "+2.2 kg",
      status: "Ativo",
    },
    {
      nome: "Maria Oliveira",
      idade: 42,
      peso: 64,
      imc: 28.6,
      objetivo: "Controle do diabetes",
      variacao: "-5 kg",
      status: "Inativo",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Olá, Dr. Carlos Nutricionista</Text>
        <TouchableOpacity
          style={styles.sairBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.sairText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO NOVO PACIENTE */}
      <View style={styles.newTopContainer}>
        <TouchableOpacity
          style={styles.newTopBtn}
          onPress={() => navigation.navigate("NovoPaciente")}
        >
          <Ionicons name="person-add" size={18} color="#fff" />
          <Text style={styles.newTopText}>Novo Paciente</Text>
        </TouchableOpacity>
      </View>

      {/* Abas */}
      <View style={styles.tabs}>
        {[
          { nome: "Pacientes", tela: "Nutricionista" },
          { nome: "Criar Dieta", tela: "CriarDieta" },
          { nome: "Calculadoras", tela: "Calculadoras" }
          
        ].map((item) => (
          <TouchableOpacity
            key={item.nome}
            style={styles.tabItem}
            onPress={() => navigation.navigate(item.tela)}
          >
            <Text style={styles.tabText}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards de resumo */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Pacientes</Text>
          <Text style={styles.cardValue}>4</Text>
          <Text style={styles.cardSub}>3 ativos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Atualizações Recentes</Text>
          <Text style={styles.cardValue}>0</Text>
          <Text style={styles.cardSub}>Esta semana</Text>
        </View>
      </View>

      {/* Mensagens */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mensagens Pendentes</Text>
        <Text style={styles.cardValue}>3</Text>
        <Text style={styles.cardSub}>Não lidas</Text>
      </View>

      {/* Calculadora rápida */}
      <View style={styles.calcCard}>
        <Text style={styles.cardTitle}>Calculadora Rápida</Text>

        <TextInput
          placeholder="Peso (kg)"
          style={styles.input}
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          placeholder="Altura (cm)"
          style={styles.input}
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TextInput
          placeholder="Idade"
          style={styles.input}
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setSexo("M")}
            style={[styles.sexoBtn, sexo === "M" && styles.sexoSelected]}
          >
            <Text>M</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSexo("F")}
            style={[styles.sexoBtn, sexo === "F" && styles.sexoSelected]}
          >
            <Text>F</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.calcBtn}>
          <Text style={{ color: "#fff" }}>Calcular</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de busca */}
      <TextInput placeholder="Buscar pacientes..." style={styles.search} />

      {/* LISTA DE PACIENTES */}
      {pacientes.map((p, index) => (
        <View style={styles.patientCard} key={index}>
          <View style={styles.rowBetween}>
            <Text style={styles.patientName}>{p.nome}</Text>

            <View
              style={[
                styles.status,
                { backgroundColor: p.status === "Ativo" ? "#27ae60" : "#aaa" },
              ]}
            >
              <Text style={styles.statusText}>{p.status}</Text>
            </View>
          </View>

          <Text style={styles.sub}>{p.idade} anos</Text>

          <View style={styles.rowBetween}>
            <Text>Peso: {p.peso} kg</Text>
            <Text>IMC: {p.imc}</Text>
          </View>

          <Text style={styles.obj}>{p.objetivo}</Text>
          <Text style={styles.var}>{p.variacao}</Text>

          {/* NAVEGAR PARA DETALHES */}
          <TouchableOpacity
            onPress={() => navigation.navigate("DetalhesPaciente", { paciente: p })}
          >
            <Text style={styles.details}>Ver Detalhes</Text>
          </TouchableOpacity>

        </View>
      ))}

    </ScrollView>
  );
}

// ------------------ STYLES -------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf7eb",
    padding: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  sairBtn: {
    backgroundColor: "#333",
    padding: 6,
    borderRadius: 6,
  },
  sairText: { color: "#fff" },

  newTopContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  newTopBtn: {
    flexDirection: "row",
    backgroundColor: "#27ae60",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  newTopText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "600",
  },

  tabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  tabItem: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 6,
    margin: 4,
  },
  tabText: {
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    width: "48%",
    marginVertical: 8,
  },
  cardTitle: {
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "800",
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
  },

  calcCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },

  input: {
    backgroundColor: "#f2f2f2",
    marginVertical: 6,
    borderRadius: 6,
    padding: 8,
  },

  sexoBtn: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 8,
    margin: 4,
    alignItems: "center",
    borderRadius: 6,
  },
  sexoSelected: {
    backgroundColor: "#90ee90",
  },

  calcBtn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },

  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  patientCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  patientName: {
    fontSize: 16,
    fontWeight: "700",
  },
  sub: {
    color: "#555",
  },
  obj: {
    marginTop: 6,
  },
  var: {
    fontSize: 12,
    color: "#27ae60",
  },

  status: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
  },

  details: {
    marginTop: 8,
    color: "#2980b9",
    textAlign: "right",
  },
});
