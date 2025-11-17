import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";

export default function DetalhesPaciente({ route, navigation }) {
  const { paciente } = route.params;
    const pesoEvolucao = [
        { data: "21 Jul", peso: 69 },
        { data: "30 Jul", peso: 68.7 },
        { data: "04 Ago", peso: 68.2 },
        { data: "11 Ago", peso: 68 },
        { data: "19 Ago", peso: 68.5 }
    ];

    const historicoConsultas = [
        {
            titulo: "Consulta Inicial",
            descricao: "Avaliação completa e definição de objetivos",
            peso: "69.0 kg",
            imc: "25.4",
            data: "24/07/2024",
            status: "Concluída"
        },
        {
            titulo: "Acompanhamento - Semana 2",
            descricao: "Ajustes na dieta e orientações",
            peso: "68.2 kg",
            imc: "25.1",
            data: "07/08/2024",
            status: "Concluída"
        },
        {
            titulo: "Próxima Consulta",
            descricao: "Acompanhamento mensal",
            data: "28/08/2024",
            status: "Agendada"
        }
    ];

    return (
        <ScrollView style={styles.container}>

            {/* BOTÃO DE VOLTAR */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>

            {/* Cabeçalho */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.nome}>Ana Silva</Text>
                    <Text style={styles.idade}>28 anos</Text>
                </View>

                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Editar Dados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoCriarDieta}
                        onPress={() => navigation.navigate("CriarDieta", { paciente })}
                    >
                        <Text style={styles.botaoText}>Criar Dieta</Text>
                    </TouchableOpacity>



                </View>
            </View>

            {/* Dados Pessoais */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados Pessoais</Text>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Peso Atual</Text>
                        <Text style={styles.value}>68.5 kg</Text>

                        <Text style={styles.label}>IMC</Text>
                        <Text style={styles.value}>25.2</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>Altura</Text>
                        <Text style={styles.value}>165 cm</Text>

                        <Text style={styles.label}>Objetivo</Text>
                        <Text style={styles.value}>Perder peso</Text>
                    </View>
                </View>
            </View>

            {/* Progresso */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Progresso</Text>

                <Text style={styles.label}>Variação da Semana</Text>
                <Text style={styles.valueGreen}>-0.5 kg</Text>

                <Text style={styles.label}>Peso Inicial</Text>
                <Text style={styles.value}>69 kg</Text>

                <Text style={styles.label}>Progresso Total</Text>
                <Text style={styles.valueGreen}>-0.5 kg</Text>

                <Text style={styles.label}>Meta Mensal</Text>
                <View style={styles.metaBarContainer}>
                    <View style={styles.metaBarFill} />
                </View>
                <Text style={styles.metaPercent}>25% da meta</Text>
            </View>

            {/* Gráfico */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Evolução do Peso</Text>

                <View style={styles.chartContainer}>
                    {pesoEvolucao.map((item, index) => (
                        <View key={index} style={styles.chartColumn}>
                            <View
                                style={[
                                    styles.chartBar,
                                    { height: (item.peso - 65) * 12 }
                                ]}
                            />
                            <Text style={styles.chartText}>{item.peso}kg</Text>
                            <Text style={styles.chartLabel}>{item.data}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Histórico */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Histórico de Consultas</Text>

                {historicoConsultas.map((item, i) => (
                    <View key={i} style={styles.consultaItem}>
                        <View>
                            <Text style={styles.consultaTitulo}>{item.titulo}</Text>
                            <Text style={styles.consultaDescricao}>{item.descricao}</Text>

                            {item.peso && (
                                <Text style={styles.consultaInfo}>
                                    Peso: {item.peso} | IMC: {item.imc}
                                </Text>
                            )}
                        </View>

                        <View>
                            <Text style={styles.data}>{item.data}</Text>
                            <Text style={styles.status}>{item.status}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: "#F4F8F9" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },

    nome: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222"
    },
    idade: {
        color: "#777",
        marginTop: 2
    },

    headerButtons: {
        flexDirection: "row",
        gap: 10
    },

    button: {
        backgroundColor: "#1976D2",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600"
    },

    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10
    },

    label: {
        color: "#555",
        marginTop: 8
    },
    value: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222"
    },
    valueGreen: {
        fontSize: 18,
        fontWeight: "600",
        color: "#33aa44"
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    metaBarContainer: {
        width: "100%",
        backgroundColor: "#e0e0e0",
        height: 8,
        borderRadius: 5,
        marginTop: 5
    },
    metaBarFill: {
        width: "25%",
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 5
    },
    metaPercent: { marginTop: 5, color: "#555" },

    chartContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        alignItems: "flex-end"
    },

    chartColumn: { alignItems: "center" },

    chartBar: {
        width: 30,
        backgroundColor: "#4CAF50",
        borderRadius: 6
    },

    chartText: {
        marginTop: 5,
        fontSize: 12
    },
    chartLabel: {
        fontSize: 12,
        color: "#777"
    },

    consultaItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    consultaTitulo: {
        fontSize: 16,
        fontWeight: "700"
    },
    consultaDescricao: {
        color: "#555"
    },
    consultaInfo: {
        marginTop: 5,
        fontSize: 12,
        color: "#666"
    },

    data: {
        fontSize: 12,
        color: "#777",
        textAlign: "right"
    },
    status: {
        textAlign: "right",
        backgroundColor: "#ddd",
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginTop: 5,
        borderRadius: 5,
        fontSize: 12
    },
    backButton: {
        paddingVertical: 5,
        marginBottom: 10
    },
    backText: {
        fontSize: 18,
        color: "#4CAF50",
        fontWeight: "700"
    },

    botaoCriarDieta: {
        backgroundColor: "#1976D2",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },

    botaoCriarDietaTexto: {
        color: "#fff",
        fontWeight: "600"
    },

});
