import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GrowthCalendar(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [month, setMonth] = useState('January')

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'Jun',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const [planting, setPlanting]: any = useState([])



    return (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: Colors[colorScheme].bg,
                alignSelf: 'center',
                transform: [{ translateY: -10 }]
            }} />
            <View style={{
                backgroundColor: Colors[colorScheme].bg,
                paddingHorizontal: 20,
                height: Dimensions.get('window').height - 50,
                alignItems: 'center',
            }}>

                <Text style={styles.title}>Growth Calendar</Text>

                <Text>Select Month for Planting</Text>

                {
                    months.map((month: any, index: any) => {
                        return (
                            <TouchableOpacity style={styles.listButton}
                                onPress={() => {
                                    if (planting.includes(month)) {
                                        return
                                    }
                                    setPlanting([...planting, month]);
                                }}
                            >
                                <Text style={{
                                    color: Colors[colorScheme].text
                                }}>
                                    <MaterialCommunityIcons
                                        name="seed" size={24} color={planting.includes(month) ? '#69A746' : 'gray'} />        {month}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

                <TouchableOpacity style={styles.button} onPress={() => {
                    if (planting.length == 0) {
                        alert('Please select atleast one month for planting')
                        return
                    }
                    props.data(planting)
                    props.blur(true)
                }}>
                    <Text style={styles.buttonText}>Submit Planting Months</Text>
                </TouchableOpacity>




            </View>
        </View>
    );
}
