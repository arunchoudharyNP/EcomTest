import React, { useEffect, useState } from "react";
import { View, StyleSheet, RefreshControl, FlatList, Text } from "react-native";
import RenderNews from "../Components/RenderNews";
const NewsScreen = () => {
  const [newsData, setnewsData] = useState([]);

  const [refresh, setrefresh] = useState(false);
 
  const TodayDate = new Date().toISOString().split("T",1)[0];
  const loadData = () => {
    setrefresh(true);
    fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&from=${TodayDate}&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98`
    )
      .then((response) => response.json())
      .then((data) => {
        setnewsData(data.articles);
        setrefresh(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 30,
          padding: 10,
          backgroundColor: "black",
          width: "100%",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 24, color: "white" }}>
          Latest NEWS
        </Text>
      </View>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <RenderNews item={item} index={index} />
        )}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={loadData} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewsScreen;
