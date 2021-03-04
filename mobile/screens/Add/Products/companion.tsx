import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';


export default function Companion(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [name, setName] = useState('')
    const [type, setType] = useState('')


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
                height: 850,
                alignItems: 'center',
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text }}>Companions</Text>
                </View>

                <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text }]}
                    placeholder='Companion Name'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                />


                <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text }]}
                    placeholder='Type e.g., Good, Bad'
                    selectionColor={'#FF5500'}
                    onChangeText={(text) => {

                        setType(text)

                    }}
                />


                <TouchableOpacity style={styles.button} onPress={() => {
                    if (name == '') {
                        alert('Companion name should not be empty')
                        return
                    }
                    if (type == 'Bad' || type == 'Good') {
                        props.data({ name: name, type: type })
                        props.blur(true)
                        return
                    }
                    alert('Companion Tpye should be Good or Bad only.')

                }}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>



            </View>
        </View>
    );
}
