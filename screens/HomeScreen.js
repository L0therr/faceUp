import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';


function HomeScreen({ navigation, addUserNameToStore }) {
    const [inputText, setInputText] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('username', function(error, data){
            if (data !== null) {
                setIsLogged(true);
                setUsername(data);
            }
        });
    }, []);

    var handlePress = () => {
        if (isLogged) {
            navigation.navigate('App')
        } else {
            if (inputText !== "") {
                AsyncStorage.setItem('username', inputText);
            }
        }
    }

    var toReturn = [];
    if(isLogged) {
        toReturn = [
        <Text key='welcomeback'>Welcome back {username}</Text>
        ]
    } else {
        toReturn = [
            <Input
                key="input"
                placeholder='Username'
                leftIcon={<Ionicons name='ios-planet' size={25} color={'#d52c40'} />}
                leftIconContainerStyle={{marginRight:10}}
                onChangeText={(value) => setInputText(value)}
                value={inputText}
            />
        ]
    }

    return (
        <ImageBackground source={require("../assets/home.jpg")} style={HomeStyle.homeContainer} >
            <StatusBar hidden={true} />
            <View style={HomeStyle.formContainer}>
                {toReturn}
                <Button
                    buttonStyle={HomeStyle.button}
                    title="Go to Gallery"
                    icon={<Ionicons name='ios-rocket' size={25} color={'white'} />}
                    titleStyle={{marginLeft:10}}
                    onPress={() => handlePress()}
                />
            </View>
        </ImageBackground>
    );
}

export default HomeScreen;

var HomeStyle = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    formContainer: {
        height: 100,
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'black'
    }
});
