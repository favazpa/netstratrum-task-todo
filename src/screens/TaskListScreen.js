import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../themes/Colors';
import CustomTextInputWithLabel from '../components/CustomTextinputWIthLabel';
import SearchIcon from '../assets/images/SearchIcon.png';
import TodoItem from '../components/TodoItem';

const screenWidth = Dimensions.get('window').width;

const TaskListScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    if (searchText) {
      let tasksCopy = [...tasks];
      const filteredTask = tasksCopy.filter((item, index) => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });

      setSearchResult(filteredTask);
    }
  }, [searchText]);

  const handleSearch = text => {
    setSearchText(text);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tasks.</Text>
      </View>
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Icon name="text-box-remove" size={60} color="grey" />
        <Text style={styles.emptyText}>No Tasks added</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContentContainer}>
        <Image
          source={require('../assets/images/Ellipse2x.png')}
          style={styles.ellipseImage}
        />
        <SafeAreaView style={{flex: 1}}>
          <CustomTextInputWithLabel
            imageSource={SearchIcon}
            onChangeText={handleSearch}
            value={searchText}
          />
          <FlatList
            data={searchText ? searchResult : tasks}
            renderItem={({item}) => <TodoItem data={item} />}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyList}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddTask', {task: null, showHeader: true})
            }
            style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </SafeAreaView>
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
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '600',
    marginVertical: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  mainContentContainer: {
    height: '100%',
    width: screenWidth,
    position: 'absolute',
    padding: 20,
  },
  ellipseImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    tintColor: '#E2DBF4',
  },
  taskImageContainer: {
    alignItems: 'center',
    marginTop: 110,
  },
  pencilImage: {width: 200, height: 200},
  addButtonContainer: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {fontSize: 15, fontWeight: '500', color: 'grey'},
  headerContainer: {marginVertical: 40},
  headerText: {fontWeight: 'bold', fontSize: 25, color: colors.text.primary},
  itemHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  itemFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: colors.primary,
    fontWeight: '600',
    marginHorizontal: 5,
    fontSize: 15,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default TaskListScreen;
