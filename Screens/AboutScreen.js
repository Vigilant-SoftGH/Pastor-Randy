import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, ToastAndroid, Image, ImageBackground} from "react-native";
import { NativeBaseProvider, Text, Icon, VStack, HStack, Avatar, IconButton, Pressable, Factory, Divider, Container, ScrollView, Center, Box, Spinner, Flex, Spacer, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import LoadingScreen from './LoadingScreen';

//import DisplayImage from "./components/DisplayImage";
//import Header from "../components/Header";
//import QuarterScreen from "../screens/QuarterLessonsScreen";

const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function AboutScreen({navigation}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
  
  const [showLoad, setShowLoad] = React.useState(false);
  const [loaded, setLoaded] = useState(false);

  const My_Wife_Felicity = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/My_Family%2FFelicity_Owusu.jpg?alt=media&token=6de84cc1-ac93-49e3-bf1c-4a9c566a1213";
  const Ellen_Amarylis_White= "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/My_Family%2FEllen_Amarylis_Wjite.jpg?alt=media&token=1e843e7a-9c0a-40ec-a45a-ea8ae5a747c3";
  const Precious_Owusuaa = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/My_Family%2FPrecious_Owusuaa_Amanfo.jpg?alt=media&token=60e3f612-d61c-49ea-b54c-fe7a6b648a64";


  useEffect(() =>
  {
    setShowLoad(true);
const timer = setTimeout(() =>{
   
    setLoaded(true);}, 500);
return () => clearTimeout(timer);
  }, [])

  if(!showLoad)
  {
    return <LoadingScreen />
  }

 else{
    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
          
<Box bg="coolGray.800" h="100%">
<ImageBg rounded="sm" shadow={"5"} w="100%" h="100%" source={require("../assets/Randy.jpg")} >
<Box style={{backgroundColor:"rgba(0,0,0,0.6)"}} w="100%" h="100%">

  <Box w="100%" h="100%" borderTopRadius="2xl" style={{backgroundColor:"rgba(0,0,0,0.6)"}}>



 
            <AppBar title="About App" />

            <ScrollView w="99%" pb="5">
            <Center p="4">
      <Box  w="99%" minW="300" m="5" mt="20%">
<Center>
        <Box w="90%" p="4">
          <Heading size="md" color="gray.300">
            To God Be the Glory
          </Heading>
        </Box>
        </Center>

        <Center py="6">
        <Box rounded="md" shadow={3} w="98%" maxW="350">
        <Center> 
          <Heading color="gray.100" size="md" py="2">
   
      Pastor Doug Sermons App
          </Heading>
          </Center>
          <Divider />

          <VStack>
<HStack justifyContent="center" space={2} mt="4" px="5">
  <Heading size="sm" color="gray.100"> 
    Version :
  </Heading>
  <Spacer />
  <Heading size="sm"color="gray.100">
    {Ver}
    
  </Heading>

</HStack>


<HStack justifyContent="center" space={2} mt="4" px="5">
<Heading size="sm" color="gray.100"> 
    Developer : 
  </Heading>
  <Spacer />
  <Heading size="sm"color="gray.100">
  VigilantSoft
    
  </Heading>

</HStack>

<Box justifyContent={"center"}>
      <BannerAd 
unitId={adUnitId}
size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER }
requestOptions={{
  requestNonPersonalizedAdsOnly: true
}}
/>
</Box>


<Heading borderRadius="lg" justifyContent="center" size="lg" p="3" mx="4" mt="6" color="white" style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
<Text style={{fontFamily: "FuturaBold"}}>
Disclaimer
  </Text></Heading>
<Text style={{fontFamily: "Futura"}} fontSize="18px" py="3" color="gray.200">
This app is NOT affiliated to, nor sponsored by Doug Batchelor/ Amazing Facts. The app was developed to help others to also know more about God's truth for this end time, so that they can have life eternal.
</Text>




          </VStack>
        
        </Box>
        </Center>
        </Box>
</Center>

</ScrollView>

</Box>

</Box>

</ImageBg>

</Box>

{
    /*

!loaded  ? <><Spinner accessibilityLabel="Loading data" size="lg" /></> :
        <Center py="6">
        <Box w="98%">
  

         <Heading size="sm" color="gray.500" p="3">
This app is dedicated to my wife:
         </Heading>

         <Center>
      <Icon size="md" mb="2" as={MaterialIcons} 
         name="circle" color="gray.500" />
          <Icon size="lg" mb="2" as={MaterialIcons} 
         name="arrow-downward" color="gray.500" />
      </Center>

         <HStack space="2" justifyContent="center">
          <Box>
          <Center py="6">
            <Heading size="sm" mb="3">Wife</Heading>

           
<Pressable onPress={()=> navigation.navigate("PhotoViewerAll", {photoURL: My_Wife_Felicity})}>
     <Avatar bg="gray.300" size="xl" source={{
      uri: My_Wife_Felicity
    }} /> 
    </Pressable>

    <Heading size="sm" mt="3" color="gray.500">
       Felicity Owusu
    </Heading>

    </Center>
          </Box>

         </HStack>

         <Center>
      <Icon size="md" mb="2" as={MaterialIcons} 
         name="circle" color="gray.500" />
          <Icon size="lg" mb="2" as={MaterialIcons} 
         name="arrow-downward" color="gray.500" />
      </Center>

         <Center>
         <Heading size="sm" color="gray.500" p="3">
And my two daughters:
         </Heading>
         </Center>

         
         <Center>
      <Icon size="md" mb="2" as={MaterialIcons} 
         name="circle" color="gray.500" />
          <Icon size="lg" mb="2" as={MaterialIcons} 
         name="arrow-downward" color="gray.500" />
      </Center>



<Center>
         <HStack space="3" justifyContent="center" w="85%">
          <Box w="50%">
          <Center py="6">
           

           
<Pressable onPress={()=> navigation.navigate("PhotoViewerAll", {photoURL: Ellen_Amarylis_White})}>
     <Avatar bg="gray.300" size="xl" source={{
      uri:Ellen_Amarylis_White
    }} /> 
    </Pressable>

    <Heading size="sm" mt="3" color="gray.500">
       Yeboaa Ellen Amarylis White
    </Heading>

    </Center>
          </Box>


          <Box w="50%">
          <Center py="6">
               
<Pressable onPress={()=> navigation.navigate("PhotoViewerAll", {photoURL: Precious_Owusuaa})}>
     <Avatar bg="gray.300" size="xl" source={{
      uri: Precious_Owusuaa
    }} /> 
    </Pressable>

    <Heading size="sm" mt="3" color="gray.500">
       Precious Owusuaa Amanfo
    </Heading>

    </Center>
          </Box>

         </HStack>
         </Center>

        </Box>
        </Center>
*/
        }

  

      </NativeBaseProvider>
    );
  }

}

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion;


export default AboutScreen;
