import React from "react";
import { ToolbarAndroid, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PRIMARY, TEXT } from "../colors";
import { CLOSE_ICON, DONE_ICON } from "../icons";
import { saveContact, cancelNewContact } from "../actions";

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

const handleCancel = ({ navigation, cancelNewContact }) => () => {
  cancelNewContact();

  navigation.goBack();
};

const handleSaveContact = ({ navigation, saveContact }) => () => {
  saveContact();

  navigation.goBack();
};

const AddContactToolbar = ({ navigation, saveContact, cancelNewContact }) => (
  <ToolbarAndroid
    navIcon={CLOSE_ICON}
    titleColor={TEXT}
    style={styles.toolbar}
    actions={ACTIONS}
    onIconClicked={handleCancel({ navigation, cancelNewContact })}
    onActionSelected={handleSaveContact({ navigation, saveContact })}
  />
);

AddContactToolbar.propTypes = {
  navigation: PropTypes.any,
  saveContact: PropTypes.func,
  cancelNewContact: PropTypes.func,
};

const noOp = () => { /* noOp */ };

AddContactToolbar.defaultProps = {
  saveContact: noOp ,
  cancelNewContact: noOp,
};

const mapDispatchToProps = {
  saveContact,
  cancelNewContact
};

export default connect(
  null,
  mapDispatchToProps
)(AddContactToolbar);
