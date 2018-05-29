import React from "react";
import { ToolbarAndroid, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PRIMARY, TEXT } from "../colors";
import { CLOSE_ICON, DONE_ICON } from "../icons";
import { saveContact } from "../actions";

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: PRIMARY
  }
});

const ACTIONS = [
  {
    title: "Done",
    icon: DONE_ICON,
    show: "always"
  }
];

const handleCancel = ({ navigation }) => () => {
  navigation.goBack();
};

const handleSaveContact = ({ navigation, saveContact }) => () => {
  saveContact();

  navigation.goBack();
};

const AddContactToolbar = ({ navigation, saveContact }) => (
  <ToolbarAndroid
    navIcon={CLOSE_ICON}
    titleColor={TEXT}
    style={styles.toolbar}
    actions={ACTIONS}
    onIconClicked={handleCancel({ navigation })}
    onActionSelected={handleSaveContact({ navigation, saveContact })}
  />
);

AddContactToolbar.propTypes = {
  navigation: PropTypes.any,
  saveContact: PropTypes.func
};

AddContactToolbar.defaultProps = {
  saveContact: () => {
    /* no-op */
  }
};

const mapDispatchToProps = {
  saveContact
};

export default connect(
  null,
  mapDispatchToProps
)(AddContactToolbar);
