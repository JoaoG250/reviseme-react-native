import * as React from "react";
import LoginScreen from "../screens/LoginScreen";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RootBottomTabNavigator from "./root/RootBottomTabNavigator";
import SubjectBottomTabNavigator from "./subject/SubjectBottomTabNavigator";
import { AuthStackParamList, RootStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/auth";
import { ActivityIndicator, View } from "react-native";

export default function Routes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return isAuthenticated ? <RootNavigator /> : <AuthNavigator />;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={RootBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Subject"
        component={SubjectBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="Modal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
