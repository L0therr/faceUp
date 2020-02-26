import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'


function GalleryScreen(props) {

    const [picList, setPicList] = useState([]);

    useEffect(() => {
        var reqPics = props.getPicList;
        setPicList(reqPics);
    }, [props.getPicList]);

    var picListDis = picList.map((pic, i) => {

        return (
                <Card key={i} image={{ uri: pic }}>
                    <View style={{flex:1}}>
                        <Text style={{marginBottom: 10}}>
                            Your picture n° {i + 1} !!
                        </Text>
                    </View>
                </Card>
        );
    });

    return (
        <ScrollView>
            {picListDis}
        </ScrollView>
    );
}

function mapStateToProps(state) {
    return { getPicList: state.addReducer}
}

export default connect(
    mapStateToProps, 
    null
  )(GalleryScreen);