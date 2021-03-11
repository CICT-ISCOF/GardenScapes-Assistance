import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TextInput } from 'react-native-gesture-handler';

export default function ProductInputs( props: any ) {
    const colorScheme = useColorScheme();



    const [ name, setname ] = useState( '' )
    const [ name_local, setname_local ] = useState( '' )
    const [ categroy, setcategroy ] = useState( '' )


    const [ descriptoin, setdescriptoin ] = useState( '' )
    const [ soilPh, setsoilPh ] = useState( '' )

    const [ soil_type, setsoil_type ] = useState( '' )

    const [ soil_depth, setsoil_depth ] = useState( '' )
    const [ row_distance, setrow_distance ] = useState( '' )

    const [ plant_distance, setplant_distance ] = useState( '' )
    const [ price, setprice ] = useState( '' )

    const [ quantities, setquantities ] = useState( '' )
    const [ unit, setunit ] = useState( '' )

    const [ planting, setplanting ] = useState( '' )
    const [ caring, setcaring ] = useState( '' )

    function setData() {
        props.data( {
            name: name,
            name_local: name_local,
            categroy: categroy,
            descriptoin: descriptoin,
            soilPh: soilPh,
            soil_type: soil_type,
            soil_depth: soil_depth,
            row_distance: row_distance,
            plant_distance: plant_distance,
            price: price,
            quantities: quantities,
            unit: unit,
        } )
    }


    return (
        <View style={{ padding: 30, paddingTop: 0, marginBottom: 30 }}>
            <Text style={styles.title}>Product Information</Text>

            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Product Name'
                selectionColor={'#FF5500'}

                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setname( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Product Name(Local Languange)'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setname_local( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Category'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setcategroy( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Description'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                multiline
                onChangeText={( text ) => {
                    setdescriptoin( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Soil pH'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setsoilPh( text ); setData()
                }}
            />

            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Soil Type'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setsoil_type( text ); setData()
                }}
            />

            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Soil Depth'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setsoil_depth( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Row Distance'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setrow_distance( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Plant Distance'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setplant_distance( text ); setData()
                }}
            />

            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Price'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                onChangeText={( text ) => {
                    setprice( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Quantities'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                onChangeText={( text ) => {
                    setquantities( text ); setData()
                }}
            />


            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Unit e.g., kilograms'
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setunit( text ); setData()

                }}
            />



        </View>
    );
}
