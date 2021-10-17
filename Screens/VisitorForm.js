import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Button } from "react-native";
import ImagePicker from "../Components/ImagePicker";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Visitorform = (props) => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [visitType, setVisitType] = useState("Meeting");
  const [person, setperson] = useState("");
  const [startTime, setstartTime] = useState("2359");
  const [endTime, setendTime] = useState("2359");
  const [image, setimage] = useState("");

  const date = new Date();
  const { visitorData } = props.route.params;

  const submitHandler = async () => {
    const data = {
      id: Math.random().toPrecision(10).toString(),
      name,
      email,
      visitType,
      person,
      image,
      startTime,
      endTime,
      date: date.toString().slice(0, 15),
    };
    console.log(data);
    visitorData.push(data);
    await AsyncStorage.setItem("VisitorData", JSON.stringify(visitorData));
    props.navigation.navigate("Visitors");
  };
  const imageHandler = (data) => {
    setimage(data);
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <ImagePicker onImageTaken={imageHandler} />
      </View>

      <TextInput
        label="Name"
        placeholder="Enter your Name"
        mode="flat"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        placeholder="Enter your Email"
        mode="flat"
        value={email}
        onChangeText={(text) => setemail(text)}
      />
      <Picker
        selectedValue={visitType}
        style={{
          height: 50,
          width: "100%",
        }}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => setVisitType(itemValue)}
      >
        <Picker.Item label="Meeting" value="Meeting" />
        <Picker.Item label="Delivery" value="Delivery" />
        <Picker.Item label="Personal" value="Personal" />
      </Picker>
      <TextInput
        label="Person to Visit"
        placeholder="Name of person to visit"
        mode="flat"
        value={person}
        onChangeText={(text) => setperson(text)}
      />
      <TextInput
        label="Today's Date"
        mode="flat"
        value={date.toString().slice(0, 15)}
        disabled
      />
      <View
        style={{
          flexDirection: "row",
          height: 50,
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
        }}
      >
        <Text style={{ alignSelf: "center" }}>{` Enter start time : `}</Text>

        <TextInputMask
          style={{ padding: 5, width: "100%" }}
          type={"datetime"}
          options={{
            format: "HH:mm",
          }}
          value={startTime}
          onChangeText={(text) => {
            setstartTime(text);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          height: 50,
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
        }}
      >
        <Text style={{ alignSelf: "center" }}>{` Enter end time : `}</Text>

        <TextInputMask
          style={{ padding: 5, width: "100%" }}
          type={"datetime"}
          options={{
            format: "HH:mm",
          }}
          value={endTime}
          onChangeText={(text) => {
            setendTime(text);
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Submit" onPress={submitHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {},
});

export default Visitorform;
