import React from 'react';
import { Text, View } from 'react-native';
import tw from '../tailwind';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white dark:bg-drk`}>
      <Text style={tw`text-2xl font-bold`}>Home</Text>
      <View style={tw`mx-2 h-1 w-4/5`} />
      <View style={tw`mx-2 h-1 w-4/5`} />
    </View>
  );
}
