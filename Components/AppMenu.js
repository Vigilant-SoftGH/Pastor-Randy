import React from 'react';
import {Box, Menu, Pressable, Divider, IconButton, Icon, HamburgerIcon} from 'native-base';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
function AppMenu() {
  return <Box w="90%" alignItems="center">
  <Menu w="190" placement='top right' trigger={triggerProps => {
  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="md" color="white" />} />
        </Pressable>;
}}>
    <Menu.Item>Arial</Menu.Item>
    <Menu.Item>Nunito Sans</Menu.Item>
    <Menu.Item>Roboto</Menu.Item>
    <Menu.Item>Poppins</Menu.Item>
    <Menu.Item>SF Pro</Menu.Item>
    <Menu.Item>Helvetica</Menu.Item>
    <Menu.Item isDisabled>Sofia</Menu.Item>
    <Menu.Item>Cookie</Menu.Item>
  </Menu>
</Box>;
}

export default AppMenu;