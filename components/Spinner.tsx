import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function Spinner() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007aff" />
    </View>
  );
}

export default Spinner;
