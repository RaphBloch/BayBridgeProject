import {StyleSheet, View, Text, ScrollView,TouchableOpacity,
    SafeAreaView, FlatList, Image ,Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import React ,{useContext, useEffect,useState} from 'react';


const Item = ({item}) => {

    const navigation = useNavigation();
    const [title,setTitle]=useState('');

    useEffect(()=> 
    {
        if(item.title)
            setTitle(item.title);
        else
            setTitle(item.original_title);
    },[]);


    return (
        <View style={styles.item}>

            <Image style={{flex: 1, width: 45 , height : 70 , resizeMode : 'contain'}} source={{uri :  'https://image.tmdb.org/t/p/original' + item.poster_path }} > 

            </Image>
            <TouchableOpacity  style={{flex:4,borderRadius: 20, alignItems : 'center'}} onPress={()=> navigation.navigate(
            'MovieDetails',
            {
                title : item.title,
                overview: item.overview,
                image : 'https://image.tmdb.org/t/p/original' + item.poster_path,
                rating : item.vote_average
            }
        )}> 
                 <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}


const Movies = (props) => 
{

    const navigation =  useNavigation();
    const [movies,setMovies]=useState([]);


    useFocusEffect(
        React.useCallback(()=> 
        {
            async function getMoviesFromApiAsync(){
                try {
                  const response = await fetch(
                    'https://api.themoviedb.org/3/movie/popular?api_key=247082c0fd9674d69377c506d2b38e04&amp;amp;language=en-US&amp;amp;page=1'
                  );
                  const json = await response.json();
                  setMovies(json.results);
                  //console.log(json.results);
                } catch (error) {
                  console.error(error);
                }
              };
    
              getMoviesFromApiAsync();
        },[])
    )


    const renderItem = ({ item }) => (
        <Item item={item} />
      );
    return(
        <View style={styles.container}>
                <Text style={{
                 textAlign : 'center',
                 fontSize: 17,
                 fontWeight: 'bold',
                 margin : 8}}> Most popular movies on the WebSite</Text>
             <FlatList  style={styles.list}
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item.id}/>
        </View>
           
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor : '#ffffe4'
    },
    list :
    {
        flex : 3
    },
    button : 
    {
        flex : 1
    },
    item: {
      backgroundColor: '#ff55ff',
      padding: 20,
      //height : 70,
      flex : 1,
      flexDirection : 'row',
      marginVertical: 8,
      textAlign : 'center',
      alignItems : 'center',
      marginHorizontal: 10,
    },
    title: {
      textAlign : 'center',
      fontSize: 16,
      color : 'darkblue',
      fontWeight: 'bold'
    },
  });



export default Movies;
