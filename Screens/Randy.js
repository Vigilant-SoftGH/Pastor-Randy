import { NavigationContainer, useNavigationState, NavigationHelpersContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, View, Image, Share, BackHandler, ImageBackground, ToastAndroid, Alert} from "react-native";
//import {Html5Entities} from "html-entities";
import { NativeBaseProvider, Text, Spacer, Icon, Button, Factory, Flex, Menu, Divider, useToast, Pressable, Container, Heading, Center, ScrollView, Box, AlertDialog, HStack, resolveStackStyleInput, VStack} from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, AdEventType, BannerAdSize, BannerAd, TestIds} from 'react-native-google-mobile-ads';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBar from '../Components/AppBar';
import LoadingScreen from './LoadingScreen';
import AppMenu from "../Components/AppMenu";
import * as Application from 'expo-application';
//import { Audio } from 'expo-av';
//import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { Linking } from 'react-native';
import {db} from '../Firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { doc, query, where, setDoc, getDoc, getDocs, collection } from "firebase/firestore";



const auth = getAuth();





  // DO ✔    


  const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';

  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true

  });


function Randy({navigation}) {

  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);

  MyCustomComponent = Animatable.createAnimatableComponent(Heading);

  const [isDisabled, setIsDisabled] = useState(false);
  const [color, setColor] = useState("white");
  const [showLoad, setShowLoad] = React.useState(false);

  const [overwriteAlert, setOverWriteAlert] = React.useState(false);

  const [sound, setSound] = useState();
  const [sound2, setSound2] = useState();
  const [checkNameSound, setCheckNameSound] = useState("check-box");
  const [checkNameMusic, setCheckNameMusic] = useState("check-box");

  const [homeTitle, setHomeTitle] = useState("On Death and Dying");
  const [Next, setNext] = useState(1);
  const [open, setOpen] = useState(true);
  const [dataChanger, setDataChanger] = useState('');
  const [dataArticles, setDataArticles] = useState([]);

  const[scoreData, setScoreData] = useState();

  const adomText="";

  const[joyText, setJoyText] = useState("");

  const[joyPrimeText, setJoyPrimeText] = useState("");


  const[africaNewsText, setAfricaNewsText] = useState("");

  const[favName, setFavName] = useState("");

  
  let Ver = Application.nativeApplicationVersion;
  let MailAddr = "mailto:vigilantsoftgh@gmail.com?subject=Pastor Randy Sermons V."+Ver+" User Feedback";

 const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';


 /*const [loaded, setLoaded] = useFonts({
  Futura: require('../Fonts/Futura.ttf')
});*/

  const [isOpen, setIsOpen] = useState(false); 

   const [loaded2, setLoaded2] = useState(false);
  

  const onClose = () => setIsOpen(false); 
  const cancelRef = React.useRef(null); 


  useEffect(() =>
{
  //Announcer();

}, []);


/*
//LoadNews
useEffect(() => {

  const loadDataArticles = async () => {
  
     
    //const userEntries; 

    const list = [];
 
      const querySnapshot = await getDocs(collection(db, "Articles", "entryData", "General"));
      querySnapshot.forEach((doc) => {
      
          console.log(doc.id, " => ", doc.data());

          const { Data } = doc.data();
         
         list.push(
         doc.data()
          );


    
      });

      setDataArticles(list);
    
  



}

loadDataArticles()



//setFinish((finish) => !finish)


}, [setDataArticles]);

*/


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



  //const StatusB= Factory(StatusBar);
  const alerter = useToast();
const [header, setHeader] = useState('');
//Save AppBar Title

  //const entities= new Html5Entities();

//Show Ad
useEffect(() => {
  //setShowLoad(true)
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded2(true);
     
    });

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded2(false);
        interstitial.load();
      }
    );

    // Start loading the interstitial straight away
    interstitial.load();
    setShowLoad(true)
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



  function checkData(data)
  {
    return data.name == favName
  }


  const saveFavs = async(name, photo, url, about, type) =>
  {

    try {
 
      const value = await AsyncStorage.getItem('Favs');
  
    
      if (value !== null) {
  const parser =  JSON.parse(value);
  console.log("Favs length =>"+parser.length)

  const getData = parser.find(checkData);


        if(parser.length < 500)
  {

    if(getData == undefined)
    {
  const Favs = parser.concat([{   
    name: name,   
    photoURL: photo,
    type: type,
    url: url,
    about: about,
    date: new Date()
   }]);
     await AsyncStorage.setItem("Favs", JSON.stringify(Favs));

    ToastAndroid.show("Added to Favorites", ToastAndroid.LONG);
    }

    else

    {
      ToastAndroid.show("Already Added to Favorites", ToastAndroid.LONG);

    }
  }
      }
  
      else
      {
        const arr = [{  
          name: name,    
          photoURL: photo,
    type: type,
    url: url,
    about: about,
    date: new Date()
         }];
  
      
    
     await AsyncStorage.setItem("Favs", JSON.stringify(arr));
  
     ToastAndroid.show("Added to Favorites", ToastAndroid.LONG);
      }
  
    } catch (e) {
      // saving error
    }
  
  }



  
  if(!showLoad)
  {

    return <LoadingScreen />
  }
 
  
else
{

    return (
   
       <NativeBaseProvider>
<StatusBar style="light" />


<Box bg="coolGray.800" h="100%">

<ImageBg rounded="sm" shadow={"5"} w="100%" h="100%" source={require("../assets/Randy.jpg")} >



<AppBar title="About Ps. Randy" />
<Box style={{backgroundColor:"rgba(0,0,0,0.6)"}} w="100%" h="100%">

  <Box w="100%" borderTopRadius="2xl" style={{backgroundColor:"rgba(0,0,0,0.6)"}}>


  <ScrollView>
    <Box px="3" py="3" mb="6">
  <Heading borderRadius="lg" justifyContent="center" size="lg" p="3" mx="4" mt="6" color="white" style={{backgroundColor:"rgba(0,0,0,0.2)"}}>

<Text style={{fontFamily: "FuturaBold"}}>
About Randy Skeete
  </Text></Heading>
  

  <Text style={{fontFamily: "Futura"}} fontSize="20px" py="3" color="gray.200">
  Randy Skeete is an evangelist and revivalist from Ann Arbor, Michigan. Elder Skeete has preached for revivals and evangelistic meetings around the world, including Uganda, England, Australia, the Philippines, and Kenya, as well as in the United States. He is currently a speaker for CAMPUS Ministries.

</Text>


    
<Box justifyContent={"center"} mt="6">
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
<Text style={{fontFamily: "Futura"}} fontSize="20px" py="3" color="gray.200">
This app is NOT affiliated to, nor sponsored by Randy Skeete Ministry. The app was developed to help others to also know more about God's truth for this end time, so that they can have life eternal.
</Text>


</Box>
  </ScrollView>

  
  </Box>
 

 
    </Box>


    </ImageBg> 
</Box>


       
      </NativeBaseProvider>


    );

}



  }


const styles= StyleSheet.create ({

    showData: {
        justifyContent: "center",
        alignItems: "center",
        flex:1
          }

});


function Truncate(str, length)
  {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  
  }

  const DateGet=new Date().getFullYear();
  let Ver = Application.nativeApplicationVersion +  Application.nativeBuildVersion;


export default Randy;
