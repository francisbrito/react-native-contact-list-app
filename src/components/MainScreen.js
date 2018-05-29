/* @flow */

import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { AddContactButton, SearchContactToolbar, ContactList } from ".";
import { fetchContacts } from "../actions";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addContactButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});

class MainScreenAndroid extends Component {
  static navigationOptions = {
    header: () => <SearchContactToolbar />
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired
      })
    ),
    fetchContacts: PropTypes.func
  };

  static defaultProps = {
    contacts: [],
    fetchContacts: () => {
      /* no-op */
    }
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  handleOpenAddContactScreen = () => {
    this.props.navigation.navigate("AddContact");
  };

  render() {
    const { contacts } = this.props;

    return (
      <View style={styles.container}>
        <ContactList contacts={contacts} />
        <AddContactButton
          onPress={this.handleOpenAddContactScreen}
          containerStyle={styles.addContactButtonContainer}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });
const mapDispatchToProps = {
  fetchContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenAndroid);
