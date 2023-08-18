import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store/index';
import {loadTasksAsync, saveTasksAsync} from './redux/slices/taskSlice';
import Toast from 'react-native-toast-message';
import Routes from './navigation/Routes';

const App = () => {
  useEffect(() => {
    store.dispatch(loadTasksAsync());
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const tasks = store.getState().tasks;
      store.dispatch(saveTasksAsync(tasks));
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;

// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [task, setTask] = useState('');
//   const [editIndex, setEditIndex] = useState(-1);

//   const handleAddTask = () => {
//     if (task) {
//       if (editIndex !== -1) {
//         const tasksCopy = [...tasks];
//         tasksCopy[editIndex].title = task;
//         setTasks(tasksCopy);
//         setEditIndex(-1);
//       } else {
//         setTasks([...tasks, {title: task, completed: false}]);
//       }
//       setTask('');
//     }
//   };

//   const handleEdit = index => {
//     setTask(tasks[index].title);
//     setEditIndex(index);
//   };

//   const handleDelete = index => {
//     console.log('clicked');
//     const tasksCopy = [...tasks];
//     tasksCopy.splice(index, 1);
//     setTasks(tasksCopy);
//   };

//   const handleComplete = index => {
//     const tasksCopy = [...tasks];
//     tasksCopy[index].completed = !tasksCopy[index].completed;

//     console.log(tasksCopy);
//     setTasks(tasksCopy);
//   };

//   const renderTasks = ({item, index}) => {
//     return (
//       <View style={styles.tasksConteiner}>
//         <Text
//           style={{
//             color: item.completed ? 'red' : 'white',
//             opacity: 1,
//             width: '80%',
//             textDecorationLine: item.completed ? 'line-through' : null,
//           }}>
//           {item.title}
//         </Text>
//         <TouchableOpacity
//           onPress={() => {
//             handleEdit(index);
//           }}>
//           <Text style={styles.icons}>🖌️</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             handleDelete(index);
//           }}>
//           <Text style={styles.icons}>❌</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             handleComplete(index);
//           }}>
//           {item.completed ? (
//             <Text style={styles.icons}>👎</Text>
//           ) : (
//             <Text style={styles.icons}>👍</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         value={task}
//         onChangeText={txt => setTask(txt)}
//         placeholder="Enter your task"
//         placeholderTextColor="white"
//         style={styles.textInputContainer}
//       />
//       <TouchableOpacity
//         onPress={() => handleAddTask()}
//         style={styles.addButton}>
//         <Text style={styles.addButtonText}>
//           {editIndex !== -1 ? 'Update task' : 'Add Task'}
//         </Text>
//       </TouchableOpacity>

//       <FlatList
//         data={tasks}
//         renderItem={(item, index) => renderTasks(item, index)}
//         style={{width: '100%'}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   textInputContainer: {
//     width: '80%',
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 25,
//     padding: 15,
//     borderColor: 'white',
//     color: 'white',
//     marginBottom: 20,
//   },
//   addButton: {
//     backgroundColor: 'white',
//     width: '40%',
//     height: 30,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   addButtonText: {
//     color: 'black',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   tasksConteiner: {
//     backgroundColor: 'rgba(169, 169, 169, 0.2)',
//     padding: 20,
//     width: '80%',
//     borderRadius: 10,
//     flexDirection: 'row',
//     gap: 20,
//     alignSelf: 'center',
//     margin: 5,
//   },
//   icons: {color: 'white', opacity: 1},
// });

// export default App;
