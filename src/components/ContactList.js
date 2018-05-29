import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { Contact } from ".";
import { DIVIDER } from "../colors";

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
const ContactList = ({ contacts }) =>
  contacts && contacts.length > 0 ? (
    <FlatList
      data={contacts}
      keyExtractor={getKey}
      renderItem={renderContact}
    />
  ) : (
    renderEmptyList()
  );

export default ContactList;
