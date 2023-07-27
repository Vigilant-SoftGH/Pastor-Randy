import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ToastAndroid, Alert, Image} from "react-native";
import { NativeBaseProvider, Button, Text, TextArea, Icon, Modal, FlatList, Avatar, VStack, HStack, IconButton, Pressable, Factory, Divider, Spinner, Input, Container, ScrollView, Center, Box, AlertDialog, Flex, Spacer, CheckIcon, Select, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, AdEventType,  TestIds} from 'react-native-google-mobile-ads';
import AppBar from "../Components/AppBar";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

import {db} from '../Firebase/config';

import {getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, setDoc, startAfter, limit, orderBy, onSnapshot, query, where, doc, getDoc, collectionGroup } from '@firebase/firestore';




const auth = getAuth();

//const User = auth.currentUser;

const firestore = getFirestore();



const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8275675203746039/2927891254';
  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
    requestNonPersonalizedAdsOnly: true  });

function VideoContent() {
  const ImageExt = Factory(Image);
  const navigation = useNavigation();
  const route = useRoute();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8275675203746039/4432544618';


 const [userID, setUserID] = useState("");
  const [category, setCategory] = useState("Forum");
  const [data, setData] = useState([]);
  const [dataPolitics, setDataPolitics] = useState([]);
  const [dataHealth, setDataHealth] = useState([]);
  const [dataVideos, setDataVideos] = useState([]);
  const [dataSports, setDataSports] = useState([]);
  const [dataBusiness, setDataBusiness] = useState([]);
  const [dataEntertain, setDataEntertain] = useState([]);
  const [updatedData, setUpdatedData] = useState(data.length);
  const [updatedDataPolitics, setUpdatedDataPolitics] = useState(dataPolitics.length);
  const [updatedDataHealth, setUpdatedDataHealth] = useState(dataHealth.length);
  const [updatedDataSports, setUpdatedDataSports] = useState(dataSports.length);
  const [updatedDataVideos, setUpdatedDataVideos] = useState(dataVideos.length);
  const [updatedDataBusiness, setUpdatedDataBusiness] = useState(dataBusiness.length);
  const [updatedDataEntertain, setUpdatedDataEntertain] = useState(dataEntertain.length);
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
  const [lastSeenPolitics, setLastSeenPolitics] = useState(null);
  const [lastSeenHealth, setLastSeenHealth] = useState(null);
  const [lastSeenVideos, setLastSeenVideos] = useState(null);
  const [lastSeenSports, setLastSeenSports] = useState(null);
  const [lastSeenBusiness, setLastSeenBusiness] = useState(null);
  const [lastSeenEntertain, setLastSeenEntertain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefreshingPolitics, setIsRefreshingPolitics] = useState(false);
  const [isRefreshingHealth, setIsRefreshingHealth] = useState(false);
  const [isRefreshingSports, setIsRefreshingSports] = useState(false);
  const [isRefreshingVideos, setIsRefreshingVideos] = useState(false);
  const [isRefreshingBusiness, setIsRefreshingBusiness] = useState(false);
  const [isRefreshingEntertain, setIsRefreshingEntertain] = useState(false);
  const [loadMore, setLoadMore] = useState(null);
  const [loadMorePolitics, setLoadMorePolitics] = useState(null);
  const [loadMoreHealth, setLoadMoreHealth] = useState(null);
  const [loadMoreSports, setLoadMoreSports] = useState(null);
  const [loadMoreVideos, setLoadMoreVideos] = useState(null);
  const [loadMoreBusiness, setLoadMoreBusiness] = useState(null);
  const [loadMoreEntertain, setLoadMoreEntertain] = useState(null);
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
  
  
    const loadDataNews = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), orderBy("creationDate"), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeen(lastVisible);
  console.log(documentData.length)
            setData(documentData);
              setLoaded(true);

            //setIsLoading(false);
  
             
    
    }
  
    loadDataNews()
  
  
  
    //setFinish((finish) => !finish)
  
  
  }, [setData]);


  const loadMoreNews = async () => {
    setIsRefreshing(true);
    setLoadMore("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), orderBy("creationDate"), startAfter(lastSeen), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeen(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...data, ...documentData];
  
    console.log(newArr.length)
  
            setData(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }


  const MorePolitics = async () => {
    setIsRefreshing(true);
    setLoadMorePolitics("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Politics"), orderBy("creationDate"), startAfter(lastSeenPolitics), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeenPolitics(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...dataPolitics, ...documentData];
  
    console.log(newArr.length)
  
            setDataPolitics(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }


  const MoreHealth = async () => {
    setIsRefreshing(true);
    setLoadMoreHealth("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Health"), orderBy("creationDate"), startAfter(lastSeenPolitics), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeenPolitics(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...dataHealth, ...documentData];
  
    console.log(newArr.length)
  
            setDataHealth(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }


  const MoreVideos = async () => {
    setIsRefreshing(true);
    setLoadMorePolitics("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Politics"), orderBy("creationDate"), startAfter(lastSeenPolitics), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeenPolitics(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...dataPolitics, ...documentData];
  
    console.log(newArr.length)
  
            setDataPolitics(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }


  const MoreSports = async () => {
    setIsRefreshing(true);
    setLoadMorePolitics("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Politics"), orderBy("creationDate"), startAfter(lastSeenPolitics), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeenPolitics(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...dataPolitics, ...documentData];
  
    console.log(newArr.length)
  
            setDataPolitics(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }


  const MoreBusiness = async () => {
    setIsRefreshing(true);
    setLoadMorePolitics("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Politics"), orderBy("creationDate"), startAfter(lastSeenPolitics), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeenPolitics(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...dataPolitics, ...documentData];
  
    console.log(newArr.length)
  
            setDataPolitics(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }


  const MoreEntertain = async () => {
    setIsRefreshing(true);
    setLoadMoreEntertain("Loading more...")
    //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Entertainment"), orderBy("creationDate"), startAfter(lastSeenEntertain), limit(10));
  
    const list = [];
  
    const documentSnapshots = await getDocs(q);
  
    let documentData = documentSnapshots.docs.map(document => document.data());
  
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  
    setLastSeenEntertain(lastVisible);
  
    list.push(documentData);
  
    //const newArr = dataFriends.concat(documentData);
  
    const newArr = [...dataEntertain, ...documentData];
  
    console.log(newArr.length)
  
            setDataEntertain(newArr);
            //setLoadMore(null);
  setIsRefreshing(false);
       
  
  }



  useEffect(() => {
  
  
    const loadDataPolitics = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Politics"), orderBy("creationDate"), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeen(lastVisible);
  console.log(documentData.length)
            setDataPolitics(documentData);
              setLoaded(true);

            //setIsLoading(false);
  
             
    
    }
  
    loadDataPolitics()
  
  
  
    //setFinish((finish) => !finish)
  
  
  }, [setDataPolitics]);


  useEffect(() => {
  
  
    const loadDataHealth = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Health"), orderBy("creationDate"), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeen(lastVisible);
  console.log(documentData.length)
            setDataHealth(documentData);
              setLoaded(true);

            //setIsLoading(false);
  
             
    
    }
  
    loadDataHealth()

    //setFinish((finish) => !finish)

  }, [setDataHealth]);

  useEffect(() => {
  
  
    const loadDataVideos = async () => {
  //setIsLoading(true);
     
          //const userEntries; 
  const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Videos"), orderBy("creationDate"), limit(10));
  
          const list = [];
       
          const documentSnapshots = await getDocs(q);
  
          let documentData = documentSnapshots.docs.map(document => document.data());
  
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
          console.log("LAST SEEN =>", lastVisible);
  
          setLastSeen(lastVisible);
  console.log(documentData.length)
            setDataVideos(documentData);
              setLoaded(true);

            //setIsLoading(false);
  
             
    
    }
  
    loadDataVideos()
  
  
  
    //setFinish((finish) => !finish)
  
  
  }, [setDataVideos]);

useEffect(() => {
  const loadDataSports = async () => {
    //setIsLoading(true);
       
            //const userEntries; 
    const q = query(collection(db, "Articles", "entryData", "General"), where("type", "==", "Sports"), orderBy("creationDate"), limit(10));
    
            const list = [];
         
            const documentSnapshots = await getDocs(q);
    
            let documentData = documentSnapshots.docs.map(document => document.data());
    
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            console.log("LAST SEEN =>", lastVisible);
    
            setLastSeen(lastVisible);
    console.log(documentData.length)
              setDataSports(documentData);
                setLoaded(true);
  
              //setIsLoading(false);
    
               
      
      }
    
      loadDataSports()
    
    
    
      //setFinish((finish) => !finish)
    
    
    }, [setDataSports]);


  



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



    /*Set app Data and UI Design*/
const Home = () =>{
    return (
        <Box>
            <Heading pt="3" pb="2" size="lg">
            <Text color="red.500" style={{fontFamily: "FuturaBold"}}>VIGI</Text><Text color="yellow.500" style={{fontFamily: "FuturaBold"}}>LANT</Text> <Text color="green.500" style={{fontFamily: "FuturaBold"}}>NEWS</Text>
            </Heading>
            <Heading size="xs"><Text color="green.500" style={{fontFamily: "FuturaBold"}}>Your authentic & free news source</Text></Heading>

            <Heading py="3"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>In the News</Text></Heading>
<VStack space={4} p="2">

        {data.map((body, index) => (
          <VStack key={index} space={1}>
            <Heading py="3"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>{body.title}</Text></Heading>
            <ImageExt w="100%" h="250px" source={{
          uri: body.photoURL}} />
            <Heading py="1" size="md"><Text color="coolGray.500" style={{fontFamily: "FuturaBold"}}>{body.name}</Text>
            </Heading>
            <Text color="coolGray.600" fontSize="20px" p="2" style={{fontFamily: "Futura"}}>{Truncate(body.content.replace(/\\n/g, "\n"), 70)}</Text>

            <Box p="3" w="40%"><Button size="md">Read More</Button></Box>
          </VStack>
        ))}
      </VStack>


{ dataPolitics.length > 0 ?
      <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Politics</Text></Heading>
<VStack space={4} p="2">

        {data.map((body, index) => (
          <VStack key={index} space={1}>
            <Heading py="3"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>{body.title}</Text></Heading>
            <ImageExt w="100%" h="250px" source={{
          uri: body.photoURL}} />
            <Heading py="1" size="md"><Text color="coolGray.500" style={{fontFamily: "FuturaBold"}}>{body.name}</Text>
            </Heading>
            <Text color="coolGray.600" fontSize="20px" p="2" style={{fontFamily: "Futura"}}>{Truncate(body.content.replace(/\\n/g, "\n"), 70)}</Text>

            <Box p="3" w="40%"><Button size="md">Read More</Button></Box>
          </VStack>
        ))}
      </VStack></> : null

      }
      
      
      
      </Box>);

        }



        const News = () =>{
            return (
                <Box>
                 
        
        
        { data.length > 0 ?
              <>
              
              <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Politics</Text></Heading>
    
        
    <FlatList mt="4" h="65%" data={data} extraData={updatedData} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={loadMoreNews} onEndReachedThreshold={0.5}
refreshing={isRefreshing} />
             </> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
              
              
              
              </Box>);
        
                }



        const Politics = () =>{
            return (
                <Box>
                 
        
        
        { dataPolitics.length > 0 ?
              <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Politics</Text></Heading>
          <FlatList mt="4" h="65%" data={dataPolitics} extraData={updatedDataPolitics} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={MorePolitics} onEndReachedThreshold={0.5}
refreshing={isRefreshingPolitics} /></> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
              
              
              
              </Box>);
        
                }


                const Health = () =>{
                    return (
                        <Box>
                         
                
                
                         { dataPolitics.length > 0 ?
              <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Politics</Text></Heading>
          <FlatList mt="4" h="65%" data={dataHealth} extraData={updatedDataHealth} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={MoreHealth} onEndReachedThreshold={0.5}
refreshing={isRefreshingHealth} /></> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
                      
                      
                      
                      </Box>);
                
                        }


                        const Videos = () =>{
                            return (
                                <Box>
                                 
                        
                        
                                 { dataVideos.length > 0 ?
              <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Videos</Text></Heading>
          <FlatList mt="4" h="65%" data={dataVideos} extraData={updatedDataVideos} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={MoreVideos} onEndReachedThreshold={0.5}
refreshing={isRefreshing} /></> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
                              
                              
                              
                              </Box>);
                        
                                }


                                const Sports = () =>{
                                    return (
                                        <Box>
                                         
                                
                                
                                         { dataSports.length > 0 ?
              <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Sports</Text></Heading>
          <FlatList mt="4" h="65%" data={dataSports} extraData={updatedDataSports} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={MoreSports} onEndReachedThreshold={0.5}
refreshing={isRefreshing} /></> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
                                      
                                      
                                      </Box>);
                                
                                        }


                                        const Business = () =>{
                                            return (
                                                <Box>
                                                 
                                        
                                        
                                                 { dataBusiness.length > 0 ?
              <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Business</Text></Heading>
          <FlatList mt="4" h="65%" data={dataBusiness} extraData={updatedDataBusiness} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={MoreBusiness} onEndReachedThreshold={0.5}
refreshing={isRefreshing} /></> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
                                              
                                              
                                              </Box>);
                                        
                                                }

                                                const Entertain = () =>{
                                                    return (
                                                        <Box>
                                                         
                                                
                                                         { dataEntertain.length > 0 ?
              <><Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Entertain</Text></Heading>
          <FlatList mt="4" h="65%" data={dataEntertain} extraData={updatedDataEntertain} ListEmptyComponent={entryEmpty} renderItem={renderItem} keyExtractor={item => item.title}  ListFooterComponent={entryFooter}  onEndReached={MoreEntertain} onEndReachedThreshold={0.5}
refreshing={isRefreshing} /></> : <Heading py="3" mt="2"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>Empty</Text></Heading>
        
              }
                                                      
                                                      
                                                      </Box>);
                                                
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

    return   (<Center py="3">{ data.length > 0 ? <Heading color="gray.600" size="md">
    <Text style={{fontFamily: "FuturaBold"}}>{loadMore}</Text></Heading> : null }</Center>);
}

const renderItem = ({ item }) => ( <VStack space={1}>
    <Heading py="3"><Text color="gray.500" style={{fontFamily: "FuturaBold"}}>{item.title}</Text></Heading>
    <ImageExt w="100%" h="250px" source={{
  uri: item.photoURL}} />
    <Heading py="1" size="md"><Text color="coolGray.500" style={{fontFamily: "FuturaBold"}}>{item.name}</Text>
    </Heading>
    <Text color="coolGray.600" fontSize="20px" p="2" style={{fontFamily: "Futura"}}>{Truncate(item.content.replace(/\\n/g, "\n"), 70)}</Text>

    <Box p="3" w="40%"><Button size="md">Read More</Button></Box>
  </VStack>);


if(!showLoad)
{ return <LoadingScreen />}

else{



    return (
        <NativeBaseProvider>
            
            <StatusBar style="light" />
            <AppBar title="Vigilant News" />
          
            <Box rounded="lg" h="75%" px="5" py="5">
                <ScrollView horizontal={true}>
                <HStack space={4} w="90%" h="50px">
<Heading size="md" color="gray.300" p="2" mb="2"></Heading>
{
    selected.indexOf("Home") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Home");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500"> Home</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Home");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500"> Home</Text></Heading></Button>
}
{
    selected.indexOf("News") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("News");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">News</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("News");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">News</Text></Heading></Button>
}
{
    selected.indexOf("Politics") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Home"); setSelected("Politics");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Politics</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Politics");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Politics</Text></Heading></Button>
}

{
    selected.indexOf("Health") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Health");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Lifestyle</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Health");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Lifestyle</Text></Heading></Button>
}

{
    selected.indexOf("News") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Business");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Business</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Business");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Business</Text></Heading></Button>
}


{
    selected.indexOf("News") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Entertain");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">ShowBiz</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Entertain");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">ShowBiz</Text></Heading></Button>
}

{
    selected.indexOf("Videos") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Videos");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Videos</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Videos");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Videos</Text></Heading></Button>
}

{
    selected.indexOf("Sports") > -1 ?
<Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Sports");}} borderBottomWidth={2} borderBottomColor="pink.700" borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Sports</Text></Heading></Button>

:  <Button color="gray.100" mb="2" variant={"link"} onPress={()=> {setSelected("Sports");}} borderRightWidth={1}><Heading size="md"><Text style={{fontFamily: "FuturaBold"}} color="green.500">Sports</Text></Heading></Button>
}
</HStack></ScrollView>
<Divider />

{

    !loaded ?
<>
<Center py="8"><Spinner size="lg" mt="30%" accessibilityLabel='Loading news' /></Center>
    </>
    :
<>
<ScrollView>
    {
        selected == "Home" ?
<Home /> : null
}

      </ScrollView>

      {
        selected == "Politics" ?
<><Politics /><Text py="3"></Text></> : null
}

{
        selected == "Videos" ?
<><Videos /><Text py="3"></Text></>: null
}

      
{
        selected == "News" ?
<><News /><Text py="3"></Text></> : null
}

{
        selected == "Sports" ?
<><Sports /><Text py="3"></Text></> : null
}

{
        selected == "Business" ?
<><Business /><Text py="3"></Text></> : null
}


{
        selected == "Entertain" ?
<><Entertain /><Text py="3"></Text></> : null
}


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


        {/*Notice Holder*/}
        <Center>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() =>{onClose();}}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Add Comment</AlertDialog.Header>
          <AlertDialog.Body>
            <ScrollView minW="250" h="250">
           
               
      <Box mt="4">
         
         <TextArea h={150} mx="3" type="text" fontSize="16" mb="3" placeholder="Write your comment here" w="90%" maxW="300" onChangeText={(value) =>{setComment(value); let val = value.length; val > 10 ? setSubtitle(value.substring(0, val/2)) : setSubtitle(value.substring(0, val-1)) }}/>
         </Box>
   

         <Box py="4">
             
   {
   
   !complete ?
       <Center pb="2">
      {
      
     
     dataStatus == "comment" ? <Heading size="sm">Submitting your comment...</Heading> : dataStatus == "question" ? <Heading size="sm">Submitting your answer...</Heading> : null
      }
       </Center> : null
   }
   <HStack justifyContent="center">
     <Button size="lg" onPress={() => {ProcessStarter()}} isDisabled={isDisabled2}>Comment</Button>
   </HStack>
   </Box>
   

   
            </ScrollView>
          </AlertDialog.Body>
          <AlertDialog.Footer justifyContent={"center"}>
           <Button.Group space={2}>
              <Button colorScheme="secondary" isDisabled={isDisabled2} onPress={() =>{comment !=="" ? DiscardData(): onClose()}} ref={cancelRef}>
                Cancel
              </Button>
           
             
              </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
    {/*NoticeHolderEnded*/}


    {/*Notice Holder2*/}
    <Center>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen2} onClose={() =>{onClose2();}}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Post to Forum</AlertDialog.Header>
          <AlertDialog.Body>
            <ScrollView minW="250" h="250">
           
               
      <Box mt="4">
         
         <TextArea h={150} mx="3" type="text" fontSize="16" mb="3" placeholder="What's on your mind?" w="90%" maxW="300" onChangeText={(value) =>{setPost(value); let val = value.length; val > 10 ? setSubtitle2(value.substring(0, val/2)) : setSubtitle2(value.substring(0, val-1)) }}/>
         </Box>
   

         <Box py="4">
             
   {
   
   !complete ?
       <Center pb="2">
      {
      
     
     dataStatus == "post" ? <Heading size="sm">Submitting your post...</Heading> : dataStatus == "data" ? <Heading size="sm">Submitting your answer...</Heading> : null
      }
       </Center> : null
   }
   <HStack justifyContent="center">
     <Button size="lg" onPress={() => {ProcessStarter2()}} isDisabled={isDisabled2}>Post</Button>
   </HStack>
   </Box>
   

   
            </ScrollView>
          </AlertDialog.Body>
          <AlertDialog.Footer justifyContent={"center"}>
           <Button.Group space={2}>
              <Button colorScheme="secondary" isDisabled={isDisabled2} onPress={() =>{post !=="" ? DiscardData(): onClose2()}} ref={cancelRef}>
                Cancel
              </Button>
           
             
              </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
    {/*NoticeHolderEnded*/}
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


export default VideoContent;
