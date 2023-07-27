import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Button, ToastAndroid,Share, Image, ImageBackground} from "react-native";
import { NativeBaseProvider, Text, Icon, VStack, HStack, Menu, Spinner, IconButton, Pressable, Factory, Divider, Container, ScrollView, Center, Box, Flex, Spacer, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Anchor from "../Components/Anchor";
import * as Application from 'expo-application';
import LoadingScreen from './LoadingScreen';
import WebView from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import YoutubePlayer from "react-native-youtube-iframe";
import * as ScreenOrientation from 'expo-screen-orientation';

import {db} from '../Firebase/config';

import {getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, where, query, limit, orderBy, updateDoc, collection} from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function Youtuber({navigation, route}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const {Title, WebUrl, Info, colorData, id, data, array} = route.params;

  const getName = JSON.stringify(Title);

  const Name= getName.slice(1, -1);

  const WebLink = JSON.stringify(WebUrl);
  const WebUrlData= WebLink.slice(1, -1);

  const InfoData = JSON.stringify(Info);
  const InfoData2= InfoData.slice(1, -1);

  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
   const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/HandBook%2FChurch-Heritage.pdf?alt=media&token=8f7cd999-1b7b-4acc-8aab-cc8dac611043', cache: true };
  
  const [showLoad, setShowLoad] = React.useState(false);

  const [creation, setCreation] = useState(true);

  const [author, setAuthor] = useState(null);
  const [authDate, setAuthDate] = useState("");
  const [authTime, setAuthTime] = useState("");
  const [authorData, setAuthorData] = useState(null);
  const [userID, setUserID] = useState(id);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      ToastAndroid.show("video has finished playing!", ToastAndroid.SHORT);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  const ShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi, I found this amazing Pastor Doug Sermons app. Get in touch with the word of God. Watch unlimited SDA Content.. Get it from the app store: https://play.google.com/store/apps/details?id=com.vigilantsoft.pastorrandy',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


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
    setShowLoad(true)
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
useEffect(() =>{
  const timer = setTimeout(() =>{
    setShowLoad(true);
  }, 500);

return () => clearTimeout(timer);
},[])
*/

useEffect(() =>
{

  
const getData = async() =>
{
const docRef = doc(db, "users", userID);
const docSnap = await getDoc(docRef).catch((e) => console.log(e));



if (docSnap.exists()) {
  const userData = docSnap.data();
  //console.log("Document data:", docSnap.data());
setAuthorData(userData);
setAuthor(userData.fname+" "+userData.lname);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");

  
setAuthor("Author Unavailable");
}

/*
const docRef2 = doc(db, "users", userID, "Entries", category, "entryData", entryName);
const docSnap2 = await getDoc(docRef2).catch((e) => console.log(e));*/

const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("identifier", "==", Title ), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
  console.log(documentData.length)
     


if (documentData.length > 0) {
  const userData = documentData[0];
  //console.log("Document data:", docSnap.data());
const Date = documentData[0].creationDate.toDate().toDateString();
const Time = documentData[0].creationDate.toDate().toLocaleTimeString();

console.log("Date: =>"+Date)

console.log(Time);
setAuthDate(Date);
setAuthTime(Time);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}



}

const setData = setTimeout(getData, 700);
return () => clearTimeout(setData);
}, []
);

if(!showLoad)

{ return <LoadingScreen />}

else
{
 
    return (
        <NativeBaseProvider>
            
        <StatusBar style="light" />
        <Box bg="dark.50" h="100%">
        <AppBar title={Truncate(Title, 15)} />     

	

<Box w="100%"><YoutubePlayer
       height={300}
          play={playing}
          videoId={WebUrl}
          allowWebViewZoom={true}
          onChangeState={onStateChange}
        />

        </Box>

        <Box p="2" style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
      <Text fontSize="18px" color="gray.200" style={{fontFamily: "FuturaBold"}}>
{Truncate(Title, 25)}
</Text>
</Box>

<Box>
<Box p="3" mt="1">
  <HStack><Heading p="2" color="gray.500" size="md">MORE </Heading><Icon as={MaterialIcons} name="arrow-downward" color="gray.500" mt="2" size="lg" /></HStack>
</Box>
  <ScrollView horizontal={true} px="2">


  { array.map((body, index) => (
   <Box> { body.type == "TV" ? 
          <Box w="200px" h="120px" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
            <Heading  p="1" size="md" color="gray.300"><Text style={{fontFamily: "FuturaBold"}}>{Truncate(body.title, 15)}</Text></Heading>
            <Pressable onPress = { ()=> {ShowAd();if(body.TvUrl.indexOf("youtu.be") > -1) {var newAddr = body.TvUrl.substring(body.TvUrl.lastIndexOf("/")+1)} else{var newAddr = ""};body.TvUrl.indexOf("youtu.be") > -1 ? navigation.navigate("Youtuber", {Title : Truncate(body.title, 15), WebUrl : body.TvUrl.indexOf("youtu.be") > -1 ? newAddr : body.youtube, colorData: "green.700", Info : "", data: body.about, array:array}) : navigation.navigate("WebViewer", {Title : Truncate(body.title, 15), WebUrl : body.TvUrl, colorData: "green.700", Info : "", data: body.about, array: array})}}>
          <ImageBg w="100%" h="95%" source={{uri: body.photoURL}}>
          {body.type == "TV" ? <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" ><ImageExt w="50px" h="30px" source={require("../Img/Live.png")} />
          </Animatable.View> : null
}
          </ImageBg>
          </Pressable>
  
          </Box> : null}
          
          { body.type =="Movies" || body.type =="Music_Video" || body.type =="Sermons" || body.type =="Bible_Study" || body.type =="Documentary" ? 
          <Box w="200px" h="120px" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
            <Heading  p="1" size="md" color="gray.300"><Text style={{fontFamily: "FuturaBold"}}>{Truncate(body.title, 15)}</Text></Heading>
            <Pressable onPress = { ()=> {ShowAd(); navigation.navigate("WebViewer", {Title : Truncate(body.title, 15), WebUrl : body.youtube, colorData: "green.700", Info : "", data: body.about, array:array})}}>
          </Pressable>
  
          </Box> : null}</Box> ))
}



    </ScrollView>
    </Box>

<Text py="1"></Text>
{/*
<Box justifyContent={"center"} mt="3">
      <BannerAd 
unitId={adUnitId}
size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER }
requestOptions={{
  requestNonPersonalizedAdsOnly: true
}}
/>
</Box>*/}

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


export default Youtuber;
