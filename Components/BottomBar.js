import React, {useState} from "react";
import { Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import {AsyncStorage} from "@react-native-community/async-storage";
import {Box, HStack, IconButton, Icon, Menu, Factory, Pressable, Button, Text, Center} from "native-base";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Anchor from "../Components/Anchor";
import ShareApp from "../Components/ShareApp";
import * as Application from 'expo-application';
import * as ScreenOrientation from 'expo-screen-orientation';

function BottomBar(props) {

  let Ver = Application.nativeApplicationVersion;
  let MailAddr = "mailto:vigilantsoftgh@gmail.com?subject=SDA Sabbath School Quarterly V."+Ver+" User Feedback";
const navigation = useNavigation();
const ImageExt= Factory(Image);

  return (
    
     
         <>
        
      <Box safeAreaTop bg="dark.50" />
    
      <HStack bg="dark.50" px="1" py="2"  space={7} justifyContent="center" alignItems="center" w="100%" minW="350">
       
      <Pressable onPress ={() => navigation.navigate('MainStudy', {StudyHead : 'Lesson 1', MainHead: 'Sunday'})}><ImageExt h="12" w="12"  bg="white" rounded="md" source={require("../Icons/Previous.png")} /></Pressable>
      <Pressable onPress ={() => alert("Go")}><ImageExt h="12" w="12" bg="white" rounded="md" source={require("../Icons/Next.png")}  /></Pressable>
      <Pressable onPress ={() => alert("Go")}><ImageExt h="12" w="12" bg="white" rounded="md" source={require("../Icons/FontSize.png")}  /></Pressable>
      <Pressable onPress ={() => alert("Go")}><ImageExt h="12" w="12" bg="white" rounded="md" source={require("../Icons/Share.png")}  /></Pressable>
      </HStack>
     </>
    );
}



export default BottomBar;