//import { Text, View } from "react-native";
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { Link } from 'expo-router';

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

function App() {
  return (
    <View style={tw`bg-blue-500 h-100`}>
      <Text style={tw`text-black text-xl font-bold`}>
        Hello, Tailwind React Native Classes!
        
      </Text>
      <Link href="/login">Get Started</Link>
    </View>
  );
}

export default App;



