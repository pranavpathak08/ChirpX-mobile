import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type RootStackParamList = {
    Home: undefined,
    Login: undefined,
    Register: undefined,
    Welcome: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f1a' }}>
                <ActivityIndicator size="large" color="#667eea"/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ { headerShown: false } }>
                { isAuthenticated ? (
                    <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={ HomeScreen } />
                        <Stack.Screen name="Login" component={ LoginScreen } />
                        <Stack.Screen name="Register" component={ RegisterScreen } />
                    </>      
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}