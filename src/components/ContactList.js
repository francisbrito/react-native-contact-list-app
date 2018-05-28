import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { DIVIDER } from "../colors";

const styles = StyleSheet.create({
  contactList: {
    justifyContent: "center",
    alignItems: "center"
  },
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
const renderContact = ({ item }) => <Text>{item.fullName}</Text>;
const renderEmptyList = () => (
  <View style={styles.emptyListContainer}>
    <Icon size={64} name="mood-bad" color={DIVIDER} />
    <Text style={styles.emptyListTitle}>A little lonely in here...</Text>
  </View>
);
const ContactList = ({ contacts }) =>
  contacts && contacts.length > 0 ? (
    <FlatList
      contentContainerStyle={styles.contactList}
      data={contacts}
      keyExtractor={getKey}
      renderItem={renderContact}
    />
  ) : (
    renderEmptyList()
  );

export default ContactList;
