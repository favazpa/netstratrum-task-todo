import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import colors from '../themes/Colors';

const screenWidth = Dimensions.get('window').width;

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.replace('AddTask', {task: null, showHeader: false});
  };

  return (
    <View style={styles.container}>
      <View style={styles.ellipseBackground} />

      <View style={styles.mainContentContainer}>
        <Image
          source={require('../assets/images/Ellipse2x.png')}
          style={styles.ellipseImage}
        />

        <View style={styles.taskImageContainer}>
          <Image
            source={require('../assets/images/Task2x.png')}
            resizeMode="stretch"
            style={styles.taskImage}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.addTaskText}>Add a task{'\n'}to get started</Text>

          <TouchableOpacity
            onPress={() => handleOnboardingComplete()}
            style={styles.addButtonContainer}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  ellipseBackground: {
    width: screenWidth,
    height: '70%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: screenWidth / 2,
    borderBottomRightRadius: screenWidth / 2,
    transform: [{scaleX: 1.5}],
  },
  mainContentContainer: {
    height: '100%',
    width: screenWidth,
    position: 'absolute',
  },
  ellipseImage: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  taskImageContainer: {
    alignItems: 'center',
    marginTop: 110,
  },
  taskImage: {width: 400, height: 400},
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskText: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButtonContainer: {
    width: 70,
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 35,
    margin: 20,
  },
  plus: {
    color: colors.background.primary,
    fontSize: 50,
    fontWeight: '300',
    alignSelf: 'center',
  },
});

export default OnboardingScreen;
