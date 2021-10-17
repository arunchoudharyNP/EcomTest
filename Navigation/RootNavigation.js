import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import VisitorScreen from "../Screens/VisitorScreen";
import VisitorForm from "../Screens/VisitorForm";
import NewsScreen from "../Screens/NewsScreen";

const RootNavigation = (props) => {
  const UserBottomTab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const VisitorStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Visitors" component={VisitorScreen} />
        <Stack.Screen
          name="VisitorsForm"
          component={VisitorForm}
          options={{ title: "Add Visitors" }}
        />
      </Stack.Navigator>
    );
  };

  const UserTabNavigation = () => {
    return (
      <UserBottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          title: route.name.toUpperCase(),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "VisitorStack") {
              iconName = focused ? "account-group" : "account-group-outline";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "NEWS") {
              iconName = focused ? "newspaper" : "newspaper-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "#044b59",
          inactiveTintColor: "gray",
        }}
      >
        <UserBottomTab.Screen
          name="VisitorStack"
          component={VisitorStack}
          options={{ title: "Visitors" }}
        />
        <UserBottomTab.Screen name="NEWS" component={NewsScreen} />
      </UserBottomTab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={UserTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
