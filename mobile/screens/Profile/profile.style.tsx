import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create( {
    name: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 28,
    },
    address: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    cover: {
        height: 250,
        width: '90%',
        resizeMode: 'cover',
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        margin: 20
    },
    profileContainerMain: {
        borderRadius: 100,
        marginTop: -100,
        height: 205,
        width: 205,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 2,
    },
    profileContainer: {
        borderRadius: 100,
        borderWidth: 10,
        borderColor: 'gray',
        height: 198,
        width: 198,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        height: 190,
        width: 190,
        borderRadius: 50 * 2,
        borderWidth: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        borderTopColor: 'rgba(150,150,150,.2)',
        borderTopWidth: 1,
        alignItems: 'center',
        width: Dimensions.get( 'window' ).width,
        marginTop: 50,
        paddingTop: 50
    },
    tab: {
        width: '50%',
        height: 35,
    },
    tabTitle: {
        textAlign: 'center',
    },
    tabNumber: {
        textAlign: 'center',
        color: '#02AF50',
        fontSize: 30
    },

    cameraContainer: {
        backgroundColor: '#D8DADF',
        alignSelf: 'center',
        marginBottom: -10,
        borderRadius: 50,
        padding: 7,
        borderWidth: 1,
        borderColor: 'white',
        transform: [
            { translateX: 70 },
            { translateY: -60 }
        ]
    }
} )