import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function HomePlants( props: any ) {
    const data = props.data
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate( 'ShowPlant', { data: data.item } )
            }}
            style={[
                styles.productContainer,
                { backgroundColor: Colors[ colorScheme ].homeCard },
            ]}  >
            <Image style={styles.productImage} source={{ uri: data.item.images[ 0 ] || '' }} />
            <View style={[ styles.badge, data.item.shop == undefined ? { display: 'none' } : {} ]}>
                <Text style={[ styles.badgeText, ]}>{data.item.shop}</Text>
            </View>
            <Text style={[ styles.plantName, { color: Colors[ colorScheme ].text } ]}>
                {data.item.plantInfo.name}
            </Text>
            <Text style={[ styles.quantity, { color: 'gray' } ]}>
                {data.item.plantInfo.quantities + data.item.plantInfo.unit} available
                </Text>
            <Text style={[ styles.price, { fontSize: 14, fontWeight: '300' } ]}>₱
                    <Text style={styles.price}>{data.item.plantInfo.price}</Text>
                    .00
                </Text>
        </TouchableOpacity>
    );
}
