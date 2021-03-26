import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import firebase from 'firebase';

export default function App() {

    const firebaseConfig = {
        apiKey: "AIzaSyCMvU528lD-FakiDNz9LDpKfCp9ZNkId-M",
        authDomain: "gardenscapes-assistance-v2.firebaseapp.com",
        projectId: "gardenscapes-assistance-v2",
        storageBucket: "gardenscapes-assistance-v2.appspot.com",
        messagingSenderId: "998391346956",
        appId: "1:998391346956:web:af2f21e1dfffe1b12c3b29"
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
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}
