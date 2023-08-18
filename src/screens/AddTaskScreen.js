import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../redux/slices/taskSlice';
import CustomTextInputWithLabel from '../components/CustomTextinputWIthLabel';
import TaskNameIcon from '../assets/images/TaskName2x.png';
import DatePickerIcon from '../assets/images/DatePicker.png';
import {useRoute} from '@react-navigation/native';
import colors from '../themes/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../utils/ToastUtils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get('window').width;

const AddTaskScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const {task, showHeader} = route?.params;

  const [title, setTitle] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [selectedDatePicker, setSelectedDatePicker] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);

  useLayoutEffect(() => {
    setTitle(task?.title);
    setSelectedStartDate(task ? task?.startDate : new Date().toISOString());
    setSelectedEndDate(task ? task?.endDate : new Date().toISOString());
    setValue(task?.status);
    navigation.setOptions({
      headerShown: showHeader,
      title: task?.title ? 'Edit Task' : 'Add Task',
    });
  }, [navigation, showHeader, task]);

  const showDateTimePicker = state => {
    setSelectedDatePicker(state);
    setDatePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateTimeConfirm = date => {
    if (selectedDatePicker === 'selectedStartDate') {
      console.log('selectedStartDate', date.toString());
      setSelectedStartDate(date);
    } else if (selectedDatePicker === 'selectedEndDate') {
      console.log('selectedEndDate', date.toString());
      setSelectedEndDate(date);
    }
    hideDateTimePicker();
  };

  const handleAddTask = () => {
    const newTask = {
      title,
      completed: false,
      startDate: selectedStartDate.toString(),
      endDate: selectedEndDate.toString(),
      status: value ? value : 'open',
      id: task ? task.id : Date.now(),
    };
    if (title) {
      task ? dispatch(editTask(newTask)) : dispatch(addTask(newTask));
      setTitle('');
      setSelectedEndDate('');
      setValue('');
      setSelectedEndDate('');
      navigation.navigate('TaskList');
    } else {
      showToast('error', 'Please fill the task');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableAutomaticScroll={Platform.OS === 'ios'}
      enableOnAndroid={true}
      extraHeight={150}>
      <View style={styles.headerContainer}>
        <View style={styles.ellipseContainer}>
          <Image
            source={require('../assets/images/Ellipse2x.png')}
            style={styles.ellipseImage}
          />

          <View style={styles.taskImageContainer}>
            <Image
              source={require('../assets/images/Pencil2x.png')}
              resizeMode="stretch"
              style={styles.taskImage}
            />
          </View>
        </View>
        <CustomTextInputWithLabel
          label="Task Name"
          imageSource={TaskNameIcon}
          onChangeText={setTitle}
          value={title}
        />

        <View style={{flexDirection: 'row'}}>
          <CustomTextInputWithLabel
            isDate={true}
            style={{width: '40%'}}
            label="Start Date and Time"
            imageSource={DatePickerIcon}
            onPressIcon={() => showDateTimePicker('selectedStartDate')}
            value={selectedStartDate}
          />
          <CustomTextInputWithLabel
            isDate={true}
            style={{width: '40%'}}
            label="End Date and Time"
            imageSource={DatePickerIcon}
            onPressIcon={() => showDateTimePicker('selectedEndDate')}
            value={selectedEndDate}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View>
            <Text style={styles.status}>Status</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              containerStyle={{width: '90%'}}
              style={{borderWidth: 0}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleAddTask}
        style={styles.addButtonContainer}>
        <Text style={styles.addButtonText}>Save Task</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateTimeConfirm}
        onCancel={hideDateTimePicker}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  headerContainer: {
    width: screenWidth,
    position: 'absolute',
  },
  ellipseImage: {
    width: 300,
    height: 300,
    tintColor: colors.primary,
    position: 'absolute',
  },
  taskImageContainer: {
    alignItems: 'center',
    transform: [{scaleX: -1}],
    marginTop: 60,
  },
  taskImage: {width: 250, height: 250},
  addButtonContainer: {
    width: '90%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  addButtonText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  ellipseContainer: {
    flex: 1,
    transform: [{scaleX: -1}],
  },
  status: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  dropDownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default AddTaskScreen;
