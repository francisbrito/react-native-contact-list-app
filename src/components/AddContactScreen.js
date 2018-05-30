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

  inputs = {};

  registerInput = id => ref => {
    this.inputs[id] = ref;
  };

  focusInput = id => () => {
    this.inputs[id].focus();
  };

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
            autoFocus
            enablesReturnKeyAutomatically
            returnKeyType="next"
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            ref={this.registerInput("firstName")}
            onSubmitEditing={this.focusInput("lastName")}
            blurOnSubmit={false}
          />
          <Input
            enablesReturnKeyAutomatically
            autoCapitalize="words"
            returnKeyType="done"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            ref={this.registerInput("lastName")}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ newContact }) => ({
  ...newContact,
  isPictureSet: !!newContact.picture
});
const mapDispatchToProps = {
  setFirstName,
  setLastName,
  pickPicture
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactScreen);
