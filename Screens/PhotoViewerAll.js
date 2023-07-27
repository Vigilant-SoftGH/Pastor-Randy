import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, ToastAndroid, Image} from "react-native";
import { NativeBaseProvider, Text, Icon, Modal, Avatar, VStack, HStack, IconButton, Pressable, Factory, Divider, Spinner, Input, Container, ScrollView, Center, Box, Flex, Spacer, CheckIcon, Select, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import LoadingScreen from '../Components/LoadingScreen';
import RequiredFields from '../Components/RequiredFields';
import {db} from '../Firebase/config';



import {getAuth, createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, updateDoc, collection } from '@firebase/firestore';



const auth = getAuth();

const firestore = getFirestore();



const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function PhotoViewerAll() {
  const ImageExt = Factory(Image);
  const navigation = useNavigation();
  const route = useRoute();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
  
 
  const [image, setImage] = useState(route.params.photoURL);


  const photoURL_male = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Musicians%2FPinClipart.com_tie-clip-art_5224612.png?alt=media&token=c3843aaa-cf65-40de-8666-d2ae6f1641cf";

  const photoURL_female = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Leadership%2Ffemale-icon-19.png?alt=media&token=ba43ef26-440b-4b3d-bf8b-6e9ccb31fd68";

/*
  async function UpdatePhoto() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  */


 
    return (
        <NativeBaseProvider>
            <Box bg="muted.900">
            <StatusBar style="light" />
        <Box p="5" color="muted.700" shadow="4">

        </Box>
            <Center p="1">
            <HStack>
    <Pressable onPress={() => navigation.goBack()}>
    <Icon as={MaterialIcons} name="close" color="gray.300" size="xl" />
    </Pressable>
</HStack>
      <Box rounded="lg" borderColor="gray.300" w="98%" h="70%" mt="12" bg="muted.900">
        
        <ImageExt source={{uri : image}} w="100%" shadow="4" h="100%" />


        </Box>
     

      </Center>
    <Text mb="1"></Text>

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


      </NativeBaseProvider>
    );
  }

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion +  Application.nativeBuildVersion;


export default PhotoViewerAll;
