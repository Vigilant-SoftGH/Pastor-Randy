import React from 'react';
import { Share } from 'react-native';
import {Button, Text, Box} from 'native-base';

const ShareApp = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Get SDA  Sabbath School App from Playstore. Spread the Everlasting Gospel: https://play.google.com/store/apps/details?id=com.vigilantsoft.sdasabbathschool',
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
  return (
   
      <Text onPress={onShare}>
      Share App
        </Text>
   
  );
};

export default ShareApp;