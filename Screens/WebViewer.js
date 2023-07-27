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
import { Video, ResizeMode } from 'expo-av';
import ytdl from "react-native-ytdl";


//import DisplayImage from "./components/DisplayImage";
//import Header from "../components/Header";
//import QuarterScreen from "../screens/QuarterLessonsScreen";

const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function WebViewer({navigation, route}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const {Title, WebUrl, Info, Hide, colorData, data, array} = route.params;

  const getName = JSON.stringify(Title);

  const Name= getName.slice(1, -1);

  const WebLink = JSON.stringify(WebUrl);
  const WebUrlData= WebLink.slice(1, -1);

  const InfoData = JSON.stringify(Info);

  const InfoData2= InfoData.slice(1, -1);

  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
   const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/HandBook%2FChurch-Heritage.pdf?alt=media&token=8f7cd999-1b7b-4acc-8aab-cc8dac611043', cache: true };
  
  const [showLoad, setShowLoad] = React.useState(false);
  const [finishedLoaded, setFinishedLoaded] = React.useState(false);
  const [loadedWeb, setLoadedWeb] = React.useState(false);

  const [creation, setCreation] = useState(true);
  const [rotation, setRotation] = useState("portrait");

  const [loadedURL, setLoadedUrl] = useState(true);
  const [videoRes, setVideoRes] = useState([]);

  const ShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi, Get Pastor Randy Sermons app from Google playstore for unlimited Christian content. Get in touch with the word of God. Watch unlimited SDA Content.. Get it from the app store:: https://play.google.com/store/apps/details?id=com.vigilantsoft.pastorrandy',
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
    //setShowLoad(true)
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


  
useEffect(() =>{

  const timer = setTimeout(() =>{
    setShowLoad(true);
    setLoadedWeb(true);
  }, 500);

return () => clearTimeout(timer);
},[])


var setUrl;
async function VidRunner(url, title, about)

{
setLoadedUrl(false);
ToastAndroid.show("Loading...", ToastAndroid.SHORT)

const youtubeURL = url;
const urls = await ytdl(youtubeURL, {filter: "videoandaudio"});

var validateURL = ytdl.validateURL(url);

if(validateURL)
{
setUrl = urls[0]["url"];
//alert(setUrl);

console.log(urls[0]["url"]) // "Adele - Hello" thumbail

setLoadedUrl(true);

const timer = setTimeout(() => {
ShowAd(); navigation.navigate("WebViewer", {Title : Truncate(title, 15), WebUrl : setUrl, colorData: "green.700", Info : "", data: about, array: videoRes}) }, 500);

return () => clearTimeout(timer);

}

else
{

ToastAndroid.show("Video failed to play, try again later", ToastAndroid.LONG);
}

/*
ytdl.getInfo('https://www.youtube.com/watch?v=YQHsXMglC9A').then((info) =>{


const json = JSON.stringify(info, null, 2)
  // eslint-disable-next-line max-len
  .replace(/(ip(?:=|%3D|\/))((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|[0-9a-f]{1,4}(?:(?::|%3A)[0-9a-f]{1,4}){7})/ig, '$10.0.0.0');

  

});
*/


//console.log(urls);
}




const adomText="";

  const[joyText, setJoyText] = useState("");

  const[joyPrimeText, setJoyPrimeText] = useState("");


  const[africaNewsText, setAfricaNewsText] = useState("");

  const[france24Text, setFrance24Text] = useState("");

function finishedLoad()
{
  setFinishedLoaded(true);
}

useEffect(() =>
{
  function searchAppData(value) {
    if(value.type)
    {
   
    return value.type == "Video";
    }
  }

  const getResVideo = array.filter(searchAppData);

  setVideoRes(getResVideo);


}, []);




if(!showLoad)

{ return <LoadingScreen />}

else
{
 
    return (
        <NativeBaseProvider>

        <StatusBar style="light" />
        <Box bg="dark.50" h="100%">
 <AppBar title={Title} />

            
           
  
{/*
<View style={{height: 400}}>
  {
    !loadedWeb ? <Center pt="20%"><Spinner accessibilityLabel="Loading Tv" size="lg" /></Center> :
<><Video  
            source={{uri: WebUrl}}                  // the video file
            paused={false}                  // make it start    
            style={styles.backgroundVideo}  // any style you want
            //repeat={true}                   // make it a loop
        /></>
  }

</View>

*/}


    
<ScrollView>

<View w="100%">
<Video
source={{ uri: WebUrl }}
//rate={1.0}
//volume={1.0}
//isMuted={false}
resizeMode={ResizeMode.CONTAIN}
useNativeControls
//style={{ width: this.containerWidth}}
onError = {(e)=>{console.log(e)}}
style={{height:200}}
/>
</View>

<Box p="2" style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
      <Text fontSize="18px" color="gray.200" style={{fontFamily: "FuturaBold"}}>
{data}
</Text>
</Box>

{/*
<Center mt="5">
<Box justifyContent={"center"}>
      <BannerAd 
unitId={adUnitId}
size={BannerAdSize.LARGE_BANNER }
requestOptions={{
  requestNonPersonalizedAdsOnly: true
}}
/>
</Box>
</Center>
*/}

  {
loadedURL ?
<Box>
<Box p="3" mt="4">
  <HStack><Heading p="2" color="gray.500" size="md">MORE </Heading><Icon as={MaterialIcons} name="arrow-downward" color="gray.500" mt="2" size="lg" /></HStack>
</Box>
  <ScrollView horizontal={true} mt="1" px="2">
{
array.map(info => (
  <Box>
    {
       info.type == "TV" ?
      <Box key={info.title} w="180px" h="120px" p="1" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
   <Pressable onPress = { ()=> {ShowAd();if(info.TvUrl.indexOf("youtu.be") > -1) {var newAddr = info.TvUrl.substring(info.TvUrl.lastIndexOf("/")+1)} else{var newAddr = ""};info.TvUrl.indexOf("youtu.be") > -1 ? navigation.navigate("Youtuber", {Title : Truncate(info.title, 15), WebUrl : info.TvUrl.indexOf("youtu.be") > -1 ? newAddr : info.youtube, colorData: "green.700", Info : "", data: info.about, array:array}) : navigation.navigate("WebViewer", {Title : Truncate(info.title, 15), WebUrl : info.TvUrl, colorData: "green.700", Info : "", data: info.about, array: videoRes})}}>
<ImageBg w="100%" h="100%" source={{uri: info.photoURL}} >
<Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
  <Center>
<Heading borderRadius="lg" justifyContent="center" size="md" p="3" mx="4" mt="20%" color="white" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>

<Text style={{fontFamily: "FuturaBold"}}>
{Truncate(info.title, 10)}
</Text>

</Heading>
</Center>
</Box>

</ImageBg>
</Pressable>
<Box p="2">
<Center>
  <Icon as={MaterialIcons} name="favorite" white size="xl" />
</Center>
</Box>
</Box> : null}


{
      info.type =="Video" ?
      <Box key={info.title} w="180px" h="120px" p="1" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
  <Pressable onPress = { ()=> {VidRunner(info.youtube, info.title, info.about)}}>
<ImageBg w="100%" h="100%" source={{uri: info.photoURL}} >
<Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
  <Center>
<Heading borderRadius="lg" justifyContent="center" size="md" p="3" mx="4" mt="20%" color="white" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>

<Text style={{fontFamily: "FuturaBold"}}>
{Truncate(info.title, 10)}
</Text>

</Heading>
</Center>
</Box>

</ImageBg>
</Pressable>
<Box p="2">
<Center>
  <Icon as={MaterialIcons} name="favorite" white size="xl" />
</Center>
</Box>
</Box> : null}

</Box>
))

}


    </ScrollView>
    <Text py="2"></Text>
    </Box> : <Spinner mt="5" size="lg" accessibilityLabel="loading video" />

    }
    
    </ScrollView> 

<Text py="1">{InfoData2}</Text>


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


export default WebViewer;
