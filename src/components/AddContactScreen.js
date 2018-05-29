import React, { Component } from "react";
import { View, Text } from "react-native";

import { AddContactToolbar } from ".";

class AddContactScreen extends Component {
  static navigationOptions = {
    header: () => <AddContactToolbar />
  };

  render() {
    return (
      <View>
        <Text>Add Contact</Text>
      </View>
    );
  }
}

export default AddContactScreen;
