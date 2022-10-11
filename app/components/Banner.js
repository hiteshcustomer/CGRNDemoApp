import {BannerWidget} from '@customerglu/react-native-customerglu';
import React from 'react';
import {View, Platform} from 'react-native';

export default function Banner(props) {
  return (
    <View
      style={[
        {width: '100%', zIndex: 10, position: 'relative'},
        Platform.OS == 'ios' && {
          height: 125,
        },
      ]}>
      <BannerWidget {...props} />
    </View>
  );
}
