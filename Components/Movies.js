import {StyleSheet, View, Text, ScrollView,TouchableOpacity,
    SafeAreaView, FlatList ,Button} from 'react-native';
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
        <TouchableOpacity onPress={()=> navigation.navigate(
            'MovieDetails',
            {
                title : {title},
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

    const navigation =  useNavigation();

    const renderItem = ({ item }) => (
        <Item item={item} />
      );
    return(
        <View style={styles.container}>
            <Text style={{
                 textAlign : 'center',
                 fontSize: 16,
                 fontWeight: 'bold',
                 margin : 10
            }}> Most popular movies on the WebSite</Text>
             <FlatList  style={styles.list}
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
      backgroundColor: 'cyan',
      padding: 20,
      marginVertical: 8,
      textAlign : 'center',
      marginHorizontal: 10,
    },
    title: {
      textAlign : 'center',
      fontSize: 16,
      fontWeight: 'bold'
    },
  });



export default Movies;
