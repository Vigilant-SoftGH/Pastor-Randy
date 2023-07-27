import { NavigationContainer, useNavigationState, NavigationHelpersContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, View, Image, Share, BackHandler, ImageBackground, ToastAndroid, Alert} from "react-native";
//import {Html5Entities} from "html-entities";
import { NativeBaseProvider, Text, Spacer, FlatList, Icon, Button, Factory, Spinner, Flex, Menu, Divider, useToast, Pressable, Container, Heading, Center, ScrollView, Box, AlertDialog, HStack, resolveStackStyleInput, VStack} from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, AdEventType, BannerAdSize, BannerAd, TestIds} from 'react-native-google-mobile-ads';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeBar from "../Components/HomeBar";
import LoadingScreen from './LoadingScreen';
import AppMenu from "../Components/AppMenu";
import * as Application from 'expo-application';
//import { Audio } from 'expo-av';
//import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { Linking } from 'react-native';
import {db} from '../Firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Apps from '../Data/Apps';

import { doc, query, where, orderBy, limit, setDoc, getDoc, getDocs, collection } from "firebase/firestore";



const auth = getAuth();





  // DO ✔    


  const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';

  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true

  });


function HomeScreen({navigation}) {

  const ImageExt = Factory(Image);
  const ImageBg =  Factory(ImageBackground);

  MyCustomComponent = Animatable.createAnimatableComponent(Heading);

  const [isDisabled, setIsDisabled] = useState(false);
  const [color, setColor] = useState("white");
  const [showLoad, setShowLoad] = React.useState(false);
  const [user, setUser] = useState(null);

  const [overwriteAlert, setOverWriteAlert] = React.useState(false);

  const [sound, setSound] = useState();
  const [sound2, setSound2] = useState();
  const [checkNameSound, setCheckNameSound] = useState("check-box");
  const [checkNameMusic, setCheckNameMusic] = useState("check-box");
  const [lastSeenTV, setLastSeenTV] = useState(null);
  const [lastSeenArticles, setLastSeenArticles] = useState(null);
  const [lastSeenMovies, setLastSeenMovies] = useState(null);
  const [lastSeenSermons, setLastSeenSermons] = useState(null);
  const [lastSeenBible_Study, setLastSeenBible_Study] = useState(null);
  const [lastSeenDocumentary, setLastSeenDocumentary] = useState(null);
  const [lastSeenMusic_Video, setLastSeenMusic_Video] = useState(null);
  const [isRefreshingTV, setIsRefreshingTV] = useState(null);
  const [homeTitle, setHomeTitle] = useState("On Death and Dying");
  const [Next, setNext] = useState(1);
  const [open, setOpen] = useState(true);
  const [dataChanger, setDataChanger] = useState('');
  const [dataArticles, setDataArticles] = useState([]);
  const [dataTV, setDataTV] = useState([]);
  const [dataMovies, setDataMovies] = useState([]);
  const [dataMusic_Video, setDataMusic_Video] = useState([]);
  const [dataSermons, setDataSermons] = useState([]);
  const [dataDocumentary, setDataDocumentary] = useState([]);
  const [dataBible_Study, setDataBible_Study] = useState([]);
  const [updatedDataTV, setUpdatedDataTV] = useState(dataTV.length);
  const [updatedDataBible_Study, setUpdatedDataBible_Study] = useState(dataBible_Study.length);
  const [updatedDataDocumentary, setUpdatedDataDocumentary] = useState(dataDocumentary.length);
  const [updatedDataMusic_Video, setUpdatedDataMusic_Video] = useState(dataMusic_Video.length);

  const[scoreData, setScoreData] = useState();

  let Ver = Application.nativeApplicationVersion;
  let MailAddr = "mailto:vigilantsoftgh@gmail.com?subject=Pastor Randy Sermons V."+Ver+" User Feedback";

 const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';


 /*const [loaded, setLoaded] = useFonts({
  Futura: require('../Fonts/Futura.ttf')
});*/

const AppsInfo = Apps;

  const [isOpen, setIsOpen] = useState(false); 

   const [loaded2, setLoaded2] = useState(false);
  

  const onClose = () => setIsOpen(false); 
  const cancelRef = React.useRef(null); 

  const SDAApps = [
  {name: 'SDA HandBook',
  url:'https://play.google.com/store/apps/details?id=com.vigilantsoft.sdahandbook',
photoURL:'https://play-lh.googleusercontent.com/5lK0rGELKFXtWS4u82rIJverCx2HduwmuRwk4UXygI0dKG7J_VH3MFa3nAsfum8sMl0=w240-h480-rw'},

{name: 'Sabbath School',
url:'https://play.google.com/store/apps/details?id=com.vigilantsoft.sdasabbathschoolquarterly',
photoURL:'https://play-lh.googleusercontent.com/xK0WmGHz9bbUJAhQLIb33vbe56jRjiRpQ36ypoinNda_m0riMI18NssIj0DptnwkA1Q=s256-rw'},

{name: 'SDA Quotes',
url:'https://play.google.com/store/apps/details?id=com.vigilantsoft.sdaquotes',
photoURL:'https://play-lh.googleusercontent.com/B-pPFjE6R7vb9zU9iTK9b1Gc7kiQmafWrQcGlhky60YZWVcy7m-xj00izH8EFD-ewySN=s256-rw'},

{name: 'SDA Sermons',
url:'https://play.google.com/store/apps/details?id=com.vigilantsoft.sdamusicandsermons',
photoURL:'https://play-lh.googleusercontent.com/D3tS8yzyurQXsIDp0N6F6MnrvWi0baLa8GaukJmrD2nhO2L30NOtZXVsCjhbwiu5sI8G=s256-rw'},

{name: 'Great Controversy',
url:'https://play.google.com/store/apps/details?id=com.vigilantsoft.thegreatcontroversy',
photoURL:'https://play-lh.googleusercontent.com/yrZGiSvAhTaT6eqWellKvI48N4X2MuKIrETyNILvdUzgYKLDJwEzOJQZG8x0DE4q6g=s256-rw'},
  ];



  useEffect(() =>
{
  //Announcer();

 // console("SDA Apps =>"+governmentBodies)

}, []);



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




//LoadData

/*
useEffect(() => {

  const loadDataArticles = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "BibleStudy", "Entries", "entryData"), orderBy("creationDate"), limit(5));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenArticles(lastVisible);
  console.log(documentData.length)
            setDataArticles(documentData);

      //setDataArticles(list);

}

loadDataArticles()

//setFinish((finish) => !finish)


}, [setDataArticles]);



useEffect(() => {

  const loadDataTV = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "TV" ), limit(10));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenTV(lastVisible);
  console.log(documentData.length)
            setDataTV(documentData);

      //setDataArticles(list);

}

loadDataTV()

//setFinish((finish) => !finish)


}, [setDataTV]);


useEffect(() => {

  const loadDataMovies = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Movies" ), limit(10));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenMovies(lastVisible);
  console.log(documentData.length)
            setDataMovies(documentData);

      //setDataArticles(list);

}

loadDataMovies()

//setFinish((finish) => !finish)


}, [setDataMovies]);


useEffect(() => {

  const loadDataMusic_Video = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Music_Video" ), limit(10));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenMusic_Video(lastVisible);
  console.log(documentData.length)
            setDataMusic_Video(documentData);

      //setDataArticles(list);

}

loadDataMusic_Video()

//setFinish((finish) => !finish)


}, [setDataMusic_Video]);


useEffect(() => {

  const loadDataDocumentary = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Documentary" ), limit(10));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenDocumentary(lastVisible);
  console.log(documentData.length)
            setDataDocumentary(documentData);

      //setDataArticles(list);

}

loadDataDocumentary()

//setFinish((finish) => !finish)


}, [setDataDocumentary]);


useEffect(() => {

  const loadDataBible_Study = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Bible_Study" ), limit(10));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenBible_Study(lastVisible);
  console.log(documentData.length)
            setDataBible_Study(documentData);

      //setDataArticles(list);

}

loadDataBible_Study()

//setFinish((finish) => !finish)


}, [setDataBible_Study]);


useEffect(() => {

  const loadDataSermons = async () => {
  
     
    //const userEntries; 

    const list = [];
 
    const q = query(collection(db, "PastorRandy", "Entries", "entryData"), where("type", "==", "Sermons" ), limit(10));
  

    const documentSnapshots = await getDocs(q);

     let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeenSermons(lastVisible);
  console.log(documentData.length)
            setDataSermons(documentData);

      //setDataArticles(list);

}

loadDataSermons()

//setFinish((finish) => !finish)


}, [setDataSermons]);

*/


const ShareApp = async () => {
  try {
    const result = await Share.share({
      message:
        'Hi, I found this amazing Pastor Randy Sermons app. Get in touch with the word of God. Watch unlimited SDA Content.. Get it from the app store: https://play.google.com/store/apps/details?id=com.vigilantsoft.pastorrandy',
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

  const User = auth.currentUser;

  

//Render Item

const entryEmpty = () =>
{

    return   (<Center> <Box color="gray.500" mt="20%"><Spinner size="lg" accessibilityLabel='Loading Posts' /> <Heading size="md" color="gray.300">Loading ... </Heading></Box></Center>);
}


const entryFooter = () =>
{

    return   (<Center><Box w="300px" rounded="md" borderWidth="1" p="3" borderColor="gray.300"><Box>
  
    <Pressable onPress = { ()=> { ShowAd();navigation.navigate('AllVideos', {type: "TV"})}}>
    <ImageBg w="100%" h="200px" rounded="md" source={require("../assets/Randy.jpg")}>
    <Box style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}} h="100%" w="100%">
    <Heading color="gray.100" size="md" py="70px" px="5">
    <Text color="white" style={{fontFamily: "FuturaBold"}}>
More Pastor Randy Sermons
    </Text>
    </Heading></Box>
    </ImageBg>
    </Pressable>
    
    <Button colorScheme={"primary"} size="lg" ml="60%" mt="4"  onPress = { ()=> { ShowAd();navigation.navigate('AllVideos', {type: "TV"})}}><Text color="white" style={{fontFamily: "Futura"}}>
   Load More</Text>
    </Button></Box> </Box></Center>);
}

const renderItem = ({ item }) => (   <Box w="300px" h="200px" p="1" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
<Pressable onPress = { ()=> {ShowAd();navigation.navigate("WebViewer", {Title : Truncate("Adom Tv live", 15), WebUrl : "https://www.dailymotion.com/embed/video/x7w71b8", colorData: "green.700", Info : ""})}}>
<ImageBg w="100%" h="100%" source={{uri: item.photoURL}} >
<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" ><ImageExt w="50px" h="30px" source={require("../Img/Live.png")} />
</Animatable.View>

</ImageBg>
</Pressable>
</Box> 
  );


  
  if(!showLoad)
  {

    return <LoadingScreen />
  }
 
  
else
{

    return (
   
       <NativeBaseProvider>
<StatusBar style="light" />
<Box bg="dark.50" h="100%">
<HomeBar title="Pastor Randy" />
<HStack p="3" space="5" justifyContent="center" bg="dark.50"><Pressable onPress={() =>{navigation.navigate("Search")}}><Icon as={MaterialIcons} name="search" size="2xl" /></Pressable><Pressable  onPress={() =>{ShareApp();}}><Icon as={MaterialIcons} name="share" size="2xl" /></Pressable>{/*<Pressable onPress = { ()=> {ShowAd();navigation.navigate("BlogPosts", {type: "Bible_Study"})}}><Icon as={MaterialIcons} name="book" size="2xl" /></Pressable>*/}<Pressable onPress={() =>{Linking.openURL("https://play.google.com/store/apps/details?id=com.vigilantsoft.pastorrandy")}}><Icon as={MaterialIcons} name="star" size="2xl" /></Pressable></HStack>

  <ScrollView>
{/*
<Box p="3" bg="gray.600">
  <Heading  p="2" color="gray.100" size="md"><Text style={{fontFamily: "FuturaBold"}}>Welcome to Pastor Randy Sermons. Watch unlimited Pastor Randy Sermons, movies & Music videos OR Add SDA videos(Youtube videos or live videos)</Text></Heading>
    </Box>*/}

   



{/*
            
           
            user ? 
<Button bg="dark.50" my="2" w="40%"  m="3" onPress={() =>{navigation.navigate("Dashboard")}}>Add Video</Button>

:

<Button bg="dark.50" my="2" w="40%"  m="3" onPress={() =>{navigation.navigate("Dashboard")}}>Login</Button>
*/
}


<Box w="100%" p="2">

<VStack w="100%" space="5">

<Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {navigation.navigate("Randy")}}>
          <ImageBg w="100%" h="100%" source={require('../assets/Randy.jpg')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
About Randy Skeete
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>


          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {navigation.navigate("Sermons", {type: "Video Sermons"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/Randy.jpg')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Video Sermons
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>


          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {navigation.navigate("AudioSermons", {type: "Audio Sermons"})}}>
          <ImageBg w="100%" h="100%" source={require('../assets/Randy.jpg')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Audio Sermons
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>

{/*
          <Box h="200px" w="100%" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
          <Pressable onPress = { ()=> {Linking.openURL("") }}>
          <ImageBg w="100%" h="100%" source={require('../assets/Randy.jpg')} >
     <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}} py="60px">
        <Center>
     <Heading  p="1" size="lg" color="gray.100"><Text style={{fontFamily: "FuturaBold"}}>
Donate to Randy Batchelor
</Text></Heading>
</Center>
     </Box>
          
          </ImageBg>
        
          </Pressable>
          
          </Box>

*/}

    
</VStack>

 
    </Box>
   


<Center pt="2" pb="4">
{/*
                
            user ? 
<Button bg="dark.50" my="2" w="40%"  m="3" onPress={() =>{navigation.navigate("Dashboard")}}>Add Video</Button>

:

<><Heading size="sm"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Log in to add videos</Text></Heading><Button bg="dark.50" my="2" w="40%"  m="3" onPress={() =>{navigation.navigate("Dashboard")}}>Login</Button></>
*/
}
{/*
<Button bg="coolGray.800" borderWidth="1" borderColor="gray.400" my="2" w="40%"  m="3" onPress={() =>{Linking.openURL("https://play.google.com/store/apps/details?id=com.vigilantsoft.pastorrandy")}}>Rate Pastor Randy Sermons</Button>
*/}
</Center>


<Box mt="5" mx="1" borderBottomWidth="1" borderBottomRadius="xl" borderBottomColor="coolGray.600">
  <HStack bg="coolGray.700" borderWidth="1" borderTopRightRadius="xl"><Box p="1" m="2">
  <Heading size="md" color="gray.200"><Text style={{fontFamily: "FuturaBold"}}>More Apps</Text></Heading>
</Box><Spacer /><Icon mt="3" as={MaterialIcons} name="arrow-forward-ios"size="xl" color="gray.200" /></HStack>

  <ScrollView horizontal={true} mt="4" mb="5" px="2">

  {Apps.map(info => (
        <Box key={info.name} w="180px" h="130px" p="1" mr="5"  borderRadius={"md"} borderWidth="1" borderColor={"coolGray.500"} >
       
    <ImageBg w="100%" h="100%" source={{uri: info.photo}} >
    <Pressable onPress = { ()=> {Linking.openURL(info.url)}}>

      <Box w="100%" h="100%" style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
        <Center>
<Heading borderRadius="lg" justifyContent="center" size="md" p="3" mx="4" mt="20%" color="white" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>

<Text style={{fontFamily: "FuturaBold"}}>
  {Truncate(info.name, 15)}
  </Text>

</Heading>
</Center>
      </Box>
      </Pressable>
     
    </ImageBg>
  
    
      </Box>
      ))}

    </ScrollView>
    </Box>

    
    
    </ScrollView>

<Center>
  
<Box justifyContent={"center"}>
      <BannerAd 
unitId={adUnitId}
size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
requestOptions={{
  requestNonPersonalizedAdsOnly: true
}}
/>
</Box>

</Center>

       
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


export default HomeScreen;
