import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text, ListRenderItem } from 'react-native';
import ContactItem from './ContactItem';
import { contacts, Contact } from '../data/contact';

const ContactList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactItem contact={item} />;

  const loadMoreContacts = useCallback(() => {
    if (loading) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1000);
  }, [loading]);

  const paginatedContacts = contacts.slice(0, page * 5);

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedContacts}
        renderItem={renderItem}
        keyExtractor={item => item.phone}
        onEndReached={loadMoreContacts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          loading ? (
            <Text style={styles.loading}>Loading more contacts...</Text>
          ) : null
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add members</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    padding: 10,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ContactList;