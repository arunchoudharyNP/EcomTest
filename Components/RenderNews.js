import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

class RenderNews extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null };
  }

  render() {
    return (
      <View style={{ marginVertical: 5 }}>
        <Card>
          <Card.Content>
            <Title>{this.props.item.title}</Title>
          </Card.Content>
          <Card.Cover source={{ uri: this.props.item.urlToImage }} />
          <Card.Content>
            <Paragraph>{this.props.item.content}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    paddingTop: 40,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default RenderNews;
