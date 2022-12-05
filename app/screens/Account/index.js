import React, {useEffect,useState} from 'react';
import {View, StyleSheet, Pressable, FlatList, Platform,NativeModules,NativeEventEmitter,Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../utils/appColors';
import Label from '../../components/Label';
import {profileKeys} from '../../utils/MockData';
import AvatarImage from '../../components/AvatarImage';
import {
  dataClear,
  SetCurrentClassName,
} from '@customerglu/react-native-customerglu';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {sendEvent} from '../../services/customerGlu';
import {loginUser} from '../../redux/authAction';
import ReduxWrapper from '../../utils/ReduxWrapper';
import Banner from '../../components/Banner';
import {RESET_WISH_LIST} from '../../redux/wishListAction';
import {RESET_CART} from '../../redux/cartAction';
import Banner_Container from '../../components/Banner_Container';


function Account({navigation, auth}) {
  const dispatch = useDispatch();
  const route = useRoute();
  const [finalHeight, setFinalHeight] = useState(0);
  const strbanerId = "profile_banner"

  const onLogout = async () => {
    console.log('Clearing data');
    await dataClear();
    console.log('Cleared data');

    dispatch({type: RESET_WISH_LIST});
    dispatch({type: RESET_CART});

    dispatch(loginUser({}));
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      SetCurrentClassName(route.name);

      const { Rncustomerglu } = NativeModules;
      const RncustomergluManagerEmitter = new NativeEventEmitter(Rncustomerglu);
  
      if (Platform.OS === 'ios') {
        eventfheight = RncustomergluManagerEmitter.addListener(
            'CGBANNER_FINAL_HEIGHT',
            (reminder) => {
                console.log('reminder----', reminder);
                if (reminder && reminder[strbanerId]) {
                  const windowHeight = Dimensions.get('window').height;
                    setFinalHeight(reminder[strbanerId] * windowHeight / 100);
                }
  
            }
  
        );
    }
  
      return () => {
  
        if (Platform.OS === 'ios') {
            console.log('destroy.!!!!!!!!')
            eventfheight.remove();
  
        }
  
    }

    }, [navigation]),
  );

  useFocusEffect(() => {
    sendEvent('viewedProfile',{});
  }, []);

  const ItemCard = ({item}) => {
    const {lebel, icon, isNew, route, customIcon, action} = item;
    return (
      <Pressable
        onPress={() => {
          route == 'Login' && onLogout();
          action && action();
          route && navigation.navigate(route);
        }}
        style={styles.itemContainer}>
        <Pressable style={styles.iconContainer}>
          <Feather name={icon} size={scale(22)} color={appColors.black} />
        </Pressable>
        <View style={styles.itemInnerContainer}>
          <Label text={lebel} />
          {isNew && (
            <View
              style={{
                paddingHorizontal: scale(10),
                backgroundColor: appColors.red,
                padding: scale(5),
                borderRadius: scale(4),
              }}>
              <Label
                text="New"
                style={{fontSize: scale(10), color: appColors.white}}
              />
            </View>
          )}
          <Feather name={'chevron-right'} size={scale(18)} />
        </View>
      </Pressable>
    );
  };
  return (
    <Banner_Container>
      <View
        style={{
          paddingVertical: scale(20),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',marginLeft:10,marginRight:10
        }}>
        <AvatarImage size={scale(110)} />
        <View style={{marginLeft: scale(20)}}>
          <Label text={auth.user.userId} style={{fontSize: scale(28)}} />
        </View>
      </View>

      <View
        style={[
          {marginTop: 0, width: '100%', zIndex: 10, position: 'relative', backgroundColor: "black"},
          Platform.OS == 'ios' && {
            height: finalHeight,
          },
        ]}>
        <Banner bannerId = {strbanerId}
          style={{ width: '100%', height: Platform.OS === 'ios' ? finalHeight : null }}/>
      </View>

      
      <FlatList
        data={profileKeys}
        style={{marginLeft:10,marginRight:10,marginTop:20}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <ItemCard key={index} item={item} />}
      />
    </Banner_Container>
  );
}

export default ReduxWrapper(Account);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: scale(15),
  },
  itemInnerContainer: {
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    marginRight: scale(20),
    backgroundColor: appColors.lightGreen,
  },
});
