/* @flow */

import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
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
  },
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    fetchContacts: PropTypes.func,
    fetching: PropTypes.bool
  };

  static defaultProps = {
    contacts: [],
    fetchContacts: () => {
      /* no-op */
    },
    fetching: false
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  handleOpenAddContactScreen = () => {
    this.props.navigation.navigate("AddContact");
  };

  render() {
    const { contacts, fetching } = this.props;

    return (
      <View style={styles.container}>
        {fetching ? (
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ContactList contacts={contacts} />
        )}
        <AddContactButton
          onPress={this.handleOpenAddContactScreen}
          containerStyle={styles.addContactButtonContainer}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ contacts, fetching }) => ({ contacts, fetching });
const mapDispatchToProps = {
  fetchContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenAndroid);
