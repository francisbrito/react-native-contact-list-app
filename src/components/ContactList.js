import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Contact } from ".";
import { DIVIDER } from "../colors";
import { fetchContacts, startFetching, endFetching } from "../actions";

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyListTitle: {
    color: DIVIDER
  }
});

const getKey = item => item.id;
const renderContact = ({ item }) => <Contact {...item} />;
const renderEmptyList = () => (
  <View style={styles.emptyListContainer}>
    <Icon size={64} name="mood-bad" color={DIVIDER} />
    <Text style={styles.emptyListTitle}>A little lonely in here...</Text>
  </View>
);

const ContactList = ({ contacts, refreshing, fetchContacts }) =>
  contacts && contacts.length > 0 ? (
    <FlatList
      data={contacts}
      onRefresh={fetchContacts}
      refreshing={refreshing}
      keyExtractor={getKey}
      renderItem={renderContact}
    />
  ) : (
    renderEmptyList()
  );

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      picture: PropTypes.string
    })
  ),
  refreshing: PropTypes.bool,
  fetchContacts: PropTypes.func
};

ContactList.defaultProps = {
  contacts: [],
  refreshing: false
};

const filterContacts = ({ query, contacts }) =>
  !query
    ? contacts
    : contacts.filter(c => c.fullName.includes(query.toLowerCase()));

const mapStateToProps = ({ fetching, contacts, query }) => ({
  refreshing: fetching,
  contacts: filterContacts({ query, contacts })
});
const mapDispatchToProps = {
  startFetching,
  endFetching,
  fetchContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
