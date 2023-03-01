import React, { useState, useEffect } from 'react';
import { ActivityIndicator,View,Text,StyleSheet,FlatList  } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function ProductsPage() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [products, setProducts] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('products')
      .onSnapshot(
        querySnapshot => {
          const products = [];
    
          querySnapshot.forEach(documentSnapshot => {
            products.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
    
          setProducts(products);                 
          setLoading(false);
        });
    
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []
      );

    // Unsubscribe from events when no longer in use
   

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>User ID: {item.id}</Text>
          <Text>User Name: {item.name}</Text>
        </View>
      )}
    />
  );
}
  // ...



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProductsPage;
