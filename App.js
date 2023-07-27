import React, {useCallback, useEffect, useState} from 'react';
import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Factory, Button, NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, createTopTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Screens/HomeScreen";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import WebViewer from './Screens/WebViewer';
import Youtuber from './Screens/YouTuber';
import './Firebase/config'
import NewsContent from './Screens/NewsContent';
import GhanaNews from './Screens/GhanaNews';
import AboutScreen from './Screens/AboutScreen';


import PhotoViewerAll from './Screens/PhotoViewerAll';


import VideoContent from './Screens/VideoContent';

import BibleStudy from './Screens/BibleStudy';
import Sermons from './Screens/Sermons';
import SearchApp from './Screens/SearchApp';
import SearchResults from './Screens/SearchResults';
import BlogPosts from './Screens/BlogPosts';
import StudyContent from './Screens/StudyContent';
import AllVideos from './Screens/AllVideos';
import AudioSermons from './Screens/AudioSermons';
import WebViewerRadio from './Screens/WebViewerRadio';
import Randy from './Screens/Randy';

//import UserHome from './UserStack/UserHome';



// Keep the splash screen visible while we fetch resources
//SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();
const RootNav = createNativeStackNavigator();
const getIcon=  Factory(Text);

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon.png')}
    />
  );
}




SplashScreen.preventAutoHideAsync();

export default function App() {


  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded, setLoaded] = useFonts({
   Futura: require('./Fonts/Futura.ttf'),  FuturaBold: require('./Fonts/FuturaBold.ttf')
  });

useEffect(() => {
 async function prepare() {
  try {
    // Keep the splash screen visible while we fetch resources
    

    // Pre-load fonts, make any API calls you need to do here
   // await Font.loadAsync({ Montserrat_900Black });
    
    // Artificially delay for two seconds to simulate a slow loading
    // experience. Please remove this if you copy and paste the code!
    await new Promise(resolve => setTimeout(resolve, 1500));
  } catch (e) {
    console.warn(e);
  } finally {
    // Tell the application to render
    setAppIsReady(true);
  }
}

prepare();
}, []);

const onLayoutRootView = useCallback(async () => {
  if (appIsReady) {
   // This tells the splash screen to hide immediately! If we call this after
   // `setAppIsReady`, then we may see a blank screen while the app is
   // loading its initial state and rendering its first pixels. So instead,
   // we hide the splash screen once we know the root view has already
   // performed layout.
   await SplashScreen.hideAsync();
 }
 }, [appIsReady]);
 
 if (!appIsReady) {
  return null;
 }
 
  return (
   <NativeBaseProvider>
    <NavigationContainer>
  <View onLayout={onLayoutRootView} />
      {/*
      <Tab.Navigator
      
      screenOptions={({ route }) => ({
     
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'green',
            height: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options ={{headerStyle:
          {height: 0,},
          }} />
        <Tab.Screen name="About" component={AboutScreen} options=
        {
          {
            headerStyle :
            {
              height: 0,
            }
          }}/>
      </Tab.Navigator>
        */}
      
      
      <RootNav.Navigator initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#18181b',
        }, headerShown:false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        
        <RootNav.Screen name="Home" component={HomeScreen} />
        <RootNav.Screen name="About" component={AboutScreen} />
        <RootNav.Screen name="Search" component={SearchApp} />
        <RootNav.Screen name="BlogPosts" component={BlogPosts} />
        <RootNav.Screen name="StudyContent" component={StudyContent} />
        <RootNav.Screen name="SearchResults" component={SearchResults} />
        <RootNav.Screen name="WebViewer" component={WebViewer} />
        <RootNav.Screen name="WebRadio" component={WebViewerRadio} />
        <RootNav.Screen name="Youtuber" component={Youtuber} />
        <RootNav.Screen name="NewsContent" component={NewsContent} />
        <RootNav.Screen name="AllVideos" component={AllVideos} />
        <RootNav.Screen name="VideoContent" component={VideoContent} />
        <RootNav.Screen name="Randy" component={Randy} />
        <RootNav.Screen name="AudioSermons" component={AudioSermons} />
        <RootNav.Screen name="BibleStudy" component={BibleStudy} />
        <RootNav.Screen name="Sermons" component={Sermons} />

       
     

      </RootNav.Navigator>
     
    </NavigationContainer>
    </NativeBaseProvider>
  );
}