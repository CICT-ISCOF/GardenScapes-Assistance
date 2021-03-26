import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default function TipCategory( props: any ) {

    const colorScheme = useColorScheme();
    const [ categories, setcategories ] = React.useState( [] )

    React.useEffect( () => {
        getCategories()
    }, [] )

    function getCategories() {
        let categoryArray: any = []
        firebase.firestore().collection( 'tips' )
            .onSnapshot( ( tips: any ) => {
                tips.forEach( ( tip: any ) => {
                    if (
                        !categoryArray.includes( tip.data()[ 'category' ] )

                    ) {
                        categoryArray.push( tip.data()[ 'category' ] )
                    }
                } );
                setcategories( categoryArray )
            } )
    }

    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    categories.map( ( category: any, index: any ) => (
                        <TouchableOpacity
                            onPress={() => {
                                props.category( category )
                            }}
                            key={index}
                            style={{
                                maxWidth: 100,
                                alignItems: 'center', justifyContent: 'center',
                                margin: 20
                            }}>
                            <View style={{
                                padding: 15,
                                borderRadius: 50,
                                backgroundColor: 'rgba(225,214,98,.2)'
                            }}>
                                <Entypo name="light-bulb" size={24} color="#FFD662" />
                            </View>
                            <Text style={{ color: Colors[ colorScheme ].text }}>{category}</Text>
                        </TouchableOpacity>
                    ) )
                }
            </ScrollView>
        </View>
    );
}
