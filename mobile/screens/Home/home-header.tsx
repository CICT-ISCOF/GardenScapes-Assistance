import React from 'react';
import { View, Text, TextInput } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Categories from './category';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Margin from '../../shared/margin';

export default function HomeHeader( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={[ props.show != true ? {
            backgroundColor: Colors[ colorScheme ].background, shadowColor: props.headerColor == "orange" ? '#FEB200' : "#1ED760",
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            zIndex: 1,
            elevation: 3,
            shadowOffset: {
                width: 0,
                height: 1,
            },
        } : {} ]}>
            <View style={[ props.show != true ? { marginTop: 10 } : { position: 'absolute', top: -500 } ]}>
                <Margin />
            </View>
            <View style={[ props.show == true ? {} : { position: 'absolute', top: -500 } ]}>
                <HeaderImage title="GARDENSCAPES" title1="ASSISTANCE" color={props.headerColor} back={false} />
            </View>
            <View style={[ { padding: 10, position: 'relative', zIndex: 3 } ]}>
                <View style={[
                    styles.searchContainer,
                    { backgroundColor: Colors[ colorScheme ].background },
                    props.headerColor == "orange" ? { borderColor: '#FEB200' } : { borderColor: '#1ED760' },
                    props.show != true ? { marginTop: -10, } : { marginTop: 10 } ]
                }>
                    <View style={[
                        styles.iconHolder,
                        props.headerColor == "orange" ? { backgroundColor: '#FEB200', shadowColor: "#FEB200", } : { backgroundColor: '#1ED760', shadowColor: "#1ED760" }
                    ]}>
                        <Ionicons name="md-search-outline" size={24} color="white" />
                    </View>
                    <TextInput selectionColor={props.headerColor == "orange" ? '#FEB200' : '#1ED760'} style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Search' />
                </View>
            </View>
            <Categories
                data={( data: any ) => {
                    props.data( data )
                }}
                header={( color: any ) => {
                    props.setHeaderColor( color )
                    if ( color == 'orange' ) {
                        props.setcategory( 2 )
                        return
                    }
                    props.setcategory( 1 )
                }}
                color={props.category == 2 ? 'orange' : 'green'}
            />
        </View>
    );
}
