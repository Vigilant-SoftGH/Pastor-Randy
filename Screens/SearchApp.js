import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ToastAndroid, Image} from "react-native";
import { NativeBaseProvider, Button, Text, Input, Icon, VStack, HStack, IconButton, Pressable, Factory, Divider, Container, ScrollView, Center, Box, Flex, Spinner, FlatList, Spacer, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import LoadingScreen from './LoadingScreen';


const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function SearchApp({navigation}) {
  const ImageExt = Factory(Image);
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  
  
  const [showLoad, setShowLoad] = React.useState(false);
  const [search, setSearch] = useState("");


  const Search = () =>
  {
if(search =="")
{
  return alert("Search input cannot be empty!")
}

return navigation.navigate("SearchResults", {input: search});

  }

 
    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <Box bg="dark.50" h="100%">
            <AppBar title="Search" />

            <ScrollView w="98%" h="60%" pb="5">
            <Center  my="40%">
              <HStack space="2">
<Box w="85%"  bg="gray.500" rounded="md"  shadow={4} p="3">
<Input mx="3" fontSize="18" bg="gray.300" onChangeText={(value) =>setSearch(value)} placeholder="Search Pastor Doug Sermons" maxW="300" />
  </Box>
  
  </HStack>
  <Button my="4" onPress={Search}>
  <Icon as={MaterialIcons} name="search" size="2xl" color="gray.300" />
  </Button>
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

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion +  Application.nativeBuildVersion;


export default SearchApp;
