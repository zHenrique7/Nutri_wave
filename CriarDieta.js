import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Export default com o mesmo nome (opcional) — mas export default é obrigatório
export default function CriarDieta({ route, navigation }) {
  const { paciente } = route.params || { paciente: { nome: "Paciente", objetivo: "" } };

  const [refeicoes, setRefeicoes] = useState([
    { id: Date.now(), tipo: "Café da manhã", horario: "08:00", alimentos: [], observacoes: "" },
  ]);
  const [observacoesGerais, setObservacoesGerais] = useState("");

  const adicionarRefeicao = () => {
    const nova = { id: Date.now() + Math.random(), tipo: "Refeição", horario: "", alimentos: [], observacoes: "" };
    setRefeicoes((prev) => [...prev, nova]);
  };

  const adicionarAlimento = (idRefeicao) => {
    setRefeicoes((prev) =>
      prev.map((r) =>
        r.id === idRefeicao
          ? { ...r, alimentos: [...r.alimentos, { id: Date.now() + Math.random(), nome: "", quantidade: "", calorias: "" }] }
          : r
      )
    );
  };

  const atualizarAlimento = (idRefeicao, idAlimento, campo, valor) => {
    setRefeicoes((prev) =>
      prev.map((r) =>
        r.id === idRefeicao
          ? { ...r, alimentos: r.alimentos.map((a) => (a.id === idAlimento ? { ...a, [campo]: valor } : a)) }
          : r
      )
    );
  };

  const removerAlimento = (idRefeicao, idAlimento) => {
    setRefeicoes((prev) =>
      prev.map((r) => (r.id === idRefeicao ? { ...r, alimentos: r.alimentos.filter((a) => a.id !== idAlimento) } : r))
    );
  };

  const enviarDieta = () => {
    const dieta = { paciente, refeicoes, observacoesGerais };
    console.log("Dieta enviada:", dieta);
    // aqui você pode salvar em AsyncStorage / chamar API
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Criar Dieta para {paciente.nome}</Text>
      <Text style={styles.subtitulo}>Objetivo: {paciente.objetivo || "—"}</Text>

      <View style={styles.bloco}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.tituloSessao}>Refeições</Text>
          <TouchableOpacity style={styles.btnAddRefeicao} onPress={adicionarRefeicao}>
            <Text style={styles.btnAddText}>+ Adicionar Refeição</Text>
          </TouchableOpacity>
        </View>

        {refeicoes.map((ref) => (
          <View key={String(ref.id)} style={styles.cardRefeicao}>
            <TextInput
              style={styles.input}
              placeholder="Tipo de refeição"
              value={ref.tipo}
              onChangeText={(txt) => setRefeicoes((prev) => prev.map((r) => (r.id === ref.id ? { ...r, tipo: txt } : r)))}
            />

            <TextInput
              style={styles.input}
              placeholder="Horário (ex: 08:00)"
              value={ref.horario}
              onChangeText={(txt) => setRefeicoes((prev) => prev.map((r) => (r.id === ref.id ? { ...r, horario: txt } : r)))}
            />

            <Text style={styles.label}>Alimentos</Text>

            {ref.alimentos.map((a) => (
              <View key={String(a.id)} style={styles.linhaAlimento}>
                <TextInput
                  style={[styles.inputMenor, { flex: 2 }]}
                  placeholder="Alimento"
                  value={a.nome}
                  onChangeText={(txt) => atualizarAlimento(ref.id, a.id, "nome", txt)}
                />
                <TextInput
                  style={[styles.inputMenor, { flex: 1 }]}
                  placeholder="Qtd"
                  value={a.quantidade}
                  onChangeText={(txt) => atualizarAlimento(ref.id, a.id, "quantidade", txt)}
                />
                <TextInput
                  style={[styles.inputMenor, { flex: 1 }]}
                  placeholder="Kcal"
                  value={a.calorias}
                  onChangeText={(txt) => atualizarAlimento(ref.id, a.id, "calorias", txt)}
                />
                <TouchableOpacity onPress={() => removerAlimento(ref.id, a.id)}>
                  <Text style={styles.excluir}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.btnAddItem} onPress={() => adicionarAlimento(ref.id)}>
              <Text style={styles.btnAddText}>+ Adicionar Alimento</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.inputObs}
              placeholder="Observações da refeição..."
              multiline
              value={ref.observacoes}
              onChangeText={(txt) => setRefeicoes((prev) => prev.map((r) => (r.id === ref.id ? { ...r, observacoes: txt } : r)))}
            />
          </View>
        ))}
      </View>

      <View style={styles.bloco}>
        <Text style={styles.tituloSessao}>Observações Gerais</Text>
        <TextInput
          style={styles.inputObsGrande}
          placeholder="Restrições, substituições, orientações gerais..."
          multiline
          value={observacoesGerais}
          onChangeText={setObservacoesGerais}
        />
      </View>

      <TouchableOpacity style={styles.btnEnviar} onPress={enviarDieta}>
        <Text style={styles.btnEnviarText}>📤 Enviar Dieta ao Paciente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F3"
  },

  voltar: {
    fontSize: 16,
    color: "#1976D2",
    padding: 16
  },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16
  },

  subtitulo: {
    color: "#444",
    paddingHorizontal: 16,
    paddingBottom: 8

  },

  bloco: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 10
  },

  tituloSessao: {
    fontSize: 16,
    fontWeight: "700"
  },
  btnAddRefeicao: {
    backgroundColor: "#1976D2",
    padding: 8,
    borderRadius: 8
  },
  btnAddText: {
    color: "#fff",
    fontWeight: "700"
  },
  cardRefeicao: {
    backgroundColor: "#eef3ee",
    padding: 12,
    borderRadius: 8,
    marginTop: 12
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginTop: 8
  },
  inputMenor: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    margin: 6
  },
  label: {
    marginTop: 8,
    fontWeight: "600"
  },
  linhaAlimento: {
    flexDirection: "row",
    alignItems: "center"
  },
  excluir: {
    color: "#d32f2f",
    fontSize: 18,
    paddingHorizontal: 6
  },
  btnAddItem: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 6,
    marginTop: 8
  },
  inputObs: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    minHeight: 60,
    marginTop: 8
  },
  inputObsGrande: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    minHeight: 120
  },
  btnEnviar: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 8
  },
  btnEnviarText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
});
