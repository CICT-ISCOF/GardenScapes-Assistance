import { StyleSheet } from 'react-native'

export default StyleSheet.create( {
    image: {
        height: 150,
        width: 150,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    title: {
        fontSize: 25,
        color: '#46D094',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -30
    },
    title1: {
        fontSize: 25,
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tagLine: {
        color: '#46D094',
        marginTop: 10,
        textAlign: 'center'

    },
    Signup: {
        marginTop: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#46D094',
        textAlign: 'center'

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
    button: {
        backgroundColor: '#46D094',
        width: '100%',
        borderRadius: 30,
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
        color: '#46D094'

    },
    ghostText: {
        textAlign: 'center',
        color: 'gray'

    },
    inputError: {
        borderBottomColor: 'red',
    },
    errorText: {
        marginTop: 3,
        color: 'red',
        opacity: .5
    }
} )