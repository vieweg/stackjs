import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      const response = await api.get('/projects');
      setProjects(response.data);
    }
    fetchRepositories();
  }, []);
  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Rafael Vieweg',
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar
        barStyle="default"
        translucent={false}
        backgroundColor="#7159c1"
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item}) => (
            <Text style={styles.title}>{item.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleAddProject}
          style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 22,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
