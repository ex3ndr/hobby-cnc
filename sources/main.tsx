import * as React from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './fragments/home/Home';
import { Controller } from './fragments/controller/Controller';

const Stack = createNativeStackNavigator();

export const Main = React.memo(() => {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShadowVisible: false,
                    headerBackTitle: 'Back',
                    title: ''
                }}>
                    <Stack.Screen
                        name='home'
                        component={Home}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name='controller'
                        component={Controller}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
});