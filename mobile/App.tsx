import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import firebase from 'firebase';


export default function App() {

    const firebaseConfig = {
        apiKey: "AIzaSyDa73OWo7MWet1DxMZbD2tL254AP6by7a8",
        authDomain: "gardenscapes-assistance-85e11.firebaseapp.com",
        projectId: "gardenscapes-assistance-85e11",
        storageBucket: "gardenscapes-assistance-85e11.appspot.com",
        messagingSenderId: "662965779795",
        appId: "1:662965779795:web:8731765bc586720fe535a6"
    };

    useEffect( () => {
        firebase.initializeApp( firebaseConfig );
    }, [] )


    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if ( !isLoadingComplete ) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={ colorScheme } />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}
