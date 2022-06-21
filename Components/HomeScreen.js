import {StyleSheet, View, Text, ScrollView,TouchableOpacity,
    SafeAreaView, FlatList ,Button,Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import React ,{useContext, useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => 
{
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            
            <View style={{flex:5, alignItems: 'center',
      justifyContent: 'center' }}>
                <Text style={styles.text}> Welcome to our best Movies App</Text>
                <Image style={{width: 200,height: 200}} source={require('../assets/tmdb.png')}></Image>
                <TouchableOpacity  style={styles.touchable} onPress={() => navigation.navigate('Movies')}>
                    <Text style={[styles.text,{color : 'white'}]} >Movies List</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1 ,  flexDirection: 'row',
                justifyContent: 'space-around'}}>
                <View style={styles.appButtonContainer}>
                    <Icon.Button
                     name='facebook'
                     backgroundColor='#3b5698'
                     style={styles.appButton}>
                        <Text style={styles.appButtonText}>Login with Facebook</Text>
                    </Icon.Button>
                </View>
                <View style={styles.appButtonContainer}>
                    <Icon.Button
                     name='google'
                     backgroundColor='red'
                     style={styles.appButton}>
                        <Text style={styles.appButtonText}> Or with Google</Text>
                    </Icon.Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffe4',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text : 
    {
        fontSize: 18,
        fontWeight : 'bold',
        padding : 5,
        alignSelf: "center"
    },
    touchable : 
    {
        elevation: 4 ,
        backgroundColor: "#22d100",
        borderRadius: 10,
        width : 150,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButton: {
        padding: 8,
        borderRadius: 10,
        alignItems : 'center'
      },
      appButtonText: {
        fontSize: 11,
        color : 'white',
        fontWeight : 'bold',
      },
      appButtonContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '42%',
        height: 80
      },

  });

export default HomeScreen;