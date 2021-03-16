import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Guide( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    React.useEffect( () => {
        if ( props.initialData != undefined ) {
            setland_preparation( props.initialData.land_preparation )
            setplanting( props.initialData.planting )
            setcaring( props.initialData.caring )
            setharvesting( props.initialData.harvesting )
            setstoring( props.initialData.storing )
        }

    }, [] )

    const [ land_preparation, setland_preparation ] = useState( '' )
    const [ planting, setplanting ] = useState( '' )
    const [ caring, setcaring ] = useState( '' )
    const [ harvesting, setharvesting ] = useState( '' )
    const [ storing, setstoring ] = useState( '' )


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

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: Colors[ colorScheme ].text, flex: 3 }}>Guide</Text>

                    <TouchableOpacity style={{ marginRight: 20 }}
                        onPress={() => {
                            if (
                                land_preparation == '' ||
                                planting == '' ||
                                caring == '' ||
                                harvesting == '' ||
                                storing == ''
                            ) {
                                alert( 'One or more fields should not be empty.' )
                                return
                            }
                            props.data( {
                                land_preparation: land_preparation,
                                planting: planting,
                                caring: caring,
                                harvesting: harvesting,
                                storing: storing
                            } )
                            props.blur( true )
                        }}
                    >
                        <Text style={{ color: Colors[ colorScheme ].text }}>Save</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                        }}
                    >
                        <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors[ colorScheme ].text} />
                    </TouchableOpacity>


                </View>

                <Text style={[ styles.editText, props.initialData != undefined ? {} : { position: 'absolute', left: -500 } ]}>Land Preparation</Text>
                <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Land Preparation'
                    placeholderTextColor="gray"
                    selectionColor={'#08AD4F'}
                    clearButtonMode="always"
                    value={land_preparation}
                    multiline
                    onChangeText={( text ) => {
                        setland_preparation( text )
                    }}
                />

                <Text style={[ styles.editText, props.initialData != undefined ? {} : { position: 'absolute', left: -500 } ]}>Planting</Text>
                <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Planting'
                    placeholderTextColor="gray"
                    selectionColor={'#08AD4F'}
                    value={planting}
                    clearButtonMode="always"
                    multiline
                    onChangeText={( text ) => {
                        setplanting( text )
                    }}
                />


                <Text style={[ styles.editText, props.initialData != undefined ? {} : { position: 'absolute', left: -500 } ]}>Caring</Text>
                <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Caring'
                    placeholderTextColor="gray"
                    selectionColor={'#08AD4F'}
                    clearButtonMode="always"
                    value={caring}

                    multiline
                    onChangeText={( text ) => {
                        setcaring( text )
                    }} />


                <Text style={[ styles.editText, props.initialData != undefined ? {} : { position: 'absolute', left: -500 } ]}>Harvesting</Text>
                <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Harvesting'
                    placeholderTextColor="gray"
                    selectionColor={'#08AD4F'}
                    clearButtonMode="always"
                    value={harvesting}
                    multiline
                    onChangeText={( text ) => {
                        setharvesting( text )
                    }} />


                <Text style={[ styles.editText, props.initialData != undefined ? {} : { position: 'absolute', left: -500 } ]}>Storing</Text>
                <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Storing'
                    placeholderTextColor="gray"
                    selectionColor={'#08AD4F'}
                    value={storing}
                    clearButtonMode="always"
                    multiline
                    onChangeText={( text ) => {
                        setstoring( text )
                    }} />




            </View>

        </View>
    );
}
