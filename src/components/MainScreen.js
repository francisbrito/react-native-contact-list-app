/* @flow */

import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { refreshContacts } from "../actions";

import { AddContactButton, SearchContactToolbar, ContactList } from ".";
import { getContacts } from "../ContactListProvider";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addContactButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});

class MainScreenAndroid extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired
      })
    ),
    refreshContacts: PropTypes.func
  };

  static defaultProps = {
    contacts: [],
    refreshContacts: () => {
      /* no-op */
    }
  };

  componentDidMount() {
    getContacts()
      .then(this.props.refreshContacts);
  }

  render() {
    const { contacts } = this.props;

    return (
      <View style={styles.container}>
        <SearchContactToolbar />
        <ContactList contacts={contacts} />
        <AddContactButton containerStyle={styles.addContactButtonContainer} />
      </View>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });
const mapDispatchToProps = {
  refreshContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenAndroid);
