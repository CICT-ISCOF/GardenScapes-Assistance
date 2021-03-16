import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';


import Cart from '../screens/Cart/cart';
import ChatBox from '../screens/Chats/chatbox';
import CommonPLantPests from '../screens/Common-Plant-Pests/pests';
import EditPlants from '../screens/Edit/Plants/edit-plants';
import EditProducts from '../screens/Edit/Products/edit-products';
import ShowTips from '../screens/Helpful-Tips/show-tips';
import HelpfulTips from '../screens/Helpful-Tips/tips';
import PlantList from '../screens/List/Plants/plant-list';
import ProductList from '../screens/List/Products/product';
import Login from '../screens/Login/login';
import NotFoundScreen from '../screens/NotFoundScreen';
import PlantDisease from '../screens/Plant-Disease/disease';
import ShowDisease from '../screens/Plant-Disease/show-disease';
import Profile from '../screens/Profile/profile';
import ShowPlant from '../screens/Show/Plants/show-plants';
import ShowProduct from '../screens/Show/Products/show-products';
import SignUp from '../screens/Signup/sign-up';
import Splash from '../screens/Splash/splash';
import Step1 from '../screens/Steps/step1';
import Step2 from '../screens/Steps/step2';
import Step3 from '../screens/Steps/step3';
import Step4 from '../screens/Steps/step4';
import Step5 from '../screens/Steps/step5';


export default function Navigation( { colorScheme }: { colorScheme: ColorSchemeName } ) {
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
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Step1" component={Step1} />
            <Stack.Screen name="Step2" component={Step2} />
            <Stack.Screen name="Step3" component={Step3} />
            <Stack.Screen name="Step4" component={Step4} />
            <Stack.Screen name="Step5" component={Step5} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Chatbox" component={ChatBox} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="PlantList" component={PlantList} />
            <Stack.Screen name="CommonPLantPests" component={CommonPLantPests} />
            <Stack.Screen name="PlantDisease" component={PlantDisease} />
            <Stack.Screen name="ShowPlant" component={ShowPlant} />
            <Stack.Screen name="ShowProduct" component={ShowProduct} />
            <Stack.Screen name="ShowDisease" component={ShowDisease} />
            <Stack.Screen name="EditPlants" component={EditPlants} />
            <Stack.Screen name="EditProducts" component={EditProducts} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="HelpfulTips" component={HelpfulTips} />
            <Stack.Screen name="ShowTips" component={ShowTips} />
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}
