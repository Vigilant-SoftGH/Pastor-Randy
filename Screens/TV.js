import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ToastAndroid, Alert, Image, ImageBackground} from "react-native";
import { NativeBaseProvider, Button, Text, TextArea, Icon, Modal, FlatList, Avatar, VStack, HStack, IconButton, Pressable, Factory, Divider, Spinner, Input, Container, ScrollView, Center, Box, AlertDialog, Flex, Spacer, CheckIcon, Select, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import * as Animatable from 'react-native-animatable';

import {db} from '../Firebase/config';

import {getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, setDoc, startAfter, limit, orderBy, onSnapshot, query, where, doc, getDoc, collectionGroup } from '@firebase/firestore';




const auth = getAuth();

//const User = auth.currentUser;

const firestore = getFirestore();



const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function TV({route}) {
  const ImageExt = Factory(Image);
  const ImageBg = Factory(ImageBackground);
  const navigation = useNavigation();
  //const route = useRoute();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';


 const [userID, setUserID] = useState("");
  const [category, setCategory] = useState("Forum");
  const [data, setData] = useState([]);

  const [updatedData, setUpdatedData] = useState(data.length);

  const [data2, setData2] = useState([]);
  const [finish, setFinish] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [user, setUser] = useState(null);
  const [userPic, SetUserPic] = useState("");
    const [newUID, SetNewUID] = useState("");
    const [dataStatus, setDataStatus] = useState('');
    const [text, setText] = useState('');
    const [selected, setSelected] = useState("Home");

  const [lastSeen, setLastSeen] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(null);

    const [complete, setComplete] = useState(false);
    const [logged, setLogged] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => {setIsDisabled(false);setIsOpen(false);}
  const onClose2 = () => {setIsDisabled(false);setIsOpen2(false);}
  const [subtitle, setSubtitle] = useState('');
  const [subtitle2, setSubtitle2] = useState('');
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [dataComments, setDataComments] = useState([]);
  const [entryName, setEntryName] = useState("");

  const [databibleAsk, setBibleAsk] = useState([]);
  const [closeLoader, setCloseLoader] = useState(true)

  const {type} = route.params;


  const photoURL_church = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Church.png?alt=media&token=002cf298-e5bb-4ea5-8e93-c866b99171f2";

  const photoURL_schools = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Schools.png?alt=media&token=194ef53b-96b0-47b5-b9ca-abd70c28bec1";

  const photoURL_hospitals = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Hospitals.png?alt=media&token=81bb9a54-116d-43fc-95bc-82259cda81d0";

  const photoURL_restaurants = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/Restaurant.png?alt=media&token=5a7c00ea-fd66-40c2-a3ac-5232abf73ae1";

  const photoURL_musicians = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/music-png-6098%20(1).png?alt=media&token=3076ccf8-f0e4-4741-921b-ebb33807133f";

  const photoURL_singing_groups = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/music-png-6098%20(1).png?alt=media&token=3076ccf8-f0e4-4741-921b-ebb33807133f";


  const photoURL_gnaas = "https://firebasestorage.googleapis.com/v0/b/ghana-sda-app.appspot.com/o/GNAAS.jpg?alt=media&token=1996dec4-16f9-41e7-b831-857af154d646";


  /*console.log(data.length)*/
  const [loaded, setLoaded] = useState(false);
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
      const timer = setTimeout(() =>{ setShowLoad(true);}, 500);

      return () => clearTimeout(timer);
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


  useEffect(() => {
  
  
    const loadDataTV = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "TV" ), orderBy("creationDate"), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeen(lastVisible);
  console.log(documentData.length)


  const getResults = documentData.filter(searchTVData);
  setData(getResults);
  console.log("Search DATA"+ getResults.length)
              function searchTVData(value) {
                return value.TvUrl !=="";
              }
           
              setLoaded(true);

            //setIsLoading(false);
  
             
    
    }
  
    loadDataTV()
  
  
  
    //setFinish((finish) => !finish)
  
  
  }, [setData]);


  const loadMoreTV = async () => {
    setIsRefreshing(true);
    if(lastSeen == undefined)
        {
          setLoadMore("That's all for now");
        }
        else{
        setLoadMore("Loading more...")
        }
       
    //const userEntries; 
  const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "TV" ),  orderBy("creationDate"), startAfter(lastSeen), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeen(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
    if(documentData.length < 1)
    {
      setLoadMore("That's all for now");
    }
    const newArr = [...data, ...documentData];
  
    console.log(newArr.length)
  
            setData(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }




  //Show Ad
  useEffect(() => {
    //setShowLoad(true)
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
       
      });
  
      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          //setLoaded(false);
          interstitial.load();
        }
      );
  
      // Start loading the interstitial straight away
      interstitial.load();
  
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

    /*App UI desingn ended*/



  
  
    //setFinish((finish) => !finish)
  
  



  useEffect(() =>
  {
  const getData = async() =>
  {
   
     const User = auth.currentUser;
    const uid  = User.uid;

    //setUserID(uid);

  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef).catch((e) => console.log(e));


  
  if (docSnap.exists()) {
    const userData = docSnap.data();
    //console.log("Document data:", docSnap.data());

    setUser(userData);

    SetUserPic(userData.photoURL);
   
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}

const setData = setTimeout(getData, 300);
return () => clearTimeout(setData);
  }, []
  );
  


