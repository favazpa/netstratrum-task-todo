import React from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {deleteTask} from '../redux/slices/taskSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../themes/Colors';
import {formatDate} from '../utils/DateUtils';

const screenWidth = Dimensions.get('window').width;

const TaskListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const renderItem = ({item}) => {
    const startDate = formatDate(item?.startDate);
    const endDate = formatDate(item?.endDate);

    console.log('item', item);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text
            style={[
              styles.taskTitle,
              {
                textDecorationLine:
                  item.status === 'closed' ? 'line-through' : null,
              },
            ]}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor:
                    item.status === ('open' || 'progress')
                      ? '#CAF6C6'
                      : '#FECCB1',
                },
              ]}>
              <Text
                style={{
                  color:
                    item.status === ('open' || 'progress')
                      ? '#72966f'
                      : '#d6825c',
                }}>
                {item.status}
              </Text>
            </View>
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={() =>
                navigation.navigate('AddTask', {task: item, showHeader: true})
              }>
              <Icon name="pencil" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={() => dispatch(deleteTask(item.id))}>
              <Icon name="delete" color={'#e0695e'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.taskDescription}>{item.description}</Text>

        <View style={styles.itemFooterContainer}>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" color={'#9d83e2'} size={15} />
            <Text style={styles.timeText}>{`${startDate}  ${endDate}`}</Text>
          </View>
        </View>
      </View>
    );
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
          <FlatList
            data={tasks}
            renderItem={renderItem}
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
