import { StyleSheet } from 'react-native'

export default StyleSheet.create( {

    images: {
        width: 390,
        height: 350,
        resizeMode: 'stretch'
    },

    topButtons: {
        borderRadius: 50,
        padding: 7,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginLeft: 10
    },

    card: {
        padding: 15,
        marginBottom: 10
    },

    price: {
        fontSize: 25,
        color: '#FF5500'
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    title: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '500'
    },

    guide: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

    cardImage: {
        resizeMode: 'stretch',
        height: 120,
        width: 100,
        margin: 10,
        borderRadius: 5,
    },

    footer: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        flexDirection: 'row',
        width: '100%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(150,150,150,.2)',
        paddingTop: 0
    },
    button: {
        padding: 15,
        borderRadius: 7,
        minWidth: 120,
        marginRight: 10,
        alignItems: 'center'
    },
    badge: {
        paddingHorizontal: 10,
        backgroundColor: '#FEB400',
        minWidth: 10,
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingVertical: .2,
    },
    badgeText: {
        color: 'white'
    }


} )