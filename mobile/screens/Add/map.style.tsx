import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create( {
    mainContainer: {
        padding: 20,
        height: 850,
        alignItems: 'center',
    },
    bottomSheetHeader: {
        width: 70,
        height: 10,
        borderRadius: 30,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        transform: [ { translateY: -10 } ]
    },
    tab: {
        flexDirection: 'row',
        position: 'relative',
        zIndex: 9,
    },
    locationWrapper: {
        marginTop: 50,
        flexDirection: 'row',
        position: 'relative',
        zIndex: 9,
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    location: {
        flexDirection: 'row', alignItems: 'center', borderBottomColor: 'rgba(150,150,150,.1)',
        borderBottomWidth: 1, width: '100%', padding: 10
    },
    locationICon: {
        padding: 4,
        borderRadius: 50,
        backgroundColor: 'rgba(220,166,105,.1)'
    },
    locationText: {
        flexGrow: 1,
        flexShrink: 1,
        paddingHorizontal: 20,
        marginTop: 5
    },

    instructions: {
        zIndex: 9,
        position: 'absolute',
        width: Dimensions.get( 'screen' ).width
    },
    instructionsText: {
        fontSize: 20,
        padding: 20,
    },
    button: {
        position: 'absolute',
        bottom: -50,
        alignSelf: 'center',
        left: '35%',
        backgroundColor: '#0C87EF',
        padding: 10,
        borderRadius: 3
    },
    button1: {
        padding: 7,
        borderRadius: 3,
        marginRight: 10,
        minWidth: 80,
        paddingVertical: 7,
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    map: {
        width: Dimensions.get( 'window' ).width,
        height: Dimensions.get( 'window' ).height,
        position: 'absolute',
        top: 0,
    },
    fetching: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 9,
        top: '50%',
        color: 'red'
    }

} )