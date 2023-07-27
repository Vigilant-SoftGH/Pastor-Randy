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

function WebViewerRadio({navigation, route}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const {Title, WebUrl, Info, colorData, array} = route.params;

  const getName = JSON.stringify(Title);

  const Name= getName.slice(1, -1);

  const WebLink = JSON.stringify(WebUrl);
  const WebUrlData= WebLink.slice(1, -1);

  const [audioRes, setAudioRes] = useState([]);

  const InfoData = JSON.stringify(Info);
  const InfoData2= InfoData.slice(1, -1);

  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
   const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/HandBook%2FChurch-Heritage.pdf?alt=media&token=8f7cd999-1b7b-4acc-8aab-cc8dac611043', cache: true };
  
  const [showLoad, setShowLoad] = React.useState(false);

  const [creation, setCreation] = useState(true);


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


 


  useEffect(() =>
  {
    function searchAppData(value) {
      if(value.type)
      {
     
      return value.type == "Audio";
      }
    }
  
    const getResAudio = array.filter(searchAppData);
  
    setAudioRes(getResAudio);
  
  
  }, []);
  
  

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
        <Box bg="dark.50" h="100%">
      <AppBar title={Truncate(Name, 15)} />


<WebView source={{ uri: "https://sdasabbathschool.com/SamplePlayer.php?url="+WebUrl }}

allowsFullscreenVideo={true}
            pullToRefreshEnabled={true} />
<Box>
  
<Heading  w="100%" p="2" size="sm" color="gray.300"><Text style={{fontFamily: "FuturaBold"}}>{Title}</Text></Heading>

<Box p="3" mt="4">
  <HStack><Heading p="2" color="gray.500" size="md">MORE </Heading>
  <Icon as={MaterialIcons} name="arrow-downward" color="gray.500" mt="2" size="lg" />

  </HStack>
</Box>


  <ScrollView horizontal={true} mt="1" px="2">


  {
audioRes.map(item => (
<Box h="160px" w="320px" mr="5" mb="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
<Pressable p="3" onPress = { ()=> {navigation.navigate("WebRadio", {Title : item.title, WebUrl : item.url, colorData: "green.700", data: item.about, item : "", Info:"", array: audioRes})}}>
<Box h="100px" mb="5">
  <Center>
<Icon as={MaterialIcons} name="music-note" color="gray.300" size="3xl" />
</Center>

<Heading  w="100%" p="2" size="md" color="gray.300"><Icon as={MaterialIcons} name="book" color="gray.300" size="lg" /> <Text style={{fontFamily: "FuturaBold"}}>{Truncate(item.title, 25)}</Text></Heading>

<Heading  w="100%" p="2" size="md" color="gray.300"><Icon as={MaterialIcons} name="history" color="gray.300" size="lg" /> <Text style={{fontFamily: "FuturaBold"}}>{item.duration}</Text></Heading>
</Box>

</Pressable>

</Box>


))

}




    </ScrollView>
    </Box>

<Text py="2">{InfoData2}</Text>

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


export default WebViewerRadio;
