import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Button, Overlay } from 'react-native-elements';
import { Camera } from 'expo-camera';


function SnapScreen(props) {

    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    var camera = useRef(null);

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    var handleTakePic = async () => {
        setLoading(true)
        if (camera) {
            let photo = await camera.takePictureAsync();
            console.log('photo :', photo);
            setLoading(false)
        }
    }

    if (props.isFocused) {
        if (hasPermission) {
            return (
                <View style={{ flex: 1 }}>
                  <Camera key='camDiv' style={{ flex: 1, justifyContent: 'flex-end' }}
                type={type}
                flashMode={flash}
                ref={ref => (camera = ref)}
                >
                    <View style={SnapStyle.btnDiv}>
                        <Button
                        buttonStyle={SnapStyle.optionBtn}
                        icon={<Ionicons name='ios-reverse-camera' size={40} color='white' />}
                        onPress={() => { setType( type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back ); }}
                        />
                        <Button
                        buttonStyle={SnapStyle.optionBtn}
                        icon={<Ionicons name='ios-flash' size={40} color='white' />}
                        onPress={() => { setFlash( flash === Camera.Constants.FlashMode.torch ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch ); }}
                        />
                    </View>
    
                    <Overlay isVisible={loading} fullScreen={true} overlayStyle={{justifyContent:'center', alignItems:'center', backgroundColor: 'transparent'}}>
                        <View>
                            <ActivityIndicator size={'large'} color={'white'} animating={loading}/>
                            <Text style={{ marginTop: 10, color: 'white'}}>Loading...</Text>
                        </View>
                    </Overlay>
    
                    <Button
                    buttonStyle={SnapStyle.optionBtn}
                    icon={<Ionicons name='md-add-circle' size={50} color='white' />}
                    onPress={() =>handleTakePic()}
                     />
                </Camera>
                </View>
            );
        }else {
            return (
                <View style={{ flex: 1 }}>
                </View>
            );
        }
    } else {
        return (
            <View style={{ flex: 1 }}>
            </View>
        );
    }
}

export default withNavigationFocus(SnapScreen);

var SnapStyle = StyleSheet.create({
    btnDiv: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 20,
    },
    optionBtn: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
    }
});
