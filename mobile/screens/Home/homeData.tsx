import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function HomeProducts( props: any ) {
    const data = props.data
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: "PHP",
    } )


    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate( 'ShowProduct', { data: data.item } )
            }}
            style={[ styles.productContainer, { backgroundColor: Colors[ colorScheme ].homeCard } ]}  >
            <Image style={styles.productImage} source={{ uri: data.item.images[ 0 ] || '' }} />
            <View style={[ styles.badge, data.item.shop == undefined || data.item.shop == null || data.item.shop == '' ? { display: 'none' } : {} ]}>
                <Text style={[ styles.badgeText, ]}>{data.item.shop}</Text>
            </View>
            <Text style={[ styles.plantName, { color: Colors[ colorScheme ].text } ]}>
                {data.item.plantInfo.name}
            </Text>
            <Text style={[ styles.quantity, { color: 'gray', textTransform: 'lowercase' } ]}>
                {data.item.plantInfo.quantities + " " + data.item.plantInfo.unit} available
            </Text>
            <Text style={[ styles.price, { fontSize: 14, fontWeight: '500' } ]}>
                {formatter.format( parseFloat( data.item.plantInfo.price ) )}
            </Text>
        </TouchableOpacity>
    );
}
