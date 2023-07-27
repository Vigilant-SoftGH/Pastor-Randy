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

const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function NewsContent({navigation}) {
  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);
  const route = useRoute();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';
  const slugName = "Church";

  const [email, setEmail] = useState(route.params.email);
  const [userID, setUserID] = useState(route.params.id);
  const [identifier, setIdentifier] = useState(route.params.identifier);
  const [number, setNumber] = useState(route.params.number);
  const [photoURL, setPhotoURL] = useState(route.params.photoURL);
   const [name, setName] = useState(route.params.author);
   const [date, setDate] = useState(route.params.Date);
   const [data, setData] = useState([]);
   const [updatedData, setUpdatedData] = useState(data.length);
  const [category, setCategory] = useState(route.params.category);
   const [entryName, setEntryName] = useState(route.params.entryName);
   const [title, setTitle] = useState(route.params.title);
   const [firstTitle, setFirstTitle] = useState(route.params.title);
   const [subtitle, setSubtitle] = useState('');
   const [post, setPost] = useState(route.params.post);
   const [firstPost, setFirstPost] = useState(route.params.post);
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [dataStatus, setDataStatus] = useState('');
  const [complete, setComplete] = useState(false);
  const [logged, setLogged] = useState(true);
  const [author, setAuthor] = useState(null);
  const [authDate, setAuthDate] = useState("");
  const [authTime, setAuthTime] = useState("");
  const [authorData, setAuthorData] = useState(null);
  
  const [userName, setUserName] = useState(route.params.userName);
  const [userPhone, setUserPhone] = useState(route.params.userPhone);
  const [showLoad, setShowLoad] = React.useState(false);
  const [editMode, setEditMode] = useState(false);

  const photoURL_church = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Church.png?alt=media&token=002cf298-e5bb-4ea5-8e93-c866b99171f2";

  const photoURL_schools = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Schools.png?alt=media&token=194ef53b-96b0-47b5-b9ca-abd70c28bec1";

  const photoURL_hospitals = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Hospitals.png?alt=media&token=81bb9a54-116d-43fc-95bc-82259cda81d0";

  const photoURL_restaurants = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Restaurant.png?alt=media&token=5a7c00ea-fd66-40c2-a3ac-5232abf73ae1";

  const photoURL_musicians = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/music-png-6098%20(1).png?alt=media&token=3076ccf8-f0e4-4741-921b-ebb33807133f";

  const photoURL_singing_groups = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/music-png-6098%20(1).png?alt=media&token=3076ccf8-f0e4-4741-921b-ebb33807133f";


  const photoURL_gnaas = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/GNAAS.jpg?alt=media&token=1996dec4-16f9-41e7-b831-857af154d646";


  /*console.log(data.length)*/
  function ShowAd()
  {

  }

  useEffect(() =>
  {
    function setter()
    {
setShowLoad(true);
    }

    const timer = setTimeout(setter, 500);

    return () => clearTimeout(timer);
  },[]);

