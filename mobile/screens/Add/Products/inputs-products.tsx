import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TextInput } from 'react-native-gesture-handler';

export default function ProductInputs( props: any ) {

    React.useEffect( () => {
        if ( props.type == 'Edit' ) {
            setname( props.value.plantInfo.name )
            setname_local( props.value.plantInfo.name_local )
            setcategroy( props.value.plantInfo.categroy )
            setdescriptoin( props.value.plantInfo.descriptoin )

            setsoilPh( props.value.plantInfo.soilPh )
            setsoil_type( props.value.plantInfo.soil_type )
            setsoil_depth( props.value.plantInfo.soil_depth )
            setrow_distance( props.value.plantInfo.row_distance )

            setplant_distance( props.value.plantInfo.plant_distance )
            setprice( props.value.plantInfo.price )
            setquantities( props.value.plantInfo.quantities )
            setunit( props.value.plantInfo.unit )
        }

    }, [] )

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

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Product Name</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Product Name'
                selectionColor={'#FF5500'}
                clearButtonMode="always"
                value={name}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setname( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Product Name(Local Languange)</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Product Name(Local Languange)'
                selectionColor={'#FF5500'}
                clearButtonMode="always"
                value={name_local}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setname_local( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Category</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Category'
                selectionColor={'#FF5500'}
                clearButtonMode="always"
                value={categroy}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setcategroy( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Description</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Description'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                value={descriptoin}
                placeholderTextColor="gray"
                multiline
                onChangeText={( text ) => {
                    setdescriptoin( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Soil pH</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Soil pH'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                value={soilPh}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setsoilPh( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Soil Type</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Soil Type'
                selectionColor={'#FF5500'}
                clearButtonMode="always"
                value={soil_type}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setsoil_type( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Soil Depth</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Soil Depth'
                selectionColor={'#FF5500'}
                clearButtonMode="always"
                value={soil_depth}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setsoil_depth( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Row Distance</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Row Distance'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                value={row_distance}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setrow_distance( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Plant Distance</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Plant Distance'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                value={plant_distance}
                placeholderTextColor="gray"
                onChangeText={( text ) => {
                    setplant_distance( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Price</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Price'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                value={price}
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                onChangeText={( text ) => {
                    setprice( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Quantities</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Quantities'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                value={quantities}
                keyboardType={'number-pad'}
                onChangeText={( text ) => {
                    setquantities( text ); setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Unit e.g., kilograms</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Unit e.g., kilograms'
                clearButtonMode="always"
                selectionColor={'#FF5500'}
                placeholderTextColor="gray"
                value={unit}
                onChangeText={( text ) => {
                    setunit( text ); setData()
                }}
            />

        </View>
    );
}
