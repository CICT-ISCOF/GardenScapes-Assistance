import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';

import { AntDesign } from '@expo/vector-icons';
import Home from '../screens/Home/home';
import Add from '../screens/Add/add';
import Cart from '../screens/Cart/cart';
import Conversations from '../screens/Chats/conversation';
import Menu from '../screens/Menu/menu';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator( props: any ) {
    React.useEffect( () => {
        ( async () => {

            await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                const uid = JSON.parse( user ).uid
                getCart( uid )

            } )
        } )()
    }, [] )

    const [ cartSize, setcartSize ] = React.useState( 0 )
    function getCart( uid: any ) {
        firebase.firestore().collection( 'cart' )
            .where( 'uid', '==', uid )
            .onSnapshot( ( carts: any ) => {
                setcartSize( carts.size )
            } )
    }

    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{ activeTintColor: Colors[ colorScheme ].tint }}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <AntDesign name="home" size={24} color={color} />
                    ,
                }}
            />
            <BottomTab.Screen
                name="Chats"
                component={ChatNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Ionicons name="chatbubble-outline" size={24} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Add"
                component={AddNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Ionicons name="add-circle-outline" size={24} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <AntDesign name="shoppingcart" size={24} color={color} />,
                    tabBarBadge: cartSize,
                    tabBarBadgeStyle: { backgroundColor: '#E9397B', color: 'white' }
                }}
            />
            <BottomTab.Screen
                name="Menu"
                component={MenuNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Ionicons name="menu-outline" size={24} color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

const HomeStack = createStackNavigator<any>();
function HomeNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
}

const ChatStack = createStackNavigator<any>();
function ChatNavigator() {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
                name="Home"
                component={Conversations}
                options={{ headerShown: false }}
            />
        </ChatStack.Navigator>
    );
}

const AddStack = createStackNavigator<any>();
function AddNavigator() {
    return (
        <AddStack.Navigator>
            <AddStack.Screen
                name="Home"
                component={Add}
                options={{ headerShown: false }}
            />
        </AddStack.Navigator>
    );
}

const CartStack = createStackNavigator<any>();
function CartNavigator() {
    return (
        <CartStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Cart}
                options={{ headerShown: false }}
            />
        </CartStack.Navigator>
    );
}

const MenuStack = createStackNavigator<any>();
function MenuNavigator() {
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen
                name="Home"
                component={Menu}
                options={{ headerShown: false }}
            />
        </MenuStack.Navigator>
    );
}