/*
useEffect(() =>
{
  
    const loadDataComments = async () => {
  
          const list = [];
          console.log("TitleData: "+route.params.entryName)
       
          
            const q = query(collection(db, "Comments", "Forum", route.params.entryName), where("title", "==", route.params.entryName));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
            
                console.log(doc.id, " => ", doc.data());
    
                const { Data } = doc.data();
               
               list.push(
               doc.data()
                )
  
              
              
          
            });
   
            setData(list);
           
        
            console.log(list);
  
            setShowLoad(true);
  
       
        

        } 
      
        loadDataComments();

    
      
      }, []);

      */
  

  let d = new Date();
  let addData = d.getMilliseconds()+d.getSeconds()+d.getMinutes();



  function ProcessStarterEdit()
  {

    setIsDisabled(true);

    const firstData = title+post;
    const compareData = firstTitle+firstPost;

    let tryData = compareData.indexOf(firstData);

    if(tryData > -1)
    {
      ToastAndroid.show("There's no changes to update", ToastAndroid.LONG);
      setIsDisabled(false);
      return;

    }



    if (title =="" ||  about =="") {

      setDataError((dataError) => !dataError); HideError();
      setIsDisabled(false);
      return;
    }

    const titlelength = parseInt(title.length);
    if (titlelength > 70 ) {
        console.log(titlelength);
        alert("Title is too long, enter a short one");
        setIsDisabled(false);
        return;
      }


  UpdatePrayer();

  }


  /*Update other user profile details(first and last name, email...) */

  async function UpdatePrayer() {

    setDataStatus("otherData");
    let userData;

  
          userData = {
            title: title,
            post: post
              }

        

   


const User = auth.currentUser;
const uid = User.uid;
        updateDoc(doc(db, "users", uid, "Prayers", category, "entryData", identifier), userData).then(() => {
        //setIsDisabled(false);
        setText("");
        console.log(userData);  console.log("Prayer updated succesfully");
        ToastAndroid.show("success, Prayer updated", ToastAndroid.LONG);
        setIsDisabled(false);
        setLogged(true); setComplete(true);
     setEditMode(false);
      }
      ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled(false);
      setLogged(true); setComplete(true);console.log(e);
    return} 
      );

    
  }


  function ProcessStarter()
  {

    setIsDisabled2(true);


    if (comment =="") {

      setDataError((dataError) => !dataError); HideError();
      setIsDisabled2(false);
      return;
    }

  
  AddComments();

  }


  /*Update other user profile details(first and last name, email...) */

  async function AddComments() {
const User = auth.currentUser;
const uid = User.uid;
    setDataStatus("otherData");
    let userData;


          userData = {
            id: uid,
            title: entryName,
            type: category,
            name: user ? user?.fname+" "+user?.lname : "user"+addData,
            otherName: "user"+addData,
            comment: comment,
            photoURL: user ? user?.photoURL : "https://firebasestorage.googleapis.com/v0/b/zambia-sda-app-d534e.appspot.com/o/WomanPraying.jpg?alt=media&token=cd8f25d1-1855-4f1a-a795-cc295f9d0980",
            creationDate: new Date()
           
          }

        let userDataAlert;
          userDataAlert = {
            id: uid,
            title: entryName,
            message: user ? user?.fname+" "+user?.lname+" commented on your post" : "user"+addData+" commented on your post",
            type: category,
            name: user ? user?.fname+" "+user?.lname : "user"+addData,
            otherName: "user"+addData,
            comment: comment,
            photoURL: user ? user?.photoURL : "https://firebasestorage.googleapis.com/v0/b/zambia-sda-app-d534e.appspot.com/o/WomanPraying.jpg?alt=media&token=cd8f25d1-1855-4f1a-a795-cc295f9d0980",
            creationDate: new Date()
           
          }

  



        setDoc(doc(db, "Comments", "Forum", entryName, subtitle), userData).then(() => {
        //setIsDisabled(false);
        console.log(userData);  console.log("Comment saved succesfully");
        //ToastAndroid.show("success, comment submitted", ToastAndroid.LONG);
        //setIsDisabled2(false);
        //setIsDisabled(false);
        //setLogged(true); setComplete(true);


        setDoc(doc(db, "users", userID, "Inbox", "Notifications", "entryData", entryName), userDataAlert).then(() => {
          //setIsDisabled(false);
          console.log(userData);  console.log("Comment alert sent succesfully");
          ToastAndroid.show("success, comment submitted", ToastAndroid.LONG);
          setIsDisabled2(false);
          setIsDisabled(false);
          setLogged(true); setComplete(true);
  
          setOpenComment(false);
        }
        ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled2(false);
        setLogged(true); setComplete(true);console.log(e);
      return} 
        );


       // setOpenComment(false);
      }
      ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled2(false);
      setLogged(true); setComplete(true);console.log(e);
    return} 
      );


      const EntryMainRef = doc(db, "Comments", "Prayers", entryName, uid);
      const docSnap2 = await getDoc(EntryMainRef).catch((e) => console.log(e));

  /*
        if (!docSnap2.exists()) {
     
        setDoc(doc(db, "Comments", "Prayers", entryName, uid), {id : uid, PrayerID: userID}).then(() => {
          console.log("User uid saved succesfully for future use");
         }
         ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled2(false);
         setLogged(true); setComplete(true);console.log(e);
         return} 
         )

       
      } 
      
      else {
     //Do Nothing
      }

      */
    
      const EntryMainRef2 = doc(db, "Inbox", "Notifications", "entryData", userID);
      const docSnap3 = await getDoc(EntryMainRef2).catch((e) => console.log(e));

  
        if (!docSnap3.exists()) {
     
        setDoc(doc(db, "Inbox", "Notifications", "entryData", userID), {id : userID, senderID: uid}).then(() => {
          console.log("User uid saved succesfully for future use");
         }
         ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled2(false);
         setLogged(true); setComplete(true);console.log(e);
         return} 
         )

       
      } 
      
      else {
     //Do Nothing
      }
    

    
  }


  useEffect(() =>
  {
category == "Church" ? setPhotoURL(photoURL_church) : null
category == "Schools" ? setPhotoURL(photoURL_schools) : null
category == "Hospitals" ? setPhotoURL(photoURL_hospitals) : null
category == "Restaurants" ? setPhotoURL(photoURL_restaurants) : null
category == "Musicians" ? setPhotoURL(photoURL_musicians) : null
category == "Singing_Groups" ? setPhotoURL(photoURL_singing_groups) : null
category == "GNAAS" ? setPhotoURL(photoURL_gnaas) : null
  }, [])



