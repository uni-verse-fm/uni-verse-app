import React from "react";
import { Modal, View, Button, Text } from "react-native";
import tw from "../tailwind";

const ConfirmAlert = ({ onConfirm, visible, setModalVisible, message }) => {
  const handleConfirm = () => {
    setModalVisible(false);
    onConfirm();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}
    >
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`p-4 bg-white rounded-xl border-2 w-2/3`}>
          <Text style={tw`text-xl text-center m-2`}>{message}</Text>
          <View style={tw`flex flex-row`}>
            <View style={tw`bg-grn grow rounded-full mx-1`}>
              <Button color="white" title="Confirm" onPress={handleConfirm} />
            </View>
            <View style={tw`bg-drk grow rounded-full mx-1`}>
              <Button
                color="white"
                title="Cancel"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmAlert;
