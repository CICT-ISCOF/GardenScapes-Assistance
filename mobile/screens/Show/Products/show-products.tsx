import React, { useRef, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ShowHeader from '../show-header';
import Ratings from '../Plants/ratings';
import styles from '../show.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from 'react-native-animated-bottom-sheet';
import ShowProductGuide from './show-product-guide';
import ShowLayoutIdeas from './layout-ideas-show';


export default function ShowProduct( { route }: any ) {

    const { data } = route.params

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const comapanions = [ 1, 2, 3, 4, 5, 6 ]

    const layoutIdeasRef: any = useRef();
    const layoutIdeasSheet = () => (
        <ShowLayoutIdeas data={data.layoutIdeas} />
    );


    const GuidesRef: any = useRef();
    const GuideSheet = () => (
        <ShowProductGuide data={data} />
    );

    const ImageViewerRef: any = useRef();
    const [ companion, setcompanion ]: any = useState( {
        uri: '',
        name: '',
        type: ''
    } )


    const ImageViewerSheet = () => (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: Colors[ colorScheme ].bg,
                alignSelf: 'center',
                transform: [ { translateY: -10 } ]
            }} />
            <View style={{
                backgroundColor: Colors[ colorScheme ].bg,
                padding: 20,
                height: 850,
                alignItems: 'center',
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', flex: 3 }}>{companion.name}</Text>
                    <Text style={{ color: companion.type.includes( 'Bad' ) ? 'red' : 'green', }}>{companion.type} Companion</Text>
                </View>
                <Image style={{
                    width: Dimensions.get( 'screen' ).width,
                    height: Dimensions.get( 'screen' ).height - 150,
                    marginTop: 20
                }} source={{ uri: companion.uri }} />
            </View>
        </View>
    );


    return (
        <View>
            <ScrollView style={{
                backgroundColor: Colors[ colorScheme ].bg
            }}>
                <ShowHeader />

                <ScrollView horizontal={true}
                    style={{
                        marginTop: -60,
                        backgroundColor: 'gray'
                    }}
                    showsHorizontalScrollIndicator={false}>
                    {data.images.map( ( image: any, key: any ) => {
                        return (
                            <Image key={key} style={styles.images} source={{ uri: image }} />
                        )
                    } )}
                </ScrollView>

                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background, flexDirection: 'row' } ]}>
                    <View style={{
                        flex: 3
                    }}>
                        <Text style={styles.price}>₱ {data.plantInfo.price}.00</Text>
                        <Text style={[ styles.name, { color: Colors[ colorScheme ].text } ]}>{data.plantInfo.name}</Text>
                        <Text style={[ styles.name, { color: 'gray', fontWeight: '400', fontSize: 13 } ]}>({data.plantInfo.name_local})</Text>
                        <Text
                            style={[ styles.name,
                            { color: '#08AD4F', fontWeight: '400', fontSize: 13, marginTop: 10, alignItems: 'flex-end' }
                            ]}>
                            {data.plantInfo.quantities} {data.plantInfo.unit} available
                        </Text>


                    </View>
                    <View style={{ flexDirection: 'row' }}>


                        <TouchableOpacity
                            style={styles.guide}
                            onPress={() => {

                                layoutIdeasRef.current.open()
                            }}>
                            <Feather name="layout" size={24} color="gray" />
                            <Text style={{
                                fontSize: 10,
                                marginTop: 7,
                                color: Colors[ colorScheme ].text
                            }}>LayoutIdeas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                GuidesRef.current.open()
                            }}
                            style={[ styles.guide, { marginLeft: 20 } ]}>
                            <Feather name="help-circle" size={24} color="gray" />
                            <Text style={{
                                fontSize: 10,
                                marginTop: 7,
                                color: Colors[ colorScheme ].text
                            }}>Guide</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background, flexDirection: 'row' } ]}>
                    <View>
                        <Ratings sun={data.sunAndWater.sun} water={data.sunAndWater.water} />

                    </View>
                    <View style={{
                        padding: 20
                    }}>
                        <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }}>
                            Soil pH:
                            <Text style={{ color: '#9DC16B' }}> {data.plantInfo.soilPh}</Text>
                        </Text>
                        <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }}>
                            Soil Type:
                         <Text style={{ color: '#9DC16B' }}> {data.plantInfo.soil_type}</Text>
                        </Text>
                        <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }} >
                            Soil Depth:
                             <Text style={{ color: '#9DC16B' }}> {data.plantInfo.soil_depth}</Text>
                        </Text>
                        <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }}>
                            Row Distance:
                             <Text style={{ color: '#9DC16B' }}>  {data.plantInfo.row_distance}</Text>
                        </Text>
                        <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }}>
                            Plant Distance:
                            <Text style={{ color: '#9DC16B' }}>  {data.plantInfo.plant_distance}</Text>
                        </Text>
                    </View>
                </View>


                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Description</Text>
                    <Text style={{
                        color: 'gray'
                    }}>
                        {data.plantInfo.descriptoin}
                    </Text>
                </View>

                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background } ]}>

                    <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Growth Calendar</Text>

                    <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }}>Planting:
                        <Text style={{ color: '#9DC16B' }}>{
                            data.plantingCalendar.map( ( month: any, index: any ) => {
                                return (
                                    ` ${ month },`
                                )
                            } )
                        }</Text>
                    </Text>

                    <Text style={{ marginTop: 7, color: Colors[ colorScheme ].text }}>Harvesting:
                        <Text style={{ color: '#9DC16B' }}>{
                            data.growingCalendar.map( ( month: any, index: any ) => {
                                return (
                                    ` ${ month },`
                                )
                            } )}</Text>
                    </Text>

                </View>


                <View style={{ backgroundColor: Colors[ colorScheme ].background }} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            data.varieties.map( ( companion: any, index: any ) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        setcompanion( companion )
                                        ImageViewerRef.current.open()
                                    }}>
                                        <Image style={styles.cardImage} source={{ uri: companion.uri }} />
                                        <Text style={{
                                            textAlign: 'center',
                                            color: Colors[ colorScheme ].text
                                        }}>{companion.name}</Text>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: companion.type.includes( 'Bad' ) ? 'red' : 'green',
                                            marginTop: 7,
                                            marginBottom: 20,
                                            fontSize: 11
                                        }}>{companion.type} Companion</Text>
                                    </TouchableOpacity>
                                )
                            } )
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 80 }} />
            </ScrollView>
            <View style={[ styles.footer, styles.card, { backgroundColor: Colors[ colorScheme ].background, paddingTop: -0 } ]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate( 'Chatbox', { chatBot: false } )
                    }} style={{

                        marginLeft: 10,
                        borderRightWidth: 1,
                        paddingRight: 20,
                        borderRightColor: 'rgba(150,150,150,.2)',
                    }}>
                    <Ionicons name="chatbubble-outline" size={24} color={Colors[ colorScheme ].text} />
                    <Text
                        style={{ color: Colors[ colorScheme ].text }}
                    >Chat</Text>
                </TouchableOpacity>

                <View style={{ flex: 3 }}></View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate( 'Chatbox', { chatBot: true } )
                    }}
                    style={[ styles.button, {
                        backgroundColor: '#FFC000'
                    } ]}>
                    <Text style={{
                        fontWeight: '500'
                    }}>Buy Now</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        alert( 'Successfully added to cart' )
                    }} style={[ styles.button, {

                        backgroundColor: '#E61487'
                    } ]}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>


            <BottomSheet
                ref={layoutIdeasRef}
                renderContent={layoutIdeasSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.5}
            />

            <BottomSheet
                ref={GuidesRef}
                renderContent={GuideSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />

            <BottomSheet
                ref={ImageViewerRef}
                renderContent={ImageViewerSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />

        </View>
    );
}
