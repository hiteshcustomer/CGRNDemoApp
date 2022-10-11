import React from 'react';
import {View, Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';

import Feather from 'react-native-vector-icons/Feather';
import Label from '../../components/Label';
import ReduxWrapper from '../../utils/ReduxWrapper';
import {appColors} from '../../utils/appColors';
import Banner from '../../components/Banner';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {SetCurrentClassName} from '@customerglu/react-native-customerglu';

function index(props) {
  const {navigation} = props;
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      SetCurrentClassName(route.name);
    }, []),
  );

  return (
    <>
      <Container
        bodyStyle={{
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather
          name={'check-circle'}
          size={scale(100)}
          color={appColors.primary}
        />
        <Label
          text="Order Placed Successfully"
          style={{fontSize: scale(25), opacity: scale(0.5)}}
        />

        <View
          style={[
            {marginTop: 30, width: '100%', zIndex: 10, position: 'relative'},
            Platform.OS == 'ios' && {
              height: 125,
            },
          ]}>
          <Banner bannerId="ordersuccess_banner" />
        </View>
      </Container>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',

          paddingHorizontal: scale(20),
          bottom: scale(10),
        }}>
        <CustomButton
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            })
          }
          label="Home"
        />
      </View>
    </>
  );
}

export default ReduxWrapper(index);
