import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Cadastro from './Cadastro';
import Nutricionista from './Nutricionista';
import NovoPaciente from './NovoPaciente';
import DetalhesPaciente from './DetalhesPaciente';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Nutricionista" component={Nutricionista} />
        <Stack.Screen name="NovoPaciente" component={NovoPaciente} />
        <Stack.Screen name="DetalhesPaciente" component={DetalhesPaciente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
