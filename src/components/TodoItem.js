import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {formatDate} from '../utils/DateUtils';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../redux/slices/taskSlice';
import colors from '../themes/Colors';

const TodoItem = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const startDate = formatDate(data?.startDate);
  const endDate = formatDate(data?.endDate);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine:
                data.status === 'closed' ? 'line-through' : null,
            },
          ]}>
          {data.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data.status === ('open' || 'progress')
                    ? '#CAF6C6'
                    : '#FECCB1',
              },
            ]}>
            <Text
              style={{
                color:
                  data.status === ('open' || 'progress')
                    ? '#72966f'
                    : '#d6825c',
              }}>
              {data.status}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginHorizontal: 5}}
            onPress={() =>
              navigation.navigate('AddTask', {task: data, showHeader: true})
            }>
            <Icon name="pencil" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 5}}
            onPress={() => dispatch(deleteTask(data.id))}>
            <Icon name="delete" color={'#e0695e'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.taskDescription}>{data.description}</Text>

      <View style={styles.itemFooterContainer}>
        <View style={styles.timeContainer}>
          <Icon name="clock-outline" color={'#9d83e2'} size={15} />
          <Text style={styles.timeText}>{`${startDate}  ${endDate}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
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
