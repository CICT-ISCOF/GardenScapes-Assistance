import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Margin from '../../shared/margin';
import Categories from './category';
import Content from './content';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {


    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ headerColor, setHeaderColor ] = useState( 'flat-green' )
    const [ category, setcategory ] = useState( 1 )


    return (
        <View style={ {
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1
        } }>
            <HeaderImage title="GARDENSCAPES" title1="ASSISTANCE" color={ headerColor } back={ false } />
            <View style={ {
                padding: 20
            } }>
                <View style={ [ styles.searchContainer, { backgroundColor: Colors[ colorScheme ].background }, headerColor == "orange" ? { borderColor: '#FEB200' } : { borderColor: '#1ED760' } ] }>
                    <View style={ [ styles.iconHolder, headerColor == "orange" ? { backgroundColor: '#FEB200', shadowColor: "#FEB200", } : { backgroundColor: '#1ED760', shadowColor: "#1ED760" } ] }>
                        <Ionicons name="md-search-outline" size={ 24 } color="white" />
                    </View>
                    <TextInput selectionColor={ headerColor == "orange" ? '#FEB200' : '#1ED760' } style={ [ styles.input, { color: Colors[ colorScheme ].text } ] } placeholder='Search' />
                </View>
            </View>
            <Categories
                header={ ( color: any ) => {
                    setHeaderColor( color )
                    if ( color == 'orange' ) {
                        setcategory( 2 )
                        return
                    }
                    setcategory( 1 )

                }
                }
                color={ category == 2 ? 'orange' : 'green' }


            />
            <Content color={ headerColor } category={ category } />
        </View>
    );
}
