import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './Products/product.style'
export default function Shop( props: any ) {
    const colorScheme = useColorScheme();

    const [ name, setName ] = useState( 'initialState' )
    return (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                transform: [ { translateY: -10 } ]
            }} />
            <View style={{
                backgroundColor: Colors[ colorScheme ].background,
                padding: 20,
                height: 950,
                alignItems: 'center',
            }}>

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '600',
                        color: Colors[ colorScheme ].text
                    }}
                >
                    Enter Shop Name
                </Text>

                <TextInput
                    style={
                        [ styles.input,
                        { color: Colors[ colorScheme ].text }
                        ]
                    }
                    placeholder='Shop Name'
                    selectionColor={'#FF5500'}
                    onChangeText={( text ) => {
                        setName( text )
                    }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if ( name == '' ) {
                            alert( 'Shop name should not be empty' )
                            return
                        }
                        props.data( name )
                        props.blur( true )
                    }}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
