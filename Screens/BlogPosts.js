import { NavigationContainer, useNavigationState, NavigationHelpersContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, View, Image, BackHandler, ToastAndroid, ImageBackground, Alert} from "react-native";
//import {Html5Entities} from "html-entities";
import { NativeBaseProvider, Text, Spinner,  Spacer, Icon, Button, Factory, Divider, FlatList, Flex, useToast, Pressable, Container, Heading, Center, ScrollView, Box, AlertDialog, VStack} from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, AdEventType, BannerAdSize, BannerAd, TestIds} from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeBar from "../Components/HomeBar";
import * as Application from 'expo-application';
import AppMenu from "../Components/AppMenu";
import LoadingScreen from './LoadingScreen';
import AppBar from '../Components/AppBar';
import {db} from '../Firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { doc, query, where, orderBy, limit, setDoc, startAfter, getDoc, getDocs, collection } from "firebase/firestore";



const auth = getAuth();




  // DO ✔    

  const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2857598948';

  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true

  });

function BlogPosts({navigation}) {
  const [loaded, setLoaded] = useState(false);
  const [showLoad, setShowLoad] = React.useState(false);
  const [category, setCategory] = useState("Forum");
  const [data, setData] = useState([]);

  const [finish, setFinish] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [user, setUser] = useState(null);

    const [text, setText] = useState('');
    const [selected, setSelected] = useState("Home");

  const [lastSeen, setLastSeen] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(null);

    const [complete, setComplete] = useState(false);
    const [logged, setLogged] = useState(true);

  const [updatedData, setUpdatedData] = useState(data.length);


  //Exit App Code
const navIndex = useNavigationState(s => s.index);

const handleBackPress = () => {
  ToastAndroid.show('Closing SDA Sabbath School', ToastAndroid.LONG);
 BackHandler.exitApp()
}

useEffect(() => {
  if (Platform.OS === 'android' && navIndex === 0) {
    const backListener = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return backListener.remove;
  }
}, [handleBackPress]);

//Ended
  
//Todays Lessons Manager

useEffect(() => {
  //TodaysLesson()
 
}, []);


 const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/8109925629';

  const [isOpen, setIsOpen] = useState(false); 
  

  const onClose = () => setIsOpen(false); 
  const cancelRef = React.useRef(null); 
 
 
  useEffect(() =>
{
  //Announcer();

}, []);

  
  const ImageExt= Factory(Image);
  const ImageBg= Factory(ImageBackground);
  //const StatusB= Factory(StatusBar);
  const alerter = useToast();
const [header, setHeader] = useState('');
//Save AppBar Title

  //const entities= new Html5Entities();

   //Show Ad
   useEffect(() => {
    //setShowLoad(true)
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
       
      });
  
      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
         
          interstitial.load();
        }
      );
  
      // Start loading the interstitial straight away
      interstitial.load();


      const timer = setTimeout(() =>{setShowLoad(true)}, 500);

    // Unsubscribe from events on unmount
    return () => {
      clearTimeout(timer);
      unsubscribe();
      unsubscribeClosed();
     
    }
    
      //return unsubscribe;
    }, []);
  
    // No advert ready to show yet
  
    
    function ShowAd()
    {
      if(interstitial.loaded)
      {
      interstitial.show().catch(error => console.warn(error));
      }
    }



    useEffect(() => {
  
  
        const loadDataStudies = async () => {
      //setIsLoading(true);
         
              //const userEntries; 
      const q = query(collection(db, "BibleStudy", "Entries", "entryData"), orderBy("creationDate", "desc"), limit(5));
      
              const list = [];
           
              const documentSnapshots = await getDocs(q);
      
              let documentData = documentSnapshots.docs.map(document => document.data());
      
              const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
              console.log("LAST SEEN =>", lastVisible);
      
              setLastSeen(lastVisible);
      console.log(documentData.length)
                setData(documentData);
                  setLoaded(true);
    
                //setIsLoading(false);
      
                 
        
        }
      
        loadDataStudies()
      
      
      
        //setFinish((finish) => !finish)
      
      
      }, [setData]);
    
    
      const loadMoreStudies = async () => {
        setIsRefreshing(true);
        if(lastSeen == undefined)
        {
          setLoadMore("That's all for now");
        }
        else{
        setLoadMore("Loading more...")
        }
      
        //const userEntries; 
      const q = query(collection(db, "BibleStudy", "Entries", "entryData"), orderBy("creationDate", "desc"), startAfter(lastSeen), limit(5));
      
        const list = [];
      
        const documentSnapshots = await getDocs(q);
      
        let documentData = documentSnapshots.docs.map(document => document.data());
      
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      
        setLastSeen(lastVisible);
      
        list.push(documentData);
      
        //const newArr = dataFriends.concat(documentData);
        if(documentData.length < 1)
      {
        setLoadMore("That's all for now");
      }y
        const newArr = [...data, ...documentData];
      
        console.log(newArr.length)
      
                setData(newArr);
                //setLoadMore(null);
      setIsRefreshing(false);
           
      
      }

      const entryEmpty = () =>
      {
      
          return   (<Center> 
            { loadMore == null ? <Box color="gray.500" mt="20%"><Spinner size="lg" accessibilityLabel='Loading Data' /> <Heading size="md" color="gray.300">Loading ... </Heading></Box>: <Box color="gray.500" mt="20%"><Spinner size="lg" accessibilityLabel='Loading Data' /> <Heading size="md" color="gray.300">NO DATA RETRIEVED!! Check your network connection </Heading></Box> }</Center>);
      }
      
      
      
      const entryFooter = () =>
      {
      
          return   (<Center py="3">{ data.length > 0 ? <Heading color="gray.600" size="md">
          <Text style={{fontFamily: "FuturaBold"}}>{loadMore}</Text></Heading> : null }</Center>);
      }

