import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import CircuitsScreen from "./screens/CircuitsScreen";
import ConstructorsScreen from "./screens/ConstructorsScreen";
import DriversScreen from "./screens/DriversScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import DriverScreen from "./screens/DriverScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Drivers") {
      iconName = focused ? "drivers-license" : "drivers-license-o";
      return <FontAwesome name={iconName} size={size} color={color} />;
    } else if (route.name === "Circuits") {
      iconName = focused ? "map-marker" : "map-marker-outline";
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    } else if (route.name === "Constructors") {
      iconName = focused ? "construct" : "construct-outline";
    } else if (route.name === "Results") {
      iconName = focused ? "podium" : "podium-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "orange",
  tabBarInactiveTintColor: "gray",
  headerTitle: (props) => <LogoTitle {...props} />,
});

function LogoTitle() {
  return (
    <Image
      style={{ width: 80, height: 80 }}
      source={require("./assets/f1.png")}
    />
  );
}

function DriverNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriversNavigator" component={DriversScreen} />
      <Stack.Screen name="Driver" component={DriverScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Drivers" component={DriverNavigator} />
        <Tab.Screen name="Circuits" component={CircuitsScreen} />
        <Tab.Screen name="Constructors" component={ConstructorsScreen} />
        <Tab.Screen name="Results" component={ResultsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
