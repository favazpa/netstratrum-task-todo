import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../themes/Colors';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    async function checkOnboarding() {
      const onboardingCompleted = await AsyncStorage.getItem(
        'onboardingCompleted',
      );
      if (onboardingCompleted) {
        navigation.replace('TaskList');
      } else {
        navigation.replace('OnboardingScreen');
      }
    }
    checkOnboarding();
  }, [navigation]);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});

export default SplashScreen;
