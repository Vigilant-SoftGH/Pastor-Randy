import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
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
import * as ScreenOrientation from 'expo-screen-orientation';

//import DisplayImage from "./components/DisplayImage";
//import Header from "../components/Header";
//import QuarterScreen from "../screens/QuarterLessonsScreen";

const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function AllVideos({navigation, route}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const {type} = route.params;


  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
   const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/HandBook%2FChurch-Heritage.pdf?alt=media&token=8f7cd999-1b7b-4acc-8aab-cc8dac611043', cache: true };
  
  const [showLoad, setShowLoad] = React.useState(false);

  const [creation, setCreation] = useState(true);
  const [rotation, setRotation] = useState("portrait");


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

async function changeRotation()
{
if(rotation == "portrait")
{
setRotation("landscape");

await ScreenOrientation.lockAsync(
  ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
);
}

else
{
  setRotation("portrait");

  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );

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


if(!showLoad)

{ return <LoadingScreen />}

else
{
 
    return (
        <NativeBaseProvider>
            
        <StatusBar style="light" />
       <AppBar title="Pastor Doug Sermons"/>
       <ScrollView mt="4" px="2"> 
<Box w="100%">

<VStack w="100%" space="5">

<Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {ShowAd();navigation.navigate("TV", {type: "TV"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/icon.png')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
TV
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>


          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {ShowAd();navigation.navigate("SDASongs", {type: "Music_Video"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/icon.png')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
SDA Songs
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>

          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {ShowAd();navigation.navigate("Movies", {type: "Movies"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/icon.png')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Movies
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>

          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {ShowAd();navigation.navigate("Documentary", {type: "Documentary"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/icon.png')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Documentary
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>

          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {ShowAd();navigation.navigate("BibleStudy", {type: "Bible_Study"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/icon.png')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Bible Study
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>

          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {ShowAd();navigation.navigate("Sermons", {type: "Sermons"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/icon.png')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Sermons
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>
    
</VStack>

 
    </Box>

    </ScrollView>

<Text py="2"></Text>

<Box justifyContent={"center"}>
      <BannerAd 
unitId={adUnitId}
size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER }
requestOptions={{
  requestNonPersonalizedAdsOnly: true
}}
/>
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


export default AllVideos;
