import React, {useState} from "react";
import { Platform, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import {AsyncStorage} from "@react-native-community/async-storage";
import {Box, HStack, IconButton, Icon, Heading, Menu, Spacer, Pressable, Button, Text, useToast, Center, AlertDialog} from "native-base";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Anchor from "../Components/Anchor";
import ShareApp from "../Components/ShareApp";
import * as Application from 'expo-application';
import { Linking } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {db} from '../Firebase/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function AppBar(props) {

  let Ver = Application.nativeApplicationVersion;
  let MailAddr = "mailto:vigilantsoftgh@gmail.com?subject=Pastor Doug Sermons V."+Ver+" User Feedback";
  const [shouldOverlapWithTrigger] = React.useState(true);
const [data, setData] = useState('');
const [user, setUser] = useState(null);
const navigation = useNavigation();

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
     
      //console.log("Document data:", docSnap.data());

      setUser(user);
//alert("Im here")
   
      AsyncStorage.setItem("UserID", uid);

    

      console.log(user);
     
   
    // ...
  } else {
    // User is signed out

    //alert("Im not here")
    AsyncStorage.setItem("UserID", "");
  }
});


  return (
    
     
         <>
        
        <Box safeAreaTop bg="dark.50" />
    
        <Box bg="dark.50" p="3" shadow="5">
    <HStack justifyContent={"center"}>
    <IconButton onPress={()=> navigation.goBack()} icon={<Icon size="lg" as={MaterialIcons} name="arrow-back" color="white" />} />
    <Heading color="gray.300" pl="5">
      <Text style={{fontFamily: "FuturaBold"}}>
{props.title}
</Text>
</Heading>

<Spacer />

<Menu closeOnSelect={true} w="220" onOpen={() => console.log("opened")} placement='top right' onClose={() => console.log("closed")} trigger={triggerProps => {
      return <Pressable {...triggerProps}>
              <Icon as={MaterialIcons} name="menu" size="xl" color="gray.100" />
            </Pressable>;
    }}>
       <Menu.Item  onPress={() =>{ShareApp();}}><Icon as={MaterialIcons} name="share" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Share App</Heading></Menu.Item>

       <Menu.Item  onPress={() =>{navigation.navigate("About")}}><Icon as={MaterialIcons} name="person" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">About App</Heading></Menu.Item>

       <Menu.Item  onPress={() =>{Linking.openURL("https://play.google.com/store/apps/details?id=com.vigilantsoft.pastorrandy")}}><Icon as={MaterialIcons} name="star" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Rate App</Heading></Menu.Item>

        <Menu.Item  onPress={() =>{Linking.openURL(MailAddr)}}><Icon as={MaterialIcons} name="mail" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Contact Developer</Heading></Menu.Item>

       <Menu.Item  onPress={() =>{navigation.navigate("Search")}}><Icon as={MaterialIcons} name="search" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Search</Heading></Menu.Item>
       {/*<Menu.Item  onPress={() =>{navigation.navigate("BlogPosts")}}><Icon as={MaterialIcons} name="book" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Bible Study</Heading></Menu.Item>*/}
       

{
  user ?
       <>
<Menu.Item  onPress={() =>{navigation.navigate("Dashboard")}}><Icon as={MaterialIcons} name="add-circle" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Add Video</Heading></Menu.Item>
       <Menu.Item  onPress={() =>{navigation.navigate("Profile")}}><Icon as={MaterialIcons} name="person" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">My Profile</Heading></Menu.Item>


        <Menu.Item  onPress={() =>{navigation.navigate("EntriesUI")}}><Icon as={MaterialIcons} name="import-contacts" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">My Entries</Heading></Menu.Item>

        <Menu.Item  onPress={() =>{navigation.navigate("Inbox")}}><Icon as={MaterialIcons} name="inbox" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Inbox</Heading></Menu.Item>

        <Menu.Item  onPress={() =>{navigation.navigate("FAQs")}}><Icon as={MaterialIcons} name="help" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">FAQs</Heading></Menu.Item>

       <Menu.Item  onPress={() =>{navigation.navigate("HelpCenter")}}><Icon as={MaterialIcons} name="help-center" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Help Center</Heading></Menu.Item>

       <Menu.Item  onPress={() =>{Linking.openURL("https://play.google.com/store/apps/details?id=com.vigilantsoft.supportus")}}><Icon as={MaterialIcons} name="volunteer-activism" size="xl" color="gray.500" />
       <Heading size="sm" color="gray.500">Support Us</Heading></Menu.Item></> : null

}


        </Menu>

  
</HStack>
  </Box>
     </>
    );
}



export default AppBar;