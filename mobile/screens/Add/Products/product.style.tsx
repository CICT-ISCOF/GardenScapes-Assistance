import { StyleSheet } from 'react-native'

export default StyleSheet.create( {
    imageScrollView: {
        height: 200,
        width: '100%',
        backgroundColor: 'lightgray'
    },
    productImage: {
        height: '100%',
        width: 280,
        resizeMode: 'stretch'
    },
    buttonScrollView: {
        width: '100%',
        padding: 15,
        borderBottomColor: 'rgba(150,150,150,.2)',
        borderBottomWidth: 1,
    },
    smallButtons: {
        marginRight: 10,
        borderRadius: 4,
        backgroundColor: '#FBA100',
        padding: 10,
    },
    smallButtonsText: {
        color: 'white'
    },

    input: {
        borderBottomColor: 'rgba(150,150,150,.5)',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0,
        paddingBottom: 15,
        marginTop: 30,
        fontSize: 17
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        color: 'gray',
        textTransform: 'uppercase',
        marginBottom: 30

    },



    button: {
        backgroundColor: '#FBA100',
        width: '100%',
        borderRadius: 2,
        marginTop: 30,
        paddingVertical: 7
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 17,
        padding: 7,
    },

    list: {
        flex: .5,

    },
    cardImage: {
        resizeMode: 'stretch',
        height: 120,
        width: 100,
        margin: 10,
        borderRadius: 5,
    },

    growthTitle: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600'
    },
    growthScrollView: {
        padding: 10
    },
    growthButtons: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: "gray",
        shadowOpacity: 0.34,
        shadowRadius: 2.27,
        borderRadius: 15,
        elevation: 10,
        marginRight: 2,
        backgroundColor: 'orange'
    },


    listButton: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        width: '100%',
        justifyContent: 'center'
    },


} )