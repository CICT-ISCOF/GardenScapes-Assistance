import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        opacity: .97
    },
    image: {
        height: 60,
        width: 60,
        marginRight: 20,
        marginLeft: 5
    },

    nameContainer: {
        flex: 3
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 7

    },
    qtty: {
        color: 'gray',
        transform: [{ translateY: 5 }]
    },
    qttyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -7,
        transform: [{ translateY: 5 }]

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
        flex: 1.5,
    },
    price: {
        fontSize: 25,
        color: '#FF5500'
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


})