//Global_variables
var PhoneNumber="";
var PhoneNumber2="";
  const fontSize = 16;


  const [user, setUser] = useState(null);
  useEffect(() =>
  {
 
   const setData2 = async() => {
 
     const User = auth.currentUser;
     const uid = User.uid;
 
   const docRef = doc(db, "users", uid);
   const docSnap = await getDoc(docRef).catch((e) => { var errCode=e.code; var errMsg=e.message;console.log(errMsg); errMsg.indexOf("offline") > -1? ToastAndroid.show("You are offline, check and restore connection", ToastAndroid.LONG): ToastAndroid.show("An error occured, please try again", ToastAndroid.LONG); } );
 
   if (docSnap.exists()) {
     const userData = docSnap.data();
    // console.log("Document data:", docSnap.data());
   
     setUser(userData);

    
   } else {
     // doc.data() will be undefined in this case
     console.log("No such document!");
   }
 
 
 
 }
 
setData2();
 
  }, []);

  useEffect(() =>
  {

    
  const getData = async() =>
  {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef).catch((e) => console.log(e));


  
  if (docSnap.exists()) {
    const userData = docSnap.data();
    //console.log("Document data:", docSnap.data());
setAuthorData(userData);
setAuthor(userData.fname+" "+userData.lname);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");

    
setAuthor("Author Unavailable");
  }

}

const setData = setTimeout(getData, 700);
return () => clearTimeout(setData);
  }, []
  );



  
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

    return   (<Center><Heading size="sm" color="gray.500">No Comments or check your connection and try again</Heading> </Center>);
}

const renderItem = ({ item }) => (<Pressable><Box borderBottomWidth="1" _dark={{
        borderColor: "gray.600"
        }} borderColor="coolGray.200" pr="5" py="2" w="100%">
              <HStack space={2} justifyContent="space-between" w="100%">
             <Center w="100%">
                <VStack px="6" space={2} w="100%">
                  <Text color="gray.500" fontSize="18px" fontWeight={500}>
                    By {item.name}

                   </Text>
        
                  <Text color="gray.500" fontSize="17px">
                 {item.comment}
                 </Text>

             <HStack>
              <Spacer />
                 <Box><Text fontSize="13px" color="gray.500" fontWeight={500}>Commented on {item.creationDate.toDate().toDateString()}</Text></Box>
                 </HStack>
                </VStack>
                </Center>

            
               
              </HStack>
            </Box></Pressable>);


if(!showLoad)
{

  return <LoadingScreen />
}


