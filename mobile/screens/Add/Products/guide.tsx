import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function Guide(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [land_preparation, setland_preparation] = useState('')

    const [planting, setplanting] = useState('')
    const [caring, setcaring] = useState('')

    const [harvesting, setharvesting] = useState('')
    const [storing, setstoring] = useState('')




    return (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                transform: [{ translateY: -10 }]
            }} />
            <View style={{
                backgroundColor: Colors[colorScheme].background,
                padding: 20,
                height: 950,
                alignItems: 'center',
            }}>

                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text }}>Guide</Text>

                <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Land Preparation'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {
                        setland_preparation(text)
                    }} />

                <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='planting'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {
                        setplanting(text)
                    }} />


                <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Caring'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {
                        setcaring(text)
                    }} />


                <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Harvesting'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {
                        setharvesting(text)
                    }} />


                <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Storing'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {
                        setstoring(text)
                    }} />



                <TouchableOpacity style={styles.button} onPress={() => {
                    if (
                        land_preparation == '' ||
                        planting == '' ||
                        caring == '' ||
                        harvesting == '' ||
                        storing == ''
                    ) {
                        alert('One or more fields should not be empty.')
                        return
                    }
                    props.data({
                        land_preparation: land_preparation,
                        planting: planting,
                        caring: caring,
                        harvesting: harvesting,
                        storing: storing
                    })
                    props.blur(true)
                }}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}
