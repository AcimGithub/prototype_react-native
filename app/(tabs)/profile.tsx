import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    try {
      // Send request to your backend to initiate password change process
      const response = await axios.post('http://192.168.1.7:3000/profile', { email });
      console.log('Response:', response.data);
      Alert.alert('Success', 'Password change email sent. Please check your email.');
    } catch (error) {
      console.error('Password Change Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Enter your email'
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder='Enter new password'
          secureTextEntry={true}
        />
        <Button title='Change Password' onPress={handleChangePassword} />
        <Button title="Go back to main menu" onPress={() => navigation.navigate('welcome')} />
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

export default Profile;
