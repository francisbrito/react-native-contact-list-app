import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Input } from "react-native-elements";
import { connect } from "react-redux";

import { AddContactToolbar } from ".";
import { WHITE } from "../colors";
import { setFirstName, setLastName, pickPicture } from "../actions";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    flex: 2,
    backgroundColor: WHITE,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

class AddContactScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: () => <AddContactToolbar navigation={navigation} />
  });

  render() {
    const {
      firstName,
      lastName,
      setFirstName,
      setLastName,
      pickPicture,
      picture,
      isPictureSet
    } = this.props;

    const avatarProps = isPictureSet ? { source: { uri: picture } } : {};

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={pickPicture} style={styles.avatarContainer}>
          <Avatar
            rounded
            size="xlarge"
            icon={{ name: "person" }}
            {...avatarProps}
          />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Input
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
          />
          <Input
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ newContact }) => ({ ...newContact, isPictureSet: !!newContact.picture });
const mapDispatchToProps = {
  setFirstName,
  setLastName,
  pickPicture
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactScreen);
