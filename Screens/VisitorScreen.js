import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VisitorProfile from "../Components/VisitorProfile";

const VisitorScreen = (props) => {
  const [visitorData, setvisitorData] = useState([]);

  const loadData = async () => {
    AsyncStorage.getItem("VisitorData")
      .then((res) => {
        return JSON.parse(res);
      })
      .then((res) => {
        setvisitorData(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = () => {
    props.navigation.navigate("VisitorsForm", {
      visitorData: visitorData ? visitorData : [],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Add Vistors" onPress={() => submitHandler()} />
      <FlatList
        data={visitorData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VisitorProfile item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default VisitorScreen;
