import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onContactPress }) => {
  return (
    <FlatList
      data={contacts}
      renderItem={({ item }) => (
        <ContactItem contact={item} onPress={() => onContactPress(item)} />
      )}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
});

export default ContactList;
