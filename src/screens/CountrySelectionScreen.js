import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CountrySelectionScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('United States of America');

  const countries = [
    { id: '1', name: 'United States', domain: 'eduscan.us' },
    { id: '2', name: 'United Kingdom', domain: 'eduscan.uk' },
    { id: '3', name: 'Canada', domain: 'eduscan.ca' },
    { id: '4', name: 'Australia', domain: 'eduscan.au' },
    { id: '5', name: 'India', domain: 'eduscan.in' },
    { id: '6', name: 'Germany', domain: 'eduscan.de' },
    { id: '7', name: 'France', domain: 'eduscan.fr' },
    { id: '8', name: 'Japan', domain: 'eduscan.jp' },
    { id: '9', name: 'Brazil', domain: 'eduscan.br' },
    { id: '10', name: 'Mexico', domain: 'eduscan.mx' },
    { id: '11', name: 'South Africa', domain: 'eduscan.za' },
    { id: '12', name: 'Nigeria', domain: 'eduscan.ng' },
    { id: '13', name: 'Egypt', domain: 'eduscan.eg' },
    { id: '14', name: 'Saudi Arabia', domain: 'eduscan.sa' },
    { id: '15', name: 'Argentina', domain: 'eduscan.ar' },
    { id: '16', name: 'Chile', domain: 'eduscan.cl' },
    { id: '17', name: 'Colombia', domain: 'eduscan.co' },
    { id: '18', name: 'Sweden', domain: 'eduscan.se' },
    { id: '19', name: 'Norway', domain: 'eduscan.no' },
    { id: '20', name: 'Denmark', domain: 'eduscan.dk' },
    { id: '21', name: 'Finland', domain: 'eduscan.fi' },
    { id: '22', name: 'Netherlands', domain: 'eduscan.nl' },
    { id: '23', name: 'Belgium', domain: 'eduscan.be' },
    { id: '24', name: 'Spain', domain: 'eduscan.es' },
    { id: '25', name: 'Italy', domain: 'eduscan.it' },
    { id: '26', name: 'Turkey', domain: 'eduscan.tr' },
    { id: '27', name: 'China', domain: 'eduscan.cn' },
    { id: '28', name: 'South Korea', domain: 'eduscan.kr' },
    { id: '29', name: 'Indonesia', domain: 'eduscan.id' },
    { id: '30', name: 'Malaysia', domain: 'eduscan.my' },
    { id: '31', name: 'Philippines', domain: 'eduscan.ph' },
    { id: '32', name: 'Thailand', domain: 'eduscan.th' },
    { id: '33', name: 'Vietnam', domain: 'eduscan.vn' },
    { id: '34', name: 'Poland', domain: 'eduscan.pl' },
    { id: '35', name: 'Russia', domain: 'eduscan.ru' },
    { id: '36', name: 'Ukraine', domain: 'eduscan.ua' },
    { id: '37', name: 'Israel', domain: 'eduscan.il' },
    { id: '38', name: 'United Arab Emirates', domain: 'eduscan.ae' },
    { id: '39', name: 'Singapore', domain: 'eduscan.sg' },
    { id: '40', name: 'Hong Kong', domain: 'eduscan.hk' },
    { id: '41', name: 'Taiwan', domain: 'eduscan.tw' },
    { id: '42', name: 'New Zealand', domain: 'eduscan.nz' },
    { id: '43', name: 'Ireland', domain: 'eduscan.ie' },
    { id: '44', name: 'Portugal', domain: 'eduscan.pt' },
    { id: '45', name: 'Greece', domain: 'eduscan.gr' },
    { id: '46', name: 'Czech Republic', domain: 'eduscan.cz' },
    { id: '47', name: 'Hungary', domain: 'eduscan.hu' },
    { id: '48', name: 'Romania', domain: 'eduscan.ro' },
    { id: '49', name: 'Bulgaria', domain: 'eduscan.bg' },
    { id: '50', name: 'Croatia', domain: 'eduscan.hr' },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.name);
    // In a real app, you would save the selected country and update the app's region
    console.log('Selected country:', country);
    // Navigate back or show confirmation
    navigation.goBack();
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryDomain}>{item.domain}</Text>
      </View>
      {selectedCountry === item.name && (
        <Ionicons name="checkmark" size={20} color="#3B82F6" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Country selection</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Country List */}
      <FlatList
        data={countries}
        keyExtractor={(item) => item.id}
        renderItem={renderCountryItem}
        style={styles.countryList}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSpacer: {
    width: 32,
  },
  countryList: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  countryDomain: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default CountrySelectionScreen;