else{



console.log(data)
 
    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <AppBar title= {Truncate(title, 15)} />

            <ScrollView w="100%" h="60%" pb="5">
       
       {


!editMode ?

<Box w="100%" rounded="md" borderWidth="1" p="3" borderColor="gray.300"> 
<Box>
<Heading p="2" color="gray.400"><Text color="gray.400" style={{fontFamily: "FuturaBold"}}>{title}</Text></Heading>


<Heading size="sm" color="gray.400" p="3" ml="60%"><Text color="gray.400" style={{fontFamily: "FuturaBold"}}>{date.toDate().toDateString()}</Text></Heading>
             <Center> 
           
                <ImageExt w="100%" h="250px" source={{
          uri: photoURL}} />
            
           

            
            </Center>

            <Text color="gray.500" fontSize="16px" p="3" style={{fontFamily: "FuturaBold"}} ml="70%">
                    By {name}
                  </Text>
            <Box>
          
                  <Text color="gray.500" style={{fontFamily: "Futura"}} fontSize={20}>
                 {post.replace(/\\n/g, "\n")}
                 </Text>



               
                </Box>
               
                { /*!editMode ?

<Box>
{
  user ? user.id == userID ?
  <Center py="3"><Button onPress={() =>setEditMode(true)}>
  <Icon as={MaterialIcons} name="edit" size="lg" color="white"  />
  </Button></Center>

: null : null }
</Box> : null */}


{/*!editMode ?
<Box w="100%">
<Box w="100%" py="4">
<HStack justifyContent="center" mt="6" >
  <Button size="lg" isDisabled={isDisabled} onPress={() => {setIsDisabled(true);setOpenComment(true);}}>Comment</Button>
</HStack>
</Box>
</Box> : null */}

            </Box></Box>  :


       <Box rounded="lg" w="100%" minW="300" bg="gray.100" p="3" mt="4">
 {!editMode ?
      <Heading size="md" color="gray.300" bg="gray.200" p="2" rounded="md">
        {entryName}
    </Heading>
    :
    null

   

 }

  {/*
    <>
    <Heading size="sm" color="danger.500" ml="3">* <Text color="gray.400">Title</Text></Heading>
    <Input mx="3"  onChangeText={(value) =>{setEntryName(value);setTitle(value);setText(value)}} mb="6" placeholder="Your question title" w="90%" maxW="300" value={entryName} />
 </>*/}

    <Center>
 
        
<Box borderWidth={1} rounded="md" p="2" w="100%">
{!editMode ?
<Text fontSize={16}>
  {post}
</Text>
  :
<Box mt="4">
<Heading size="sm" color="danger.500" ml="3">* <Text color="gray.400">Post</Text></Heading>
      <TextArea h={150} mx="3" fontSize={16} type="text" value={post} mb="3" placeholder="your post" w="90%" maxW="300" onChangeText={(value) =>{setPost(value);}}/>
      </Box>
}

{!editMode ?
<HStack mt="6">
  <Spacer />
<Heading size="xs" color="gray.500">
  Submitted by: {name}
{'\n'}
Date : {date.toDate().toDateString()+", "+date.toDate().toLocaleTimeString()}
</Heading>
</HStack> : null
}

</Box>


{!editMode ?

<Box>
{
  user ? user.id == userID ?
  <Center py="3"><Button onPress={() =>setEditMode(true)}>
  <Icon as={MaterialIcons} name="edit" size="lg" color="white"  />
  </Button></Center>

: null : null }
</Box>

:

<Box>
{
  user ? user.id == userID ?


<Box w="100%" py="4">
<HStack justifyContent="center" mt="6" space={4}>
  <Button size="lg" isDisabled={isDisabled} onPress={() => {ProcessStarterEdit()}}>Save</Button>
  <Button colorScheme={"warning"} size="lg" isDisabled={isDisabled} onPress={() => {setEditMode(false);}}>Cancel</Button>
</HStack>
</Box>

: null : null }
</Box>

}

{

!complete ?
    <Center>
   {
   
  
  dataStatus == "photo" ? <Heading size="sm">Processing image: {prog} %</Heading> : dataStatus == "post" ? <Heading size="sm">Updating your post...</Heading> : null
   }
    </Center> : null
}



{/*!editMode ?
<Box w="100%">
{
  user ? 
<Box bg="gray.200" w="100%" py="4">
<HStack justifyContent="center" mt="6" >
  <Button size="lg" isDisabled={isDisabled} onPress={() => {setIsDisabled(true);setOpenComment(true);}}>Comment</Button>
</HStack>
</Box>

: null }
</Box> : null */}


    </Center>

  

      </Box>

      }
      

{ openComment ?
      <Box borderWidth={1} rounded="md" shadow={1} p="3">
<HStack>
  <Spacer /> 
  <Button mr="6" onPress={() => {setOpenComment(false);setIsDisabled(false);}}>
    <Icon as={MaterialIcons} name="close" size="md" color="white" />
  </Button>
</HStack>

      <Box mt="4">
         
      <TextArea h={150} mx="3" type="text" fontSize="16" mb="3" placeholder="Write your comment here" w="90%" maxW="300" onChangeText={(value) =>{setComment(value); let val = value.length; val > 10 ? setSubtitle(value.substring(0, val/2)) : setSubtitle(value.substring(0, val-1)) }}/>
      </Box>

      <Box py="4">
<HStack justifyContent="center">
  <Button size="lg" onPress={() => {ProcessStarter()}} isDisabled={isDisabled2}>Comment</Button>
</HStack>
</Box>


{

!complete ?
    <Center>
   {
   
  
  dataStatus == "photo" ? <Heading size="sm">Processing image: {prog} %</Heading> : dataStatus == "otherData" ? <Heading size="sm">Submitting your answer...</Heading> : null
   }
    </Center> : null
}

      </Box> : null }

      <Divider mt="8" />

      </ScrollView>

      {
/*
!showLoad ?

<Center py="8"><Spinner size="lg" accessibilityLabel='Loading Comments' /> Loading Comments</Center>

:
<>
<FlatList mt="1" mb="2" data={data} extraData={updatedData} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.comment} />
</>

*/
}

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
let Ver = Application.nativeApplicationVersion;



export default NewsContent;
