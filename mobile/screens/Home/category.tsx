import React from 'react';
import { Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './home.style'
import firebase from 'firebase'


export default function Categories( props: any ) {

    const [ plants, setplants ]: any = React.useState( [] )

    React.useEffect( () => {
        getCategories()
    }, [] )

    function getCategories() {
        setplants( [] )
        let plantArray: any = []
        firebase.firestore().collection( 'product' )
            .orderBy( 'plantInfo.categroy', 'asc' )
            .onSnapshot( ( plants: any ) => {
                plants.forEach( ( plant: any ) => {
                    if ( !plantArray.includes( plant.data()[ 'plantInfo' ][ 'categroy' ] ) ) {
                        plantArray.push( plant.data()[ 'plantInfo' ][ 'categroy' ] )
                    }
                } )
                setplants( plantArray )
            } )
    }


    return (
        <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[ styles.categoryContainer,
            props.show == true ? {} : { position: 'absolute', left: -500 }
            ]}>
            <TouchableOpacity onPress={() => {
                props.header( 'flat-green' )
            }} style={[ styles.button, { backgroundColor: props.color == 'orange' ? '#FEB400' : '#02AF50' } ]}>
                <Text style={[ styles.buttonText, { color: 'white' } ]}>Plantitas/Plantitos</Text>
            </TouchableOpacity>

            {
                plants.map( ( category: any, index: any ) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            props.header( 'orange' )
                            let plantArray: any = []
                            firebase.firestore().collection( 'product' )
                                .where( 'plantInfo.categroy', '==', category )
                                .onSnapshot( ( plants: any ) => {
                                    plants.forEach( ( plant: any ) => {
                                        plantArray.push( plant.data() )
                                    } )
                                    props.data( plantArray )
                                } )
                        }} style={[ styles.button, { backgroundColor: props.color == 'orange' ? '#FEB400' : '#02AF50' } ]}>
                        <Text style={[ styles.buttonText, { color: 'white' } ]}>{category}</Text>
                    </TouchableOpacity>
                ) )
            }

        </ScrollView>
    );
}
