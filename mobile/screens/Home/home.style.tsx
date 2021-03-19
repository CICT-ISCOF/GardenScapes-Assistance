import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create( {
    searchContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#1ED760',
        height: 35,
        borderRadius: 5,
        flexDirection: 'row'
    },
    iconHolder: {
        width: 40,
        height: '100%',
        backgroundColor: '#1ED760',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: -2,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    input: {
        paddingLeft: 20,
        height: '100%',
        width: '78%'
    },
    categoryContainer: {
        flexDirection: 'row',
        maxHeight: 50,
        paddingLeft: 10,
        marginBottom: 10
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 11,
        borderRadius: 7,
        marginRight: 10
    },
    buttonText: {
        textTransform: 'capitalize'
    },
    productContainer: {
        width: ( Dimensions.get( 'window' ).width / 2 ) - 10,
        borderRadius: 10,
        paddingBottom: 20,
        marginLeft: 7,
        marginBottom: 7
    },
    plantName: {
        marginLeft: 5,
        marginTop: 12,
        fontSize: 20,
        textTransform: 'capitalize'
    },
    quantity: {
        marginLeft: 5,
        color: 'gray',
        fontSize: 11
    },
    productImage: {
        minHeight: 180,
        width: '100%',
        resizeMode: 'stretch',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    price: {
        fontSize: 20,
        color: '#FF5500',
        fontWeight: '500',
        marginLeft: 5,
        marginTop: 7
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
    },
    badge: {
        paddingHorizontal: 10,
        backgroundColor: '#FEB400',
        minWidth: 10,
        alignSelf: 'flex-start',
        borderRadius: 3,
        marginLeft: 10,
        marginTop: -10,
        marginBottom: -7,
        paddingVertical: .2
    },
    badgeText: {
        color: 'white'

    },

    list: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)'
    }
} )