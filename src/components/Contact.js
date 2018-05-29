import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import capitalize from "capitalize";
import { ListItem } from "react-native-elements";
import randomColor from "randomcolor";

import { WHITE } from "../colors";

const styles = StyleSheet.create({
  avatarContainer: {
    height: 32,
    width: 32,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  initials: {
    textAlign: "center",
    color: WHITE
  }
});

const getInitials = (name = "") => name[0].toUpperCase();
const renderInitials = (name = "") => (
  <View
    style={[
      styles.avatarContainer,
      { backgroundColor: randomColor({ luminosity: "dark" }) }
    ]}>
    <Text style={styles.initials}>{getInitials(name)}</Text>
  </View>
);
const renderPicture = ({ picture, fullName }) => (
  <Image
    alt={fullName}
    style={styles.avatarContainer}
    source={{ uri: picture }}
  />
);

const Contact = ({ fullName, picture }) => (
  <ListItem
    title={capitalize.words(fullName)}
    leftAvatar={
      picture ? renderPicture({ picture, fullName }) : renderInitials(fullName)
    }
  />
);

Contact.propTypes = {
  fullName: PropTypes.string.isRequired,
  picture: PropTypes.string
};

Contact.defaultProps = {
  picture: null
};

export default Contact;
