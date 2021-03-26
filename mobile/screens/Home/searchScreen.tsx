import React, { useEffect } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './home.style'
import { Ionicons } from '@expo/vector-icons';
import Margin from '../../shared/margin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import collection from '../../constants/firebase-firestore'


export default function SearchScreen( props: any ) {
    const colorScheme = useColorScheme();

    const [ focus, setfocus ] = React.useState( false )
    const [ keyword, setkeyword ] = React.useState( '' )
    const [ type, settype ] = React.useState( 'plant' )

    const [ searchResults, setsearchResults ]: any = React.useState( [] )

    let inputRef: any = React.createRef();

    useEffect( () => {
        if ( props.show == true ) {
            setfocus( true )
            inputRef.focus()
        } else {
            inputRef.blur()
        }

    }, [ props.show ] )

    useEffect( () => {
        if ( keyword != "" && props.headerColor == "orange" ) {
            settype( 'product' )
            collection( 'product' )
                .orderBy( 'plantInfo.name' ).startAt( keyword ).endAt( keyword + '\uf8ff' )
                .get().then( ( products ) => {
                    let productsArray: any = [];
                    products.forEach( ( product ) => {
                        productsArray.push( product.data() )
                        setsearchResults( productsArray )
                    } )
                    setsearchResults( productsArray )

                } )
        }
        if ( keyword != "" && props.headerColor != "orange" ) {
            settype( 'plant' )
            collection( 'plantitas' )
                .orderBy( 'plantInfo.name' ).startAt( keyword ).endAt( keyword + '\uf8ff' )
                .get().then( ( products ) => {
                    let productsArray: any = [];
                    products.forEach( ( product ) => {
                        productsArray.push( product.data() )
                        setsearchResults( productsArray )
                    } )
                    setsearchResults( productsArray )
                } )
        }

    }, [ keyword ] )


    return (
        <View style={[ {
            position: 'absolute',
            zIndex: 999999,
            width: '100%',
            height: '100%',
            backgroundColor: Colors[ colorScheme ].homeBG,
        },
        props.show == false ? { left: -500 } : {}
        ]
        }>
            <View style={[ { padding: 10, position: 'relative', zIndex: 3, flexDirection: 'row', paddingTop: 50, alignItems: 'center' },
            props.headerColor == "orange" ? { backgroundColor: '#FEB200' } : { backgroundColor: '#46D094', }
            ]}>
                <View style={[
                    styles.searchContainer,
                    { backgroundColor: Colors[ colorScheme ].background, width: '85%', marginRight: 10 },
                    props.headerColor == "orange" ? { borderColor: '#FEB200' } : { borderColor: '#46D094' },
                    props.show != true ? { marginTop: -10, } : { marginTop: 10 } ]
                }>
                    <TextInput
                        autoFocus={focus}
                        ref={ref => inputRef = ref}
                        selectionColor={props.headerColor == "orange" ? '#FEB200' : '#46D094'}
                        style={[ styles.input,
                        {
                            color: Colors[ colorScheme ].text,
                            width: '97%',
                        }
                        ]}
                        onChangeText={( text ) => {
                            setkeyword( text )
                        }}
                        returnKeyType="search"
                        clearButtonMode="always"
                        value={keyword}
                        onSubmitEditing={() => {
                            setkeyword( '' )
                            setfocus( false )
                            props.showSearch()
                            props.data( {
                                type: type,
                                value: searchResults
                            } )
                        }}
                        placeholder='Search' />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setkeyword( '' )
                        setfocus( false )
                        props.showSearch()
                    }}>
                    <Text style={{ color: 'white', marginTop: 5 }}>Cancel</Text>
                </TouchableOpacity>
            </View>

            {/* <TouchableOpacity style={styles.list}>
                <AntDesign name="clockcircleo" size={19} color="gray" />
                <Text style={{ color: 'gray', marginLeft: 10 }}>
                    Montserra
                    </Text>
            </TouchableOpacity> */}
            {
                searchResults.map( ( result: any, index: any ) => (
                    <TouchableOpacity
                        onPress={() => {
                            setkeyword( '' )
                            setfocus( false )
                            props.showSearch()
                            props.data( {
                                type: type,
                                value: searchResults
                            } )
                        }}
                        style={styles.list}
                        key={index}>
                        <Ionicons name="md-search-outline" size={19} color="gray" />
                        <Text style={{ color: 'gray', marginLeft: 10 }}>
                            {result.plantInfo.name}
                        </Text>
                    </TouchableOpacity>
                ) )
            }
        </View>
    );
}
