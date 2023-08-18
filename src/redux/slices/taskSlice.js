import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils/ToastUtils';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      console.log('payload', action.payload);
      state.push(action.payload);
      showToast('success', 'Task added successfully');
    },
    editTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.startDate = action.payload.startDate;
        task.endDate = action.payload.endDate;
        task.status = action.payload.status;

        showToast('success', 'Edited Task Successfully');
      }
    },
    deleteTask: (state, action) => {
      const deletedTask = state.find(task => task.id === action.payload);

      if (deletedTask) {
        showToast('success', 'Task Deleted Successfully');
      }

      return state.filter(task => task.id !== action.payload);
    },
    loadTasks: (state, action) => {
      return action.payload;
    },
  },
});

export const {addTask, editTask, deleteTask, loadTasks} = taskSlice.actions;

export const loadTasksAsync = () => async dispatch => {
  try {
    const tasksJson = await AsyncStorage.getItem('tasks');
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      dispatch(loadTasks(tasks));
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
};

export const saveTasksAsync = tasks => async dispatch => {
  try {
    const tasksJson = JSON.stringify(tasks);
    await AsyncStorage.setItem('tasks', tasksJson);
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export default taskSlice.reducer;
