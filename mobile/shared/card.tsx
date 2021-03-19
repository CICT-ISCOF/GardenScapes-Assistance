import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
export default function Card( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();



    function formatText( string: String ) {
        var trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
        var reg = new RegExp( '(?=[' + trimmable + '])' );
        var words = string.split( reg );
        var count = 0;
        return words.filter( function ( word: any ) {
            count += word.length;
            return count <= 90;
        } ).join( '' );
    }

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate( 'Chatbox', { chatBot: false, uid: props.data, data: null } )
        }} style={{
            flexDirection: 'row',
            width: '100%',
            padding: 20,

        }}>
            <Image
                style={{
                    resizeMode: 'stretch',
                    height: 50,
                    width: 50,
                    borderRadius: 50,

                }}
                source={props.image} />
            <View
                style={{ marginLeft: 10, width: '80%' }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '600',
                        width: '100%',
                        color: Colors[ colorScheme ].text
                    }}
                >
                    {props.title}
                </Text>
                <Text
                    style={{
                        width: '100%',
                        marginTop: 5,
                        color: 'gray'
                    }}
                >
                    {formatText( props.body )}
                </Text>
            </View>
        </TouchableOpacity >
    );
}
