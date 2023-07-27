import React from 'react';
import { Text } from 'react-native';
import {Factory} from 'native-base';
import * as Linking from 'expo-linking';

function Anchor() {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  
    return (
      <Text {...this.props} onPress={this._handlePress}>
        {this.props.children}
      </Text>
    );
 
}

export default Anchor;