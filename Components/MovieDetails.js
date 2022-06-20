import {StyleSheet, View, Text, ScrollView,TouchableOpacity,Modal,
    SafeAreaView, FlatList , Alert , Button , Image, Pressable} from 'react-native'; 
import { StatusBar } from 'expo-status-bar';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import React ,{useContext, useEffect,useState} from 'react';
import { useStore  } from '../hooks/Store';
import Icon from 'react-native-vector-icons/FontAwesome';

const Item = ({item}) => {

    const navigation = useNavigation();
  
    const [title,setTitle] = useState('');
    useEffect(()=> 
    {
        //console.log(item.title);
        setTitle(item.title);
    },[]);
    return (
    <View style={styles.item}>
            <Text style={styles.itemtitle}>{title}</Text>
    </View>
    );
}

const MovieDetails = ({route}) => 
{
    const navigation = useNavigation();
    const {favories,setFavories} = useStore();
    const [modalVisible, setModalVisible] = useState(false);
   
    const { title,overview,image,rating} = route.params;

    /**
     * Add the title of the movies to my favorites
     */
    const addToFavories = () => 
    {
        let myfavories = [...favories];
        console.log(title);
        console.log(myfavories);
        let titles = myfavories.map((item)=> item.title);
        if( !titles.includes( title.title))
            
            {
                 myfavories.push(title);
                 Alert.alert('You added ' + title.title + ' to your favorites!');
            }
        setFavories(myfavories);
    } 

    /**
     * Delete the title of the movies from my favorites
     */
    const deleteFromFavories = () => 
    {
        let myfavories = favories.filter((item)=> item.title != title.title);
        if(myfavories.length != favories.length)
            Alert.alert('You deleted ' + title.title + ' from your favorites!');
        setFavories(myfavories);
    } 
    
    

    const renderItem = ({item}) => (
        <Item item={item} />
      );

    return(
        <View style={styles.container}>
            <View style={{flex: 10}} >
                <View style={{flex:1 , marginTop : 20,marginBottom : 1,  alignItems : 'center'}}> 
                        <Text style={styles.title}> {title.title}</Text>
                </View>
                <View style={{ flex : 3,  margin : 8 , borderColor: 'gray',
                alignItems : 'center', borderWidth: 1,padding: 4}}>
                    <Text style={styles.text} >
                        {overview}
                    </Text>
                </View>
                <View style={{flex : 5}}>
                    <Image  style={{ margin : 1, width: 400,height: 300 , resizeMode: 'contain'}} source={{ uri: image}}>
                    </Image>
                </View>
                <View style={{flex:1 , alignItems : 'center' , justifyContent : 'space-around'}}>
                    <Text style={styles.text} > 
                        Note : {JSON.stringify(rating)}
                    </Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}> 
                    <View style={styles.modalView}> 
                        <Text style={styles.text} >Favories</Text>
                        <FlatList data={favories}
                            renderItem={renderItem}
                            keyExtractor={item => item.title}>
                        </FlatList>
                        <Pressable style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.text} >Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={{ flex : 1 ,flexDirection: 'row'}}>
                <View style={styles.appButtonContainer}>
                    <Icon.Button
                     name='plus'
                     backgroundColor='#3b5698'
                     style={styles.appButton}
                     onPress={()=> addToFavories()}>
                        <Text style={styles.appButtonText}>Add to Favorites</Text>
                    </Icon.Button>
                </View>
                <View style={styles.appButtonContainer}>
                    <Icon.Button
                     name='list'
                     backgroundColor='#3bf600'
                     style={styles.appButton}
                     onPress={()=> setModalVisible(true)}
                    >
                        <Text style={styles.appButtonText}> Display Favorites</Text>
                    </Icon.Button>
                </View>
                <View style={styles.appButtonContainer}>
                    <Icon.Button
                     name='minus'
                     backgroundColor='red'
                     style={styles.appButton}
                     onPress={()=> deleteFromFavories()}>
                    <Text style={styles.appButtonText}>Delete from Favorites</Text>
                    </Icon.Button>
                </View>
            </View>
            <View style={{flex:1}}>
                <Icon.Button
                    name='home'
                    backgroundColor='turquoise'
                    style={styles.appButton}
                    onPress={()=> navigation.navigate('Home')}>
                    <Text style={styles.appButtonText}>Go Home</Text>
                </Icon.Button>
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
    itemtitle :
    { 
        fontSize : 10,
        fontWeight : 'bold'
    },
    title : 
    {
        alignSelf : 'center',
        fontSize : 17,
        fontWeight : 'bold',
        padding : 5,
    },
    text : 
    {
        fontSize : 15,
        fontWeight : 'bold',
        fontStyle : 'italic'
    }, 
    modalbutton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
    item: {
        backgroundColor: 'turquoise',
        padding: 10,
        borderRadius : 10,
        marginVertical: 8,
        width : 150,
        textAlign : 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      },
    appButton: {
        padding: 8,
        borderRadius: 10
      },
      centeredView: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        height :200
      },
      modalView: {
        margin: 20,
        height : 200,
        width : 200,
        backgroundColor: "#FFFFE0",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      
      appButtonText: {
        fontSize: 8,
        fontWeight : 'bold'
      },
      appButtonContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignItems : 'center',
        width: '33%',
        height: 80
      },

  });

export default MovieDetails;