import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Grid from 'react-native-grid-component';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from 'react-native-animated-bottom-sheet';
import PestDescription from './pest-description';


export default function CommonPLantPests() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [pest, setpest] = useState({})

    function pests() {
        return (
            <TouchableOpacity onPress={() => {
                setpest({
                    name: 'Pala'
                })
                PestDescRef.current.open()
            }} style={[styles.card, {
                backgroundColor: Colors[colorScheme].background
            }]}>
                <Image style={styles.cardImage} source={require('../../assets/placeholders/orange.jpg')}></Image>
                <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]} >Pest Name</Text>
            </TouchableOpacity>
        )
    }

    const PestDescRef: any = useRef();
    const PestDescriptionSheet = () => (
        <PestDescription data={pest} />
    );



    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors[colorScheme].bg
        }}>
            <HeaderImage title="Common Plant Pests" color="red" back={true} />
            <View style={{
                height: 1,
                backgroundColor: Colors[colorScheme].bg,
                position: 'relative',
                zIndex: 9,
                marginTop: 5
            }} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                flex: 1,
                padding: 10,
            }}>


                <Grid
                    renderItem={pests}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    numColumns={2}
                />

            </ScrollView>

            <BottomSheet
                ref={PestDescRef}
                renderContent={PestDescriptionSheet}
                visibleHeight={Dimensions.get('window').height - 50}
            />

        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        margin: 7,
        padding: 10,
        borderRadius: 10
    },
    cardImage: {
        height: 160,
        width: 145,
        resizeMode: 'stretch'
    },
    cardTitle: {
        marginTop: 17,
        textAlign: 'center',
        marginBottom: 20
    },

})