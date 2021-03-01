import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    title: {
        fontSize: 25,
        color: '#08AD4F',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title1: {
        fontSize: 25,
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tagLine: {
        color: '#08AD4F',
        marginTop: 10,
        textAlign: 'center'

    },
    Signup: {
        marginTop: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#08AD4F',
        textAlign: 'center'

    },
    input: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0,
        paddingBottom: 5,
        marginTop: 30
    },
    button: {
        backgroundColor: '#08AD4F',
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
    ghost: {
        marginTop: 20,

    },
    ghostText1: {
        textAlign: 'center',
        color: '#2F9B5B'

    },
    ghostText: {
        textAlign: 'center',
        color: 'gray'

    },
})