useEffect(() =>
{
    //setLoaded(true);
    //setFinish(true);

//SetNewUID(auth.currentUser.uid);


    console.log(data);

}, []);




let dateNow = new Date();
let addData = dateNow.getMilliseconds()+dateNow.getSeconds()+dateNow.getMinutes();

function ProcessStarter()
{

  setIsDisabled(true);
  setIsDisabled2(true);

  if (comment =="") {

   alert("Comment cannot be empty! Write something")
    setIsDisabled(false);
    setIsDisabled2(false);
    return;
  }


AddComments();

}


async function AddComments() {

    const User = auth.currentUser;
    const uid = User.uid;
        setDataStatus("comment");
        let userData;
    
    
              userData = {
                id: newUID,
                title: entryName,
                type: category,
                name: user ? user?.fname+" "+user?.lname : "user"+addData,
                otherName: "user"+addData,
                comment: comment,
                photoURL: userPic,
                creationDate: new Date()
               
              }
    
            let userDataAlert;
              userDataAlert = {
                id: newUID,
                title: entryName,
                message: user ? user?.fname+" "+user?.lname+" commented on your post" : "user"+addData+" commented on your post request",
                type: category,
                name: user ? user?.fname+" "+user?.lname : "user"+addData,
                otherName: "user"+addData,
                comment: comment,
                photoURL: userPic,
                creationDate: new Date()
               
              }
    
      
    
    
    
            setDoc(doc(db, "users", newUID, "Comments", "Forum", "entryData", subtitle), userData).then(() => {
            //setIsDisabled(false);
            console.log(userData);  console.log("Comment saved succesfully");
            //ToastAndroid.show("success, comment submitted", ToastAndroid.LONG);
            //setIsDisabled2(false);
            //setIsDisabled(false);
            //setLogged(true); setComplete(true);


    
    
            setDoc(doc(db, "users", newUID, "Inbox", "Notifications", "entryData", entryName), userDataAlert).then(() => {
              //setIsDisabled(false);
              console.log(userData);  console.log("Comment alert sent succesfully");
              ToastAndroid.show("success, comment submitted", ToastAndroid.LONG);
              setIsDisabled2(false);
              setIsDisabled(false);
              setLogged(true); setComplete(true);
      
            setIsOpen(false);
            }
            ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);   setIsDisabled(false);setIsDisabled2(false);
            setLogged(true); setComplete(true);console.log(e);
          return} 
            );
    
    
           // setOpenComment(false);
          }
          ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled(false); setIsDisabled2(false);
          setLogged(true); setComplete(true);console.log(e);
        return} 
          );
    
    
          const EntryMainRef = doc(db, "Comments", "Forum", entryName, newUID);
          const docSnap2 = await getDoc(EntryMainRef).catch((e) => console.log(e));
    
      
            if (!docSnap2.exists()) {
         
            setDoc(doc(db, "Comments", "Forum", entryName, newUID), {id : newUID, PrayerID: userID}).then(() => {
              console.log("User uid saved succesfully for future use");
             }
             ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled(false); setIsDisabled2(false);
             setLogged(true); console.log(e);
              //setComplete(true);
             return} 
             )
    
           
          } 
          
          else {
         //Do Nothing
          }
        
          const EntryMainRef2 = doc(db, "Inbox", "Notifications", "entryData", userID);
          const docSnap3 = await getDoc(EntryMainRef2).catch((e) => console.log(e));
    
      
            if (!docSnap3.exists()) {
         
            setDoc(doc(db, "Inbox", "Notifications", "entryData", userID), {id : userID, senderID: newUID}).then(() => {
              console.log("User uid saved succesfully for future use");
             }
             ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled(false); setIsDisabled2(false);
             setLogged(true); console.log(e);
             //setComplete(true);

             return} 
             )
    
           
          } 
          
          else {
         //Do Nothing
          }
        
    
        
      }


//Discard alert
      const DiscardData = () =>
{


  Alert.alert(
    'Discard changes?',
    'You have unsaved data. Are you sure you want to cancel?',
    [
      { text: "Don't cancel", style: 'cancel', onPress: () => {} },
      {
        text: 'Cancel',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => {onClose();onClose2},
      },
    ]
  );
}


