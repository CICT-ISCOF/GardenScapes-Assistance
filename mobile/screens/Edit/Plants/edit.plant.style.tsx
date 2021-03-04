import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
        backgroundColor: '#A6A38B',
        padding: 10,
    },
    smallButtonsText: {
        color: 'white'
    },
    cardImage: {
        resizeMode: 'stretch',
        height: 120,
        width: 100,
        margin: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#FF5500',
        width: '100%',
        borderRadius: 3,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 7,
    },


})