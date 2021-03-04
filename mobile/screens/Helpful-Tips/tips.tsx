import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderImage from '../../shared/header-image';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
export default function HelpfulTips() {


    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    function truncateOnWord(str: any, limit: any) {
        var trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
        var reg = new RegExp('(?=[' + trimmable + '])');
        var words = str.split(reg);
        var count = 0;
        return words.filter(function (word: any) {
            count += word.length;
            return count <= limit;
        }).join('') + '...';
    }

    const [tips, settips] = useState([1, 2, 3, 4, 5, 6])
    return (
        <View>
            <HeaderImage title="Helpful Tips" color="yellow" back={true} />
            <ScrollView style={{
                padding: 20
            }}>

                {
                    tips.map((index: any, key: any) => {
                        return (
                            <TouchableOpacity style={[styles.container, { backgroundColor: Colors[colorScheme].background }]} onPress={() => {
                                navigation.navigate('ShowTips')
                            }}>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.title, { color: '#FEB400' }]}>
                                        <AntDesign name="bulb1" size={16} color="#FEB400" />   Tip Title</Text>
                                    <Text style={{
                                        color: 'gray',
                                        marginTop: 7
                                    }}>
                                        {truncateOnWord(`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate at asperiores saepe, sint libero quia atque quas porro eum repudiandae! Voluptate obcaecati sunt cumque reiciendis optio ut nisi ratione eaque?`, 85)}
                                    </Text>
                                </View>
                                <Image style={styles.Image} source={require('../../assets/placeholders/orange.jpg')} />
                            </TouchableOpacity>
                        )
                    })

                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginRight: 10
    },
    textContainer: {
        flex: 3,
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    Image: {
        width: 100, height: 100,
    },

})