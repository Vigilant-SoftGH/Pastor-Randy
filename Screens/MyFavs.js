import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ToastAndroid, Alert, Image, ImageBackground} from "react-native";
import { NativeBaseProvider, Button, Text, TextArea, Icon, Modal, FlatList, Avatar, VStack, HStack, IconButton, Pressable, Factory, Divider, Spinner, Input, Container, ScrollView, Center, Box, AlertDialog, Flex, Spacer, CheckIcon, Select, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import * as Animatable from 'react-native-animatable';

import {db} from '../Firebase/config';

import {getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, setDoc, startAfter, limit, orderBy, onSnapshot, query, where, doc, getDoc, collectionGroup } from '@firebase/firestore';




const auth = getAuth();

//const User = auth.currentUser;

const firestore = getFirestore();



const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/1964545406';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function MyFavs({route}) {
  const ImageExt = Factory(Image);
  const ImageBg = Factory(ImageBackground);
  const navigation = useNavigation();
  //const route = useRoute();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/8118357385';


 const [userID, setUserID] = useState("");
  const [category, setCategory] = useState("Forum");
  const [data, setData] = useState([]);
  const [favs, setFavs] = useState([]);
  const [updatedData, setUpdatedData] = useState(data.length);
  const [updatedData2, setUpdatedData2] = useState(favs.length);

  const [data2, setData2] = useState([]);
  const [finish, setFinish] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [user, setUser] = useState(null);
  const [userPic, SetUserPic] = useState("");
    const [newUID, SetNewUID] = useState("");
    const [dataStatus, setDataStatus] = useState('');
    const [text, setText] = useState('');
    const [selected, setSelected] = useState("Home");

  const [lastSeen, setLastSeen] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(null);

    const [complete, setComplete] = useState(false);
    const [logged, setLogged] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => {setIsDisabled(false);setIsOpen(false);}
  const onClose2 = () => {setIsDisabled(false);setIsOpen2(false);}
  const [subtitle, setSubtitle] = useState('');
  const [subtitle2, setSubtitle2] = useState('');
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [dataComments, setDataComments] = useState([]);
  const [entryName, setEntryName] = useState("");

  const [databibleAsk, setBibleAsk] = useState([]);
  const [closeLoader, setCloseLoader] = useState(true)

  const [showFavs, setShowFavs] = useState(false);

  /*console.log(data.length)*/
  const [loaded, setLoaded] = useState(false);
  const [showLoad, setShowLoad] = React.useState(false);


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
      const timer = setTimeout(() =>{ setShowLoad(true);}, 500);

      return () => clearTimeout(timer);
      // Unsubscribe from events on unmount
      return () => {
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


    /*
  useEffect(() => {
  
  
    const loadDataFavs = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "SDAMemes", "Entries", "entryData"), orderBy("creationDate"), limit(10));
  
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
  
    loadDataFavs()
  
  
  
    //setFinish((finish) => !finish)
  
  
  }, [setData]);

  */

  const loadMoreFavs = async () => {
    setIsRefreshing(true);
    setLoadMore("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "SDAMemes", "Entries", "entryData"), orderBy("creationDate"), startAfter(lastSeen), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeen(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...data, ...documentData];
  
    console.log(newArr.length)
  
            setData(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }




  //Show Ad
  useEffect(() => {
    //setShowLoad(true)
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
       
      });
  
      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          //setLoaded(false);
          interstitial.load();
        }
      );
  
      // Start loading the interstitial straight away
      interstitial.load();
  
      // Unsubscribe from events on unmount
      return () => {
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

    /*App UI desingn ended*/


  


let dateNow = new Date();
let addData = dateNow.getMilliseconds()+dateNow.getSeconds()+dateNow.getMinutes();


async function getFavs()
{
  try {
 
    const value = await AsyncStorage.getItem('Favs');
  
    //await AsyncStorage.removeItem('Favs');
  
    if (value !== null) {
      const parser = JSON.parse(value);
      console.log(parser.length);

      setFavs(parser);

      //console.log(scoreData);
  
//setFavs();
   
setShowFavs(true);
    }

    else{

      setShowFavs(true);
      //setFavs([]);
    }
  
  
  } catch (e) {
    // saving error
    //setShowScore(true);
  }

}

useEffect(() =>{getFavs()},[]);



//Discard alert
      const DiscardData = () =>
{


  Alert.alert(
    'Discard changes?',
    'You have unsaved data. Are you sure you want to cancel?',
    [
      { text: "Don't cancel", style: 'cancel', onPress: () => {} },
      {
        text: 'Cancel',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => {onClose();onClose2},
      },
    ]
  );
}




//Render Item

const entryEmpty = () =>
{

    return   (<Center> <Box color="gray.500" mt="20%"> <Heading color="gray.500">Favs empty!</Heading>
    
    <Center><ImageExt source={require("../assets/EmptyData.png")} w="150px" h="150px" /> </Center></Box></Center>);
}



const entryFooter = () =>
{

    return   (<Center>{ isLoading ? <Box color="gray.500" mt="20%"><Spinner size="lg" accessibilityLabel='Loading...' /></Box> : null }{loadMore}</Center>);
}

const renderItem = ({ item }) => (<Box w="100%">{ item.type == "TV" ?
<Box w="90%" h="150px" p="1" mr="2" mb="4"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
       
       <ImageBg w="100%" h="100%" source={{uri: item.photo}} >
       <Pressable onPress = { ()=> {ShowAd();navigation.navigate("WebViewer", {Title : Truncate(item.name, 15), WebUrl : item.url, colorData: "green.700", data: item.about, item : "", arr: favs})}}>
         <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
           <Center>
       <Heading borderRadius="lg" justifyContent="center" size="md" p="3" mx="4" mt="20%" color="white" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
       
       <Text style={{fontFamily: "FuturaBold"}}>
       {Truncate(item.name, 10)}
       </Text>
       
       </Heading>
       </Center>
         </Box>
         </Pressable>
        
       </ImageBg>
       
       
         </Box> :  <Box w="90%" h="150px" p="1" mr="1" mb="4"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
              
              <ImageBg w="100%" h="100%" source={{uri: item.photo}} >
              <Pressable onPress = { ()=> {ShowAd();navigation.navigate("WebRadio", {Title : Truncate(item.name, 15), WebUrl : item.url, colorData: "green.700", data: item.about, item : "", arr: favs})}}>
                <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
                  <Center>
          <Heading borderRadius="lg" justifyContent="center" size="md" p="3" mx="4" mt="20%" color="white" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
          
          <Text style={{fontFamily: "FuturaBold"}}>
            {Truncate(item.name, 10)}
            </Text>
          
          </Heading>
          </Center>
                </Box>
                </Pressable>
               
              </ImageBg>
            
              
                </Box>
}
</Box> 
  );


if(!showLoad)
{ return <LoadingScreen />}

else{



    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <Box bg="coolGray.800" h="100%">
            <AppBar title={Truncate("My Favorites", 15)} />
          
            <Box rounded="lg" px="5" py="5">
  

{

    !showFavs ?
<>
<Center py="8"><Spinner size="lg" mt="30%" accessibilityLabel='Loading Favs' /></Center>
    </>
    :
<>

<FlatList mt="4" h="75%" data={favs}  extraData={updatedData2} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} refreshing={isRefreshing} />
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

  function Truncate(str, length)
  {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  
  }

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion +  Application.nativeBuildVersion;


export default MyFavs;
