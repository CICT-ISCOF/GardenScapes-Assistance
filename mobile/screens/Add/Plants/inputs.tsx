import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './plants.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TextInput } from 'react-native-gesture-handler';


export default function Inputs( props: any ) {

    const colorScheme = useColorScheme();

    const [ name, setname ] = useState( '' )
    const [ plant_introduction, setPlant_introduction ] = useState( '' )

    const [ growing, setgrowing ] = useState( '' )
    const [ caring, setcaring ] = useState( '' )

    const [ price, setprice ] = useState( '' )
    const [ quantities, setquantities ] = useState( '' )
    const [ unit, setunit ] = useState( '' )

    React.useEffect( () => {
        if ( props.type == 'Edit' ) {
            setname( props.value.plantInfo.name )
            setPlant_introduction( props.value.plantInfo.plant_introduction )
            setgrowing( props.value.plantInfo.growing )
            setcaring( props.value.plantInfo.caring )
            setprice( props.value.plantInfo.price )
            setquantities( props.value.plantInfo.price )
            setunit( props.value.plantInfo.unit )
            setData()
        }
    }, [] )

    function setData() {
        props.data( {
            name: name,
            plant_introduction: plant_introduction,
            growing: growing,
            caring: caring,
            price: price,
            quantities: quantities,
            unit: unit,
        } )
    }
    return (
        <View style={{ padding: 30, paddingTop: 0, marginBottom: 30 }}>
            <Text style={styles.title}>Plant Information</Text>

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Plant Name</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Plant Name'
                returnKeyType="next"
                value={name}
                placeholderTextColor="gray"
                selectionColor={'#08AD4F'}
                clearButtonMode="always"
                onChangeText={( text ) => {
                    setname( text )
                    setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Plant Introduction</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Plant Introduction'
                selectionColor={'#08AD4F'}
                multiline
                value={plant_introduction}
                returnKeyType="next"
                placeholderTextColor="gray"
                clearButtonMode="always"

                onChangeText={( text ) => {
                    setPlant_introduction( text );
                    setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Growing Guide</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Growing Guide'
                selectionColor={'#08AD4F'}
                value={growing}
                multiline
                returnKeyType="next"
                placeholderTextColor="gray"
                clearButtonMode="always"
                onChangeText={( text ) => {
                    setgrowing( text );
                    setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Caring Guide</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Caring Guide'
                selectionColor={'#08AD4F'}
                value={caring}
                multiline
                returnKeyType="next"
                placeholderTextColor="gray"
                clearButtonMode="always"
                onChangeText={( text ) => {
                    setcaring( text );
                    setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Price</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Price'
                selectionColor={'#08AD4F'}
                returnKeyType="next"
                clearButtonMode="always"
                value={price}
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                onChangeText={( text ) => {
                    setprice( text );
                    setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Quantities</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Quantities'
                selectionColor={'#08AD4F'}
                returnKeyType="next"
                clearButtonMode="always"
                value={quantities}
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                onChangeText={( text ) => {
                    setquantities( text );
                    setData()
                }}
            />

            <Text style={[ styles.editText, props.type == 'Edit' ? {} : { position: 'absolute', left: -500 } ]}>Unit e.g., kilograms</Text>
            <TextInput style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Unit e.g., kilograms'
                placeholderTextColor="gray"
                selectionColor={'#08AD4F'}
                clearButtonMode="always"
                returnKeyType="next"
                value={unit}
                onChangeText={( text ) => {
                    setunit( text );
                    setData()
                }}
            />

        </View>
    );
}
