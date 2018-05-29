import React from "react";
import { View, ToolbarAndroid, StyleSheet } from "react-native";

import { PRIMARY, TEXT } from "../colors";
import { CLOSE_ICON } from "../icons";

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: PRIMARY,
  }
});

const ACTIONS = [
  {
    title: "Save",
    show: "always"
  }
];

const AddContactToolbar = ({}) => (
  <ToolbarAndroid
    navIcon={CLOSE_ICON}
    titleColor={TEXT}
    style={styles.toolbar}
    actions={ACTIONS}
  />
);

export default AddContactToolbar;
