import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



export default function GrowthCalendarGrowing( props: any ) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ month, setMonth ] = useState( 'January' )

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

    const [ growing, setGrowing ]: any = useState( [] )



    return (
        <View>
            <View style={ {
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                transform: [ { translateY: -10 } ]
            } } />
            <View style={ {
                backgroundColor: Colors[ colorScheme ].background,
                paddingHorizontal: 20,
                height: Dimensions.get( 'window' ).height - 50,
                alignItems: 'center',
            } }>



                <Text style={ styles.title }>Growth Calendar</Text>

                <Text style={ {
                    color: Colors[ colorScheme ].text
                } }>Select Month for Harvesting</Text>

                {
                    months.map( ( month: any, index: any ) => {
                        return (
                            <TouchableOpacity key={ index } style={ styles.listButton }
                                onPress={ () => {
                                    if ( growing.includes( month ) ) {
                                        return
                                    }
                                    setGrowing( [ ...growing, month ] );
                                } }
                            >
                                <Text style={ {
                                    color: Colors[ colorScheme ].text
                                } }>
                                    <MaterialCommunityIcons name="tanker-truck" size={ 24 } color={ growing.includes( month ) ? '#FF5500' : 'gray' } />    { month }
                                </Text>
                            </TouchableOpacity>
                        )
                    } )
                }

                <TouchableOpacity style={ styles.button } onPress={ () => {
                    if ( growing.length == 0 ) {
                        alert( 'Please select atleast one month for growing' )
                        return
                    }
                    props.data( growing )
                    props.blur( true )
                } }>
                    <Text style={ styles.buttonText }>Submit Harvesting Months</Text>
                </TouchableOpacity>




            </View>
        </View>
    );
}