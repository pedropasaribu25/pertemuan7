import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard,
  Alert 
} from 'react-native';

// Definisi tipe data untuk Task (Penting di TypeScript)
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  // --- STATE MANAGEMENT (P04) ---
  const [task, setTask] = useState<string>(''); 
  const [taskList, setTaskList] = useState<Task[]>([]); 

  // --- FUNGSI CRUD: ADD (P06) ---
  const handleAddTask = () => {
    // VALIDASI INPUT (P05)
    if (task.trim().length === 0) {
      Alert.alert('Waduh!', 'Isi tugas lo dulu bro, jangan dikosongin.');
      return;
    }

    const newTask: Task = { 
      id: Date.now().toString(), 
      text: task, 
      completed: false 
    };

    setTaskList([...taskList, newTask]);
    setTask(''); 
    Keyboard.dismiss(); 
  };

  // --- FUNGSI CRUD: DELETE (P06) ---
  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  // --- FUNGSI BONUS: MARK AS DONE ---
  const toggleComplete = (id: string) => {
    setTaskList(taskList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // --- KOMPONEN ITEM LIST (P03) ---
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.taskTextWrapper} 
        onPress={() => toggleComplete(item.id)}
      >
        {/* CONDITIONAL RENDERING (P04) */}
        <View style={[styles.statusCircle, item.completed && styles.completedCircle]} />
        <Text style={[styles.itemText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteBtn}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>MyTaskList</Text>
          <Text style={styles.subtitle}>Get things done, Bro!</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{taskList.length} Tasks</Text>
        </View>
      </View>

      {/* DYNAMIC LIST (P06) - ListEmptyComponent terpasang */}
      <FlatList
        data={taskList}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Santai banget... Belum ada tugas! ☕</Text>
          </View>
        }
      />

      {/* FORM INPUT (P05) */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Tulis tugas baru...'} 
          placeholderTextColor={'#999'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// --- STYLESHEET (P02) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#333',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  itemContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  taskTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#BB86FC',
    marginRight: 15,
  },
  completedCircle: {
    backgroundColor: '#03DAC6',
    borderColor: '#03DAC6',
  },
  itemText: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  deleteBtn: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    borderColor: '#333',
    borderWidth: 1,
    width: '80%',
    color: '#fff',
  },
  addWrapper: {
    width: 55,
    height: 55,
    backgroundColor: '#BB86FC',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 30,
    color: '#000',
  },
});
