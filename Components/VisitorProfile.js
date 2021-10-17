import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const Visitorprofile = (props) => {
  const data = props.item;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data.image }}
          style={{ resizeMode: "contain", width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.dataContainer}>
        <Text>{`Name: ${data.name} `}</Text>
        <Text>{`Email: ${data.email} `}</Text>
        <Text>{`Person to Meet: ${data.person} `}</Text>
        <Text>{`Visit Type: ${data.visitType} `}</Text>
        <Text>{`Date: ${data.date} `}</Text>
        <Text>{`Start Time: ${data.startTime} `}</Text>
        <Text>{`End Time: ${data.endTime} `}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    height: 180,
    margin: 5,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "black",
  },
  imageContainer: {
    flex: 1.3,
    backgroundColor: "grey",
  },
  dataContainer: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Visitorprofile;
