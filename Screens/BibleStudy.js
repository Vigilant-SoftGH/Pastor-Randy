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

import ytdl from "react-native-ytdl";



const auth = getAuth();

//const User = auth.currentUser;

const firestore = getFirestore();



const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function BibleStudy({route}) {
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

  const [loadedURL, setLoadedUrl] = useState(true);

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
  
  
    const loadDataBible_Study = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Bible_Study" ),  orderBy("creationDate", "desc"), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastvisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastvisible);
  
          setLastSeen(lastvisible);
  console.log(documentData.length)
            setData(documentData);
              setLoaded(true);

            //setIsLoading(false);
  
             
    
    }
  
    loadDataBible_Study()
  
  
  
    //setFinish((finish) => !finish)
  
  
  }, [setData]);


  const loadMoreBible_Study = async () => {
    setIsRefreshing(true);
    if(lastSeen == undefined)
    {
      setLoadMore("That's all for now");
    }
    else{
    setLoadMore("Loading more...")
    }
   
    //const userEntries; 
  const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Bible_Study" ), orderBy("creationDate", "desc"), startAfter(lastSeen), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastvisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeen(lastvisible);
  
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


var setUrl;
async function VidRunner(url, title, about)

{

ToastAndroid.show("Loading...", ToastAndroid.SHORT)

const youtubeURL = url;
const urls = await ytdl(youtubeURL, {filter: "videoandaudio"});

var validateURL = ytdl.validateURL(url);

if(validateURL)
{
setUrl = urls[0]["url"];
//alert(setUrl);

console.log(urls[0]["url"]) // "Adele - Hello" thumbail

const timer = setTimeout(() => {
ShowAd(); navigation.navigate("WebViewer", {Title : Truncate(title, 15), WebUrl : setUrl, colorData: "green.700", Info : "", data: about, array:data}) }, 500);

return () => clearTimeout(timer);

}

else
{

ToastAndroid.show("Video failed to play, try again later", ToastAndroid.LONG);
}


ytdl.getInfo('https://www.youtube.com/watch?v=YQHsXMglC9A').then((info) =>{


const json = JSON.stringify(info, null, 2)
  // eslint-disable-next-line max-len
  .replace(/(ip(?:=|%3D|\/))((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|[0-9a-f]{1,4}(?:(?::|%3A)[0-9a-f]{1,4}){7})/ig, '$10.0.0.0');

});



//console.log(urls);
}


let dateNow = new Date();
let addData = dateNow.getMilliseconds()+dateNow.getSeconds()+dateNow.getMinutes();

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

const renderItem = ({ item }) => (  <Box h="200px" w="100%" mr="5" mb="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
<Pressable onPress = { ()=> {VidRunner(item.youtube, item.title, item.about)}}>
<ImageBg w="100%" h="160px" source={{uri: item.photoURL}} >


</ImageBg>
<Heading  w="100%" p="1" size="md" color="gray.300"><Text style={{fontFamily: "FuturaBold"}}>{Truncate(item.title, 25)}</Text></Heading>
</Pressable>

</Box>);


if(!showLoad)
{ return <LoadingScreen />}

else{



    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <Box bg="dark.50" h="100%">
            <AppBar title="Bible Study" />
          
            <Box rounded="lg" h="75%" px="5" py="5">
            {
            !loadedURL ? <Spinner mb="3" size="lg" accessibilityLabel="loading video" /> : null
           }
<Divider />

{

    !loaded ?
<>
<Center py="8"><Spinner size="lg" mt="30%" accessibilityLabel='Loading news' /></Center>
    </>
    :
<>

<FlatList mt="4" h="65%" data={data} extraData={updatedData} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={loadMoreBible_Study} onEndReachedThreshold={0.5}
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


export default BibleStudy;
