import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import styles from './edit.plant.style'
import BottomSheet from 'react-native-animated-bottom-sheet';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import Margin from '../../../shared/margin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Variety from '../../Add/Plants/variety';
import Inputs from '../../Add/Plants/inputs';
import { Ionicons } from '@expo/vector-icons';
import ConfirmBottomSheet from '../../../shared/confirm'

export default function EditPlants() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [images, setimages] = useState([1, 3, 4, 5, 6, 7])


    const [files, setfiles]: any = useState([])
    const [old_varieties, setold_varieties]: any = useState([1, 2, 3, 4, 5, 6])

    async function addImages() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setfiles([...files, result]);
        }
    }


    const VarietiesRef: any = useRef();
    const [varieties, setVarieties]: any = useState([])

    const VarietySheet = () => (
        <Variety
            data={(data: any) => {
                setTimeout(async () => {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });

                    if (!result.cancelled) {
                        setVarieties([...varieties, { name: data, image: result }]);
                    }
                }, 500);
            }}
            blur={(value: any) => {
                if (value) {
                    VarietiesRef.current.close()
                }
            }}
        />
    );

    const ConfrimSheetRef: any = useRef();
    const ConfrimSheet = () => (
        <ConfirmBottomSheet
            choices={['Delete']}
            blur={(value: any) => {
                if (value == true) {
                    ConfrimSheetRef.current.close()

                }
            }}
            calback={(calback: any) => {
                calback()
            }}
        />
    )




    return (
        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background, }}>
            <Margin />
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={{
                    margin: 10
                }}>
                <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} >

                <Text style={[{ fontSize: 20, fontWeight: '200', color: Colors[colorScheme].text, marginVertical: 20, marginBottom: 10 }, images.length == 0 ? { position: 'absolute', left: -500 } : {}]}>Old Images</Text>
                <ScrollView style={[styles.imageScrollView, images.length == 0 ? { position: 'absolute', left: -500 } : {}]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        images.map((image: any, index: any) => {
                            return (
                                <TouchableOpacity onLongPress={() => {
                                    ConfrimSheetRef.current.open()
                                }}>
                                    <Image key={index} style={styles.productImage} source={require('../../../assets/placeholders/green.png')} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>


                <Text style={[{ fontSize: 20, fontWeight: '200', color: Colors[colorScheme].text, marginVertical: 20, marginBottom: 10 }, old_varieties.length == 0 ? { position: 'absolute', left: -500 } : {}]}>Old Varieties</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {old_varieties.map((variety: any, index: any) => {
                        return (
                            <TouchableOpacity key={index} onLongPress={() => {
                                ConfrimSheetRef.current.open()

                            }}>
                                <Image style={styles.cardImage} source={require('../../../assets/placeholders/green.png')} />
                                <Text style={{
                                    textAlign: 'center',
                                    color: Colors[colorScheme].text
                                }}>{variety.name}</Text>

                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>


                <Text style={[{ fontSize: 20, fontWeight: '200', color: Colors[colorScheme].text, marginVertical: 20, marginBottom: 10 }, files.length == 0 ? { position: 'absolute', left: -500 } : {}]}>Newly Uploaded Images</Text>

                <ScrollView style={[styles.imageScrollView, files.length == 0 ? { position: 'absolute', left: -500 } : {}]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        files.map((image: any, index: any) => {
                            return (
                                <TouchableOpacity onLongPress={() => {
                                    alert('nice')
                                }}>
                                    <Image key={index} style={styles.productImage} source={{ uri: image['uri'] }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>


                <ScrollView style={styles.buttonScrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        addImages()
                    }}>
                        <Text style={styles.smallButtonsText}>Add Images</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        setfiles([])
                    }}>
                        <Text style={styles.smallButtonsText}>Clear Uploaded Images</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        VarietiesRef.current.open()
                    }}>
                        <Text style={styles.smallButtonsText}>Add Varieties</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        setVarieties([])
                    }}>
                        <Text style={styles.smallButtonsText}>Clear Added Varieties</Text>
                    </TouchableOpacity>

                </ScrollView>



                <Text style={[{ fontSize: 20, fontWeight: '200', color: Colors[colorScheme].text, marginVertical: 20, marginBottom: 10 }, varieties.length == 0 ? { position: 'absolute', left: -500 } : {}]}>New Varieties</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {varieties.map((variety: any, index: any) => {
                        return (
                            <View key={index}>
                                <Image style={styles.cardImage} source={{ uri: variety.image.uri }} />
                                <Text style={{
                                    textAlign: 'center',
                                    color: Colors[colorScheme].text
                                }}>{variety.name}</Text>

                            </View>
                        )
                    })}
                </ScrollView>




                <Inputs data={(data: any) => {
                }} texts={''} />

                <View style={{ paddingHorizontal: 50, marginTop: -50 }}>
                    <TouchableOpacity onPress={() => {

                    }} style={styles.button} >
                        <Text style={styles.buttonText}>Update Monstera</Text>
                    </TouchableOpacity>
                </View>
                <Margin />
            </ScrollView>

            <BottomSheet
                ref={VarietiesRef}
                renderContent={VarietySheet}
                visibleHeight={Dimensions.get('window').height / 1.5}
            />

            <BottomSheet
                ref={ConfrimSheetRef}
                renderContent={ConfrimSheet}
                visibleHeight={Dimensions.get('window').height / 3.5}
            />


        </View>
    );
}
