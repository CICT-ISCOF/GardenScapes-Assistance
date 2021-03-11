import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function ShowLayoutIdeas( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const _renderItem = ( image: any ) => (
        <Image style={{
            resizeMode: 'stretch',
            height: 120,
            width: 100,
            margin: 10,
            borderRadius: 5,
        }} source={{ uri: image.item }} />
    );

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
                height: 950,
                alignItems: 'center',
            }}>


                <Text style={{ fontSize: 20, fontWeight: '600', color: Colors[ colorScheme ].text, marginTop: 20, marginBottom: 20 }}>Layout Ideas</Text>


                <FlatList
                    renderItem={_renderItem}
                    data={props.data}
                    numColumns={3}
                    keyExtractor={props.data.index}
                />

            </View>
        </View>
    );
}
