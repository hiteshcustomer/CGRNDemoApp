import React from 'react';
import {View, Text} from 'react-native';
import Container from '../../components/Container';
import ScreenHeader from '../../components/ScreenHeader';
import SelectAble from '../../components/SelectAble';
import CustomButton from '../../components/CustomButton';
import {scale} from 'react-native-size-matters';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {SetCurrentClassName} from '@customerglu/react-native-customerglu';
export default function index() {
  // for Pop ups
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      SetCurrentClassName(route.name);
    }, []),
  );
  return (
    <>
      <Container isScrollable>
        <ScreenHeader label="Shipping Address" />
        <SelectAble
          item={{
            label: 'Amusoftech Home',
            subLabel:
              'A-127, Mittal Paradise, Shivalik City, Sahibzada Ajit Singh Nagar, Punjab 140301',
          }}
        />
        <SelectAble
          item={{
            label: 'Work Address',
            subLabel:
              'A-127, Mittal Paradise, Shivalik City, Sahibzada Ajit Singh Nagar, Punjab 140301',
          }}
        />
      </Container>
      <View
        style={{
          paddingHorizontal: scale(20),
          justifyContent: 'flex-end',
          flex: 0.5,
          alignItems: 'flex-end',
        }}>
        <CustomButton label="New" />
      </View>
    </>
  );
}
