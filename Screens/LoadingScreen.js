import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, View, Button, Image} from "react-native";
import { NativeBaseProvider, Text, Spinner, Icon, HStack, IconButton, Pressable, Factory, Divider, Container, ScrollView, Center, Box, Flex, Spacer, Heading } from 'native-base';
import mobileAds, {AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds} from 'react-native-google-mobile-ads';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AppBar from "../Components/AppBar";
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';
//import DisplayImage from "./components/DisplayImage";
//import Header from "../components/Header";
//import QuarterScreen from "../screens/QuarterLessonsScreen";

function LoadingScreen() {
  
    return (
        <NativeBaseProvider>
            <StatusBar style="auto" />
            <Center p="4">
      <Box rounded="lg" w="80%" minW="300" h="300" mt="20" alignContent={"center"} justifyContent={"center"} shadow={3} bg="gray.100" m="7">
      <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
</Box>
</Center>
      </NativeBaseProvider>
    );
  }

  

export default LoadingScreen;
