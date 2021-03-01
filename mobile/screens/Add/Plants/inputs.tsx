import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './plants.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TextInput } from 'react-native-gesture-handler';


export default function Inputs(props: any) {

    const colorScheme = useColorScheme();

    const [name, setname] = useState('')
    const [Plant_introduction, setPlant_introduction] = useState('')

    const [growing, setgrowing] = useState('')
    const [caring, setcaring] = useState('')

    const [price, setprice] = useState('')
    const [quantities, setquantities] = useState('')
    const [unit, setunit] = useState('')


    function setData() {
        props.data({
            name: name,
            plant_introduction: Plant_introduction,
            growing: growing,
            caring: caring,
            price: price,
            quantities: quantities,
            unit: unit,
        })
    }
    return (
        <View style={{ padding: 50, paddingTop: 0 }}>
            <Text style={styles.title}>Plant Information</Text>

            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Plant Name'
                selectionColor={'#FF5500'}
                multiline
                onChangeText={(text) => {
                    setname(text);
                    setData()
                }}
            />

            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Plant Introduction'
                selectionColor={'#FF5500'}
                multiline

                onChangeText={(text) => {
                    setPlant_introduction(text);
                    setData()
                }}
            />


            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Growing Guide'
                selectionColor={'#FF5500'}
                multiline

                onChangeText={(text) => {
                    setgrowing(text);
                    setData()
                }}
            />

            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Caring Guide'
                selectionColor={'#FF5500'}
                multiline

                onChangeText={(text) => {
                    setcaring(text);
                    setData()
                }}
            />

            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Price'
                selectionColor={'#FF5500'}
                multiline
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                    setprice(text);
                    setData()
                }}
            />


            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Quantities'
                selectionColor={'#FF5500'}
                multiline

                keyboardType={'number-pad'}
                onChangeText={(text) => {
                    setquantities(text);
                    setData()
                }}
            />


            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Unit e.g., kilograms'
                selectionColor={'#FF5500'}
                multiline

                onChangeText={(text) => {
                    setunit(text);
                    setData()
                }}
            />



        </View>
    );
}
