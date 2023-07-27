import { NavigationContainer, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ImageBackground, ToastAndroid} from "react-native";
import { NativeBaseProvider, Text, Button, Icon, FlatList, VStack, Spinner, Avatar, Input, HStack, TextArea, IconButton, Pressable, Factory, Divider, Container, ScrollView, Center, Box, Flex, Spacer, Heading, Toast } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import Anchor from "../Components/Anchor";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import {db} from '../Firebase/config';

import {getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, addDoc, getDoc, query, where, getDocs, updateDoc, collection} from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

const auth = getAuth();

const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2136165055';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function StudyContent({navigation}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const route = useRoute();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4742311781';
  const slugName = "Church";


  const [userID, setUserID] = useState(route.params.id);
  const [photoURL, setPhotoURL] = useState(route.params.photoURL);
   const [date, setDate] = useState(route.params.Date);
   const [data, setData] = useState(route.params.array);
   const [updatedData, setUpdatedData] = useState(data.length);
   const [title, setTitle] = useState(route.params.title);
   const [post, setPost] = useState(route.params.post);

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

  useEffect(() =>
  {
    console.log(data.length)
    function setter()
    {
setShowLoad(true);
    }

    const timer = setTimeout(setter, 500);

    return () => clearTimeout(timer);
  },[]);

  

  let d = new Date();
  let addData = d.getMilliseconds()+d.getSeconds()+d.getMinutes();



  /*Update other user profile details(first and last name, email...) */



//Global_variables
var PhoneNumber="";
var PhoneNumber2="";
  const fontSize = 16;


   /*Prevent user from going back when data is not saved*/

   const [text, setText] = React.useState('');
   const hasUnsavedChanges = Boolean(text);
 
   React.useEffect(
     () =>
       navigation.addListener('beforeRemove', (e) => {
         if (!hasUnsavedChanges) {
           // If we don't have unsaved changes, then we don't need to do anything
           return;
         }
 
         // Prevent default behavior of leaving the screen
         e.preventDefault();
 
         // Prompt the user before leaving the screen
         Alert.alert(
           'Discard changes?',
           'You have unsaved changes. Are you sure to discard them and leave the screen?',
           [
             { text: "Don't leave", style: 'cancel', onPress: () => {} },
             {
               text: 'Discard',
               style: 'destructive',
               // If the user confirmed, then we dispatch the action we blocked earlier
               // This will continue the action that had triggered the removal of the screen
               onPress: () => navigation.dispatch(e.data.action),
             },
           ]
         );
       }),
     [navigation, hasUnsavedChanges]
   );


   const HideError = () =>
   {
 
     const HideTimer = setTimeout(() => setDataError(false), 5000);
  return () => clearTimeout(HideTimer);
 
   }


  //Render Item
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
  <Pressable onPress = { ()=> {ShowAd();navigation.navigate("StudyContent", {id: item.id, title: item.title, post: item.content, photoURL: item.photoURL, Date: item.creationDate, array: data })}}>
  <ImageExt alt="Loading..." w="100%" h="165px" source={{uri: item.photoURL}} />
  
  <Heading  p="2" color="gray.500" size="xs"><Text style={{fontFamily: "FuturaBold"}}>
      BIBLE STUDY
  </Text>
  </Heading>
  
  <Heading  p="2" color="gray.500" size="md"><Text style={{fontFamily: "FuturaBold"}}>
    {Truncate(item.title, 70)}
  </Text>
  </Heading>
  
  
  <Text fontSize="18" style={{fontFamily: "Futura"}}>
    {Truncate(item.content, 70)}
  </Text>
  
  </Pressable>
  
  <Button onPress = { ()=> {ShowAd();navigation.navigate("StudyContent", {id: item.id, title: item.title, post: item.content, photoURL: item.photoURL, Date: item.creationDate, array: data })}} w="100px" ml="60%" mt="5">Read more</Button>
  
  </Box>);


if(!showLoad)
{

  return <LoadingScreen />
}


else{



console.log(data)
 
    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <Box bg="dark.50" h="100%">
            <AppBar title= {Truncate(title, 15)} />

            <ScrollView pb="5">
 

<Box w="100%" rounded="md" borderWidth="1" p="3" borderColor="gray.300"> 
<Box>
<Heading p="2" color="gray.300"><Text color="gray.400" style={{fontFamily: "FuturaBold"}}>{title}</Text></Heading>


<Heading size="sm" color="gray.300" p="3" ml="60%"><Text color="gray.400" style={{fontFamily: "FuturaBold"}}>{date.toDate().toDateString()}</Text></Heading>
             <Center> 
           
                <ImageExt w="100%" h="250px" source={{
          uri: photoURL}} />
            
           

            
            </Center>

            <Text color="gray.300" fontSize="16px" p="2" style={{fontFamily: "FuturaBold"}} ml="70%">
                  
                  </Text>
            <Box>
          
                  <Text color="gray.200" style={{fontFamily: "Futura"}} fontSize={20}>
                 {post.replace(/\\n/g, "\n")}
                 </Text>



               
                </Box>
          



            </Box></Box>  
      



      <Divider mt="8" />

<Box p="3">
  <HStack><Heading borderLeftWidth="4" borderColor="green.700" p="2" color="gray.300" size="sm">MORE </Heading>
  <Icon as={MaterialIcons} name="arrow-downward" color="gray.500" mt="2" size="lg" />
  {/*<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" >
    <Pressable onPress={() => {changeRotation();}}>
<Icon as={MaterialIcons} name="screen-rotation"  ml="25%" color="gray.500"  size="2xl" /> 
</Pressable>
            </Animatable.View>*/}
  </HStack>
</Box>
      <ScrollView horizontal={true} pb="5">
  
  { data.map((body, index) => (
   <Box>{body.type == "Blog" ? <Box w="300px" h="200px" mr="5" borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} p="3">
  <Pressable onPress = { ()=> {ShowAd();navigation.push("StudyContent", {id: body.id, title: body.title, post: body.content, photoURL: body.photoURL, Date: body.creationDate, array: data })}}>
  <Heading  p="2" color="gray.300" size="md"><Text style={{fontFamily: "FuturaBold"}}>
    {Truncate(body.title, 50)}
  </Text>
  </Heading>
  <ImageExt alt="Loading..." w="100%" h="165px" source={{uri: body.photoURL}} />

  </Pressable>
  
  </Box> : null}</Box>))


}


</ScrollView>

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

function Truncate(str, length)
{
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else return str;

}

const DateGet=new Date().getFullYear();
let Ver = Application.nativeApplicationVersion;



export default StudyContent;
