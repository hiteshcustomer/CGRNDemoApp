import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import {AlertHelper} from '../../utils/AlertHelper';
import ReduxWrapper from '../../utils/ReduxWrapper';
import {register} from '../../services/customerGlu';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/authAction';

function index({navigation, auth}) {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user.userId) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [auth]);

  const onLogin = async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    try {
      let user = {userId};
      const success = await register(user);
      if (success) {
        dispatch(loginUser(user));
        AlertHelper.show('success', 'Welcome to Customer Glu Demo');
      } else {
        AlertHelper.show('error', 'Failed to Register the user');
      }
    } catch (error) {
      console.log(error);
      AlertHelper.show('error', 'Something went woring');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(50),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Welcome,"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={setUserId}
            label="User Id"
            placeholder="Input here"
            InputStyle={{
              width: '100%',
            }}
          />
        </View>

        <CustomButton isLoading={loading} onPress={onLogin} label="Sign in" />
      </View>
    </Container>
  );
}

export default ReduxWrapper(index);
