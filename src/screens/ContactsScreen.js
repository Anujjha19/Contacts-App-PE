import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ContactList from '../components/ContactList';
import Popup from '../components/Popup';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    const fetchedContacts = [];
    const sameNumber = '1234567890';
    const differentNames = ['Arjun', 'John', 'Emily', 'David', 'Emma'];

    for (let i = 0; i < 20; i++) {
      const nameIndex = i % differentNames.length;
      const contact = {
        id: i.toString(),
        name: differentNames[nameIndex],
        number: i % 2 === 0 ? sameNumber : `987654321${i}`,
      };
      fetchedContacts.push(contact);
    }
    setContacts(fetchedContacts);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const handleClosePopup = () => {
    setSelectedContact(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setContacts(fetchedContacts);
    } else {
      const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
      setContacts(filteredContacts);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ContactList contacts={contacts} onContactPress={handleContactPress} />
      {selectedContact && (
        <Popup contact={selectedContact} onClose={handleClosePopup} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#333',
  },
});

export default ContactsScreen;
