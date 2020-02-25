import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button, Icon } from 'react-native-elements'


function GalleryScreen({ navigation }) {
    return (
        <ScrollView>
            <Card
                title='HELLO WORLD'
                image={require('../assets/picture-3.jpg')}>
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    titleStyle={{marginLeft:10}}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW'
                />
            </Card>
        </ScrollView>
    );
}

export default GalleryScreen;

var HomeStyle = StyleSheet.create({
});
