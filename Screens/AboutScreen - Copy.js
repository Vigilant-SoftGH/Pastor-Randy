import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, ToastAndroid, Image} from "react-native";
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
            <Box bg="dark.50" h="100%">
            <AppBar title="About App" />

            <ScrollView w="99%" h="60%" pb="5">
            <Center p="4">
      <Box  w="99%" minW="300" m="5">
<Center>
        <Box w="90%" p="4">
        
          <Heading borderColor="green.700" p="2" size="md" color="gray.300">
            <Text style={{fontFamily: "FuturaBold"}}>
            To God Be the Glory
            </Text>
          </Heading>
        </Box>
        </Center>

        <Center py="6">
        <Box rounded="md" shadow={3} w="98%" maxW="350" bg="muted.800">
        <Center> 
          <Heading color="gray.100" py="2">
   
     Pastor Doug Sermons
          </Heading>
          </Center>
          <Divider />

          <VStack>
          
<HStack justifyContent="center" space={2} mt="4" px="5">
<Heading p="2" size="sm" color="gray.100">
            <Text style={{fontFamily: "FuturaBold"}}>
    Version :
    </Text>
  </Heading>
  <Spacer />
  <Heading p="2" size="sm" color="gray.100">
            <Text style={{fontFamily: "FuturaBold"}}>
    {Ver}
    </Text>
  </Heading>

</HStack>


<HStack justifyContent="center" space={2} mt="4" px="5">
<Heading p="2" size="md" color="gray.100">
            <Text style={{fontFamily: "FuturaBold"}}>
    Developer : 
    </Text>
  </Heading>
  <Spacer />
  <Heading p="2" size="sm" color="gray.100">
            <Text style={{fontFamily: "FuturaBold"}}>
  VigilantSoft
    </Text>
  </Heading>

</HStack>

<Center py="6">
<Heading p="2" size="md" color="gray.100">
            <Text style={{fontFamily: "FuturaBold"}}>
  All Rights Reserved{'\u00a9'}  {'\u2022'} {DateGet}
  </Text>
  </Heading>
</Center>

<Divider />
<Box px="2" py="3">
<Heading size="xs" color="gray.100">
Disclaimer: We DO NOT OWN the TV and Video Content made available in this app, and we are NOT affiliated to any such entity. We only made what's already in PUBLIC domain available to you in the more easy way using APIs.
</Heading>

<Heading size="xs" color="gray.100">
You can contact us: vigilantsoftgh@gmail.com
</Heading>
</Box>


          </VStack>
          <Center mb="1" mt="5">
            
            {/*
            <HStack space="2" py="2">
            <Pressable onPress = { ()=> navigation.navigate("WebViewer", {Title : "Privacy Policy", WebUrl : "https://sdasabbathschool.com/App_Privacy_Policy/SDATVPrivacy.html", Info : "", colorData: "green.500", Hide: true})}>
<Heading size="xs"color="gray.100">
Privacy
  </Heading>
  </Pressable>

  
  <Heading size="xs"color="gray.100">
  {'\u2022'}
  </Heading>

  <Pressable onPress = { ()=> navigation.navigate("WebViewer", {Title : "App Terms", WebUrl : "https://sdasabbathschool.com/App_Privacy_Policy/SDATVTerms.html", Info : "", colorData: "green.500", Hide: true})}>
  <Heading size="xs"color="gray.100">
Terms
  </Heading>
  </Pressable>

  </HStack>
    */}
</Center>
        </Box>
        </Center>

{
    

!loaded  ? <><Spinner accessibilityLabel="Loading data" size="lg" /></> :
        <Center py="6">
        <Box w="98%">
  

         <Heading size="sm" color="gray.300" p="3">
This app is dedicated to my wife:
         </Heading>

         <Center>
      <Icon size="md" mb="2" as={MaterialIcons} 
         name="circle" color="gray.400" />
          <Icon size="lg" mb="2" as={MaterialIcons} 
         name="arrow-downward" color="gray.400" />
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

    <Heading size="sm" mt="3" color="gray.300">
       Felicity Owusu
    </Heading>

    </Center>
          </Box>

         </HStack>

         <Center>
      <Icon size="md" mb="2" as={MaterialIcons} 
         name="circle" color="gray.400" />
          <Icon size="lg" mb="2" as={MaterialIcons} 
         name="arrow-downward" color="gray.500" />
      </Center>

         <Center>
         <Heading size="sm" color="gray.300" p="3">
And my two daughters:
         </Heading>
         </Center>

         
         <Center>
      <Icon size="md" mb="2" as={MaterialIcons} 
         name="circle" color="gray.400" />
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

    <Heading size="sm" mt="3" color="gray.300">
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

    <Heading size="sm" mt="3" color="gray.300">
       Precious Owusuaa Amanfo
    </Heading>

    </Center>
          </Box>

         </HStack>
         </Center>

        </Box>
        </Center>

        }

    

      </Box>
      </Center>
    
      </ScrollView>

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

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion;


export default AboutScreen;
