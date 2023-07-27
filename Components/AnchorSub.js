import React from 'react';
import { Text } from 'react-native';
import {Factory} from 'native-base';
import * as Linking from 'expo-linking';

function Anchor(props) {
  _handlePress = () => {
    Linking.openURL(props.href);
    props.onPress && props.onPress();
  };

  
    return (
      <Text {...this.props} onPress={this._handlePress}>
        {props.title}
      </Text>
    );
 
}

export default Anchor;