function ProcessStarter2()
  {

    setIsDisabled(true);
    setIsDisabled2(true);

    if (post =="") {

     alert("Input cannot be empty! Write something")
      setIsDisabled(false);
      setIsDisabled2(false);
      return;
    }

  
  AddPost();

  }
   

  
  async function AddPost() {

    setDataStatus("post");
    let userData;

  
          userData = {
            id: newUID,
            title:subtitle2,
            identifier: subtitle2,
            type: "Forum",
            name: user ? user?.fname+" "+user?.lname : "user"+addData,
            otherName: "user"+addData,
            post: post,
            photoURL: user ? user?.photoURL : "https://firebasestorage.googleapis.com/v0/b/zambia-sda-app-d534e.appspot.com/o/Q%26A%20(1).png?alt=media&token=58652dc7-0322-4ae1-a383-c80036f92560",
            otherphotoURL: "https://firebasestorage.googleapis.com/v0/b/zambia-sda-app-d534e.appspot.com/o/Q%26A%20(1).png?alt=media&token=58652dc7-0322-4ae1-a383-c80036f92560",
            creationDate: new Date()
           
          }

        

   



        setDoc(doc(db, "Forum", "entryData", "userData", subtitle2), userData).then(() => {
        //setIsDisabled(false);
        setText("");
        console.log(userData);  console.log("post saved succesfully");
        ToastAndroid.show("success, post submitted", ToastAndroid.LONG);
        setIsDisabled(false); setIsDisabled2(false);
        setLogged(true); setComplete(true);
        setIsOpen2(false);
       //return navigation.navigate('Forum');
      }
      ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled(false); setIsDisabled2(false);
      setLogged(true); setComplete(true);console.log(e);
    return} 
      );


      const EntryMainRef = doc(db, "Forum", "entryData", "userData", newUID);
      const docSnap2 = await getDoc(EntryMainRef).catch((e) => console.log(e));

  /*
        if (!docSnap2.exists()) {
     
        setDoc(doc(db, "Forum", "entryData", "userData", newUID), {id : newUID}).then(() => {
          console.log("User uid saved succesfully for future use");
         }
         ).catch((e) => {ToastAndroid.show("An error occured please try again", ToastAndroid.LONG);  setIsDisabled(false); setIsDisabled2(false);
         setLogged(true); setComplete(true);console.log(e);
         return} 
         )

       
      } 
      
      else {
     //Do Nothing
      }
    
 */

    
  }


//Render Item
const entryEmpty = () =>
{

    return   (<Center> 
      { loadMore == null ? <Box color="gray.500" mt="20%"><Spinner size="lg" accessibilityLabel='Loading Data' /> <Heading size="md" color="gray.300">Loading ... </Heading></Box>: <Box color="gray.500" mt="20%"><Spinner size="lg" accessibilityLabel='Loading Data' /> <Heading size="md" color="gray.300">NO DATA RETRIEVED!! Check your network connection </Heading></Box> }</Center>);
}



const entryFooter = () =>
{

    return   (<Center py="3">{ data.length > 0 ? <Heading color="gray.300" size="md">
    <Text style={{fontFamily: "FuturaBold"}}>{loadMore}</Text></Heading> : null }</Center>);
}

const renderItem = ({ item }) => (  <Box h="200px" mr="5" mb="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
<Heading  p="1" size="md" color="gray.300"><Text style={{fontFamily: "FuturaBold"}}>{item.title}</Text></Heading>
<Pressable onPress = { ()=> {ShowAd();if(item.TvUrl.indexOf("youtu.be") > -1) {var newAddr = item.TvUrl.substring(item.TvUrl.lastIndexOf("/")+1)} else{};item.TvUrl.indexOf("youtu.be") > -1 ? navigation.navigate("Youtuber", {Title : Truncate(item.title, 15), WebUrl : newAddr, colorData: "green.700", Info : "", data: item.about, array:data}) : navigation.navigate("WebViewer", {Title : Truncate(item.title, 15), WebUrl : item.TvUrl, colorData: "green.700", Info : "Rotate your phone to landscape after clicking full screen", data: item.about, array: data})}}>
<ImageBg w="100%" h="165px" source={{uri: item.photoURL}}>
<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" ><ImageExt w="50px" h="30px" source={require("../Img/Live.png")} />
</Animatable.View>

</ImageBg>
</Pressable>

</Box>);


if(!showLoad)
{ return <LoadingScreen />}

else{



    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <Box bg="dark.50" h="100%">
            <AppBar title={type} />
          
            <Box rounded="lg" h="75%" px="5" py="5">
    
<Divider />

{

    !loaded ?
<>
<Center py="8"><Spinner size="lg" mt="30%" accessibilityLabel='Loading news' /></Center>
    </>
    :
<>

<FlatList mt="4" h="65%" data={data} extraData={updatedData} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={loadMoreTV} onEndReachedThreshold={0.5}
refreshing={isRefreshing} />
    </>


    }

    



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


export default TV;
