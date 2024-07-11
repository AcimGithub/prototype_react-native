// Login.tsx

import React from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Replace with your actual server endpoint
      const response = await axios.post('http://192.168.186.122:3000/login', { username, password });
      console.log('Response:', response.data); // Log response from server
      Alert.alert('Success', 'Login successful');
      navigation.navigate('welcome'); // Navigate to Welcome screen with username
    } catch (error) {
      console.error('Login Error:', error); // Log any errors for debugging
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder='Username'
          placeholderTextColor='grey'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default Login;
