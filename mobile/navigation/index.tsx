import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import ChatBox from '../screens/Chats/chatbox';
import CommonPLantPests from '../screens/Common-Plant-Pests/pests';
import PlantList from '../screens/List/Plants/plant-list';
import ProductList from '../screens/List/Products/product';
import Login from '../screens/Login/login';

import NotFoundScreen from '../screens/NotFoundScreen';
import PlantDisease from '../screens/Plant-Disease/disease';
import ShowPlant from '../screens/Show/Plants/show-plants';
import ShowProduct from '../screens/Show/Products/show-products';
import SignUp from '../screens/Signup/sign-up';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Chatbox" component={ChatBox} />

            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="PlantList" component={PlantList} />
            <Stack.Screen name="CommonPLantPests" component={CommonPLantPests} />
            <Stack.Screen name="PlantDisease" component={PlantDisease} />

            <Stack.Screen name="ShowPlant" component={ShowPlant} />
            <Stack.Screen name="ShowProduct" component={ShowProduct} />


            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}
