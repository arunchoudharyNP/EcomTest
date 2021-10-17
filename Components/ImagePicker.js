import React, { useState } from "react";

import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const ImgPicker = (props) => {
  const [imageData, setImageData] = useState("");

  const verifyPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    console.log(status);

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Please allow following permissions to continue",
        [{ text: "Okay" }]
      );

      return false;
    }
    return true;
  };

  const imagePickerHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [9, 9],
      quality: 0.5,
    });
    console.log(image);
    setImageData(image);

    if (!image.cancelled) {
      props.onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imgContainer}>
      <View style={styles.imgPreview}>
        {!imageData.uri ? (
          <Text style={styles.text}>Take a selfie</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageData.uri }} />
        )}
      </View>
      <View style={styles.imgButton}>
        <Button title="Capture" onPress={imagePickerHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: "row",
  },
  imgPreview: {
    borderWidth: 1,
    borderColor: "grey",
    width: "60%",
    height: 200,
    marginBottom: 15,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    alignSelf: "center",
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  imgButton: {
    justifyContent: "center",
    padding: 25,
  },
});

export default ImgPicker;
