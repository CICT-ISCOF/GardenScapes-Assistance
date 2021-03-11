import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

export default function LayoutIdeas( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ files, setfiles ]: any = useState( [] )

    async function addImage() {
        if ( files.length == 9 ) {
            alert( 'Maximum number of layouts exceeded' )
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [ 4, 3 ],
            quality: 1,
        } );

        console.log( result );

        if ( !result.cancelled ) {
            setfiles( [ ...files, result ] );
        }
    }

    const _renderItem = ( image: any ) => (
        <Image style={styles.cardImage} source={{ uri: image.item.uri }} />
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
                padding: 20,
                height: 850,
                alignItems: 'center',
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', flex: 3 }}>Layout Ideas</Text>


                    <TouchableOpacity
                        onPress={() => {
                            addImage()
                        }}
                        style={{
                            alignSelf: 'flex-end',
                        }}>
                        <Text style={{
                            color: Colors[ colorScheme ].text
                        }}> <AntDesign name="plus" size={24} color={Colors[ colorScheme ].text} /> Add Layout</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginVertical: 20
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            if ( files.length == 0 ) {
                                alert( 'No layout(s) detected' )
                                return
                            }
                            props.data( files )
                            props.blur( true )
                        }}
                        style={{
                            alignSelf: 'flex-end',
                            marginRight: 20
                        }}>
                        <Text style={{
                            color: Colors[ colorScheme ].text
                        }}><AntDesign name="upload" size={20} color={Colors[ colorScheme ].text} /> Save Layout</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            setfiles( [] )
                        }}
                        style={{
                            alignSelf: 'flex-end'
                        }}>
                        <Text style={{
                            color: Colors[ colorScheme ].text
                        }}> <Ionicons name="trash" size={20} color={Colors[ colorScheme ].text} /> Clear Layouts</Text>
                    </TouchableOpacity>
                </View>


                <FlatList
                    renderItem={_renderItem}
                    data={files}
                    numColumns={3}
                    keyExtractor={files.index}
                />




            </View>
        </View>
    );
}
