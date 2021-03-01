import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    searchContainer: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#1ED760',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    iconHolder: {
        width: 50,
        height: '100%',
        backgroundColor: '#1ED760',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    input: {
        paddingLeft: 20,
        height: '100%',
        width: '78%'
    },



    categoryContainer: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: -20
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 11,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderRadius: 30,
        elevation: 10,
        marginRight: 10
    },
    buttonText: {},



    productContainer: {
        width: 250,
        height: '90%',
        borderRadius: 10,
        marginRight: 50
    },
    plantName: {
        marginLeft: 10,
        marginTop: 12,
        fontSize: 27,
        fontWeight: '600'
    },
    quantity: {
        marginLeft: 10,
        color: 'gray'
    },
    productImage: {
        marginTop: 10,
        width: '100%',
        resizeMode: 'stretch',
        height: 250
    },
    price: {
        fontSize: 30,
        padding: 20,
        color: '#FF5500'
    },
    addToCartButton: {
        width: 70,
        height: 70,
        backgroundColor: '#E61487',
        borderRadius: 50,
        alignSelf: 'flex-end',
        marginTop: -50,
        marginRight: -10,
        alignItems: 'center',
        justifyContent: 'center'
    }



})