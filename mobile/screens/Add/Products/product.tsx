import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, Platform, Dimensions, Animated, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductInputs from './inputs-products';
import GrowthCalendar from './growth-calendar';
import styles from './product.style';
import * as ImagePicker from 'expo-image-picker';
import SunAndWaterProducts from './sun-and-water';
import BottomSheet from 'react-native-animated-bottom-sheet';
import Guide from './guide'
import LayoutIdeas from './layout-ideas';
import Companion from './companion'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import GrowthCalendarGrowing from './growth-calendar-growing';

export default function AddProducts(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const SunAndWaterRef: any = useRef();
    const [sunAndWater, setsunAndWater]: any = useState({})
    const SunAndWaterSheet = () => (
        <SunAndWaterProducts
            data={(data: any) => {
                setsunAndWater(data)
            }}
            blur={(data: any) => {
                if (data) {
                    SunAndWaterRef.current.close()
                }
            }}
        />
    );

    const GuideRef: any = useRef();
    const [guide, setGuide]: any = useState({})
    const GuideSheet = () => (
        <Guide
            data={(data: any) => {
                setsunAndWater(data)
            }}
            blur={(value: boolean) => {
                if (value) {
                    GuideRef.current.close()
                }
            }}
        />
    );

    const LayoutRef: any = useRef();
    const [layouts, setLayouts]: any = useState([])
    const LayoutSheet = () => (
        <LayoutIdeas
            data={(data: any) => {
                setLayouts(data)
            }}
            blur={(value: any) => {
                if (value) {
                    LayoutRef.current.close()
                }
            }}
        />
    );

    const CompanionRef: any = useRef();
    const [companions, setcompanions]: any = useState([])
    const CompanionSheet = () => (
        <Companion
            data={(data: any) => {
                setTimeout(async () => {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });

                    if (!result.cancelled) {
                        setcompanions([...companions, { name: data.name, type: data.type, image: result }]);
                    }
                }, 500);
            }}
            blur={(value: any) => {
                if (value) {
                    CompanionRef.current.close()
                }
            }}
        />
    );

    const growthCalendarRef: any = useRef();
    const [growthCalendar, setgrowthCalendar]: any = useState([])
    const growthCalendarSheet = () => (
        <GrowthCalendar
            data={(data: any) => {
                setgrowthCalendar(data)
            }}
            blur={(value: any) => {
                if (value) {
                    growthCalendarRef.current.close()
                    setTimeout(() => {
                        growthCalendarGrowingRef.current.open()
                    }, 500);
                }
            }}
        />
    );


    const growthCalendarGrowingRef: any = useRef();
    const [growthCalendarGrowing, setgrowthCalendarGrowing]: any = useState([])
    const growthCalendarGrowingSheet = () => (
        <GrowthCalendarGrowing
            data={(data: any) => {
                setgrowthCalendarGrowing(data)
            }}
            blur={(value: any) => {
                if (value) {
                    growthCalendarGrowingRef.current.close()
                }
            }}
        />
    );


    function sell() {
        if (files.length == 0) {
            alert('Images could not be empty')
            return
        }
        if (sunAndWater.sun == undefined || sunAndWater.water == undefined) {
            SunAndWaterRef.current.open()
            return
        }
        if (guide.land_preparation == undefined) {
            GuideRef.current.open()
            return
        }
        if (layouts.length == 0) {
            LayoutRef.current.open()
            return
        }
        if (companions.length == 0) {
            CompanionRef.current.open()
            return
        }
        if (
            plantInfo.name == undefined
        ) {
            alert('Please fill up product information')
            return
        }

        if (
            plantInfo.name == '' ||
            plantInfo.name_local == '' ||
            plantInfo.descriptoin == '' ||
            plantInfo.soilPh == '' ||
            plantInfo.soil_type == '' ||
            plantInfo.soil_depth == '' ||
            plantInfo.row_distance == '' ||
            plantInfo.plant_distance == '' ||
            plantInfo.price == '' ||
            plantInfo.quantities == '' ||
            plantInfo.unit == ''
        ) {
            alert('One or more fields in Product Information should not be left empty')
            return
        }

        const data = {
            images: files,
            sunAndWater: sunAndWater,
            guide: guide,
            layoutIdeas: layouts,
            companions: companions,
            plantingCalendar: growthCalendar,
            growingCalendar: growthCalendarGrowing,
            plantInfo: plantInfo

        }
        alert(JSON.stringify(data))
    }


    const [files, setfiles]: any = useState([])

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


    const [plantInfo, setplantInfo]: any = useState({})


    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={[
                props.visibility != true ? {
                    display: 'none'
                } : {}
            ]}>
                <ScrollView style={[styles.imageScrollView, files.length == 0 ? { position: 'absolute', left: -500 } : {}]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        files.map((image: any, index: any) => {
                            return (
                                <Image key={index} style={styles.productImage} source={{ uri: image['uri'] }} />
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

                    <TouchableOpacity style={styles.smallButtons} onPress={() => SunAndWaterRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Sun & Water Needed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => growthCalendarRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Growth Calendar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => GuideRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Guide</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => LayoutRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Layout Ideas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => CompanionRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Add Companion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        setfiles([])
                    }}>
                        <Text style={styles.smallButtonsText}>Clear Images</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        setcompanions([])
                    }}>
                        <Text style={styles.smallButtonsText}>Clear Companions</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {companions.map((companion: any, index: any) => {
                        return (
                            <View key={index}>
                                <Image style={styles.cardImage} source={{ uri: companion.image.uri }} />
                                <Text style={{
                                    textAlign: 'center',
                                    color: Colors[colorScheme].text
                                }}>{companion.name}</Text>
                                <Text style={{
                                    textAlign: 'center',
                                    color: companion.type.includes('Bad') ? 'red' : 'green'
                                }}>{companion.type}</Text>
                            </View>
                        )
                    })}
                </ScrollView>


                <ProductInputs data={(data: any) => {
                    setplantInfo(data)
                }} />

                <View style={{ paddingHorizontal: 50, marginTop: -50 }}>
                    <TouchableOpacity onPress={() => {
                        sell()
                    }} style={styles.button} >
                        <Text style={styles.buttonText}>Confirm & Sell</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 150 }} />
            </ScrollView>

            <BottomSheet
                ref={SunAndWaterRef}
                renderContent={SunAndWaterSheet}
                visibleHeight={Dimensions.get('window').height / 2}
            />

            <BottomSheet
                ref={GuideRef}
                renderContent={GuideSheet}
                visibleHeight={Dimensions.get('window').height / 1.2}
            />

            <BottomSheet
                ref={LayoutRef}
                renderContent={LayoutSheet}
                visibleHeight={Dimensions.get('window').height / 1.25}
            />

            <BottomSheet
                ref={CompanionRef}
                renderContent={CompanionSheet}
                visibleHeight={Dimensions.get('window').height / 1.35}
            />

            <BottomSheet
                ref={growthCalendarRef}
                renderContent={growthCalendarSheet}
                visibleHeight={Dimensions.get('window').height - 50}
            />


            <BottomSheet
                ref={growthCalendarGrowingRef}
                renderContent={growthCalendarGrowingSheet}
                visibleHeight={Dimensions.get('window').height - 50}
            />

        </View>
    );
}