const renderItem = ({ item }) => (  <Box mr="5" mb="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} p="3">
<Pressable onPress = { ()=> {navigation.navigate("StudyContent", {id: item.id, title: item.title, post: item.content, photoURL: item.photoURL, Date: item.creationDate, array: data })}}>
<ImageExt alt="Loading..." w="100%" h="165px" source={{uri: item.photoURL}} />

<Heading  p="2" color="gray.300" size="xs"><Text style={{fontFamily: "FuturaBold"}}>
    BIBLE STUDY
</Text>
</Heading>

<Heading  p="2" color="gray.300" size="md"><Text style={{fontFamily: "FuturaBold"}}>
  {Truncate(item.title, 70)}
</Text>
</Heading>


<Text fontSize="18" style={{fontFamily: "Futura"}}>
  {Truncate(item.content, 70)}
</Text>

</Pressable>

<Button onPress = { ()=> {navigation.navigate("StudyContent", {id: item.id, title: item.title, post: item.content, photoURL: item.photoURL, Date: item.creationDate, array: data })}} w="100px" ml="60%" mt="5">Read more</Button>

</Box>);

     
  if(!showLoad)
  {

    return <LoadingScreen />
  }
 

else
{
  
    return (
   
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <Box bg="dark.50" h="100%">
            <AppBar title="Bible Study" />
          
            <Box rounded="lg" h="75%" px="5" py="5">
    
<Divider />

{

    !loaded ?
<>
<Center py="8"><Spinner size="lg" mt="30%" accessibilityLabel='Loading Bible study' /></Center>
    </>
    :
<>

<FlatList mt="4" h="65%" data={data} extraData={updatedData} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={loadMoreStudies} onEndReachedThreshold={0.5}
refreshing={isRefreshing} />
    </>


    }

    



</Box>

      <Box justifyContent={"center"}>
      <BannerAd 
unitId={adUnitId}
size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER }
requestOptions={{
  requestNonPersonalizedAdsOnly: true
}}
/>
</Box>

</Box>
      </NativeBaseProvider>
    );

  }

}

const styles= StyleSheet.create ({

    showData: {
        justifyContent: "center",
        alignItems: "center",
        flex:1
          }

});


function Truncate(str, length)
  {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  
  }

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion +  Application.nativeBuildVersion;


export default BlogPosts;
