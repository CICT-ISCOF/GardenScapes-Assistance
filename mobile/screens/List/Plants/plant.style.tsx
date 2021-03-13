import { StyleSheet } from 'react-native'

export default StyleSheet.create( {
    card: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        opacity: .97
    },
    image: {
        height: 80,
        width: 80,
        marginRight: 10,
        borderRadius: 10
    },
    nameContainer: {
        flex: 2
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 7,
        textTransform: 'capitalize'
    },
    qtty: {
        color: 'gray',
        transform: [ { translateY: 5 } ],
        fontSize: 11,
        marginTop: -5,

    },
    qttyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -13,
        transform: [ { translateY: 5 } ]
    },
    qttyButton: {
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderColor: 'rgba(150,150,150,.2)'
    },
    qttyButtonText: {
    },
    qttyButtonText1: {
        borderColor: 'rgba(150,150,150,.2)',
        margin: 20
    },
    priceContainer: {
        flex: 1.4,
    },
    price: {
        fontSize: 17,
        color: '#FF5500',
        fontWeight: '600'
    },
    button: {
        padding: 10,
        backgroundColor: '#FFC000',
        borderRadius: 3,
        marginTop: 14
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
} )