import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Row = ({ icon, label, value, destructive, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={18} color={destructive ? '#EF4444' : '#6B7280'} />
      <Text style={[styles.rowLabel, destructive && styles.rowDestructive]}>{label}</Text>
    </View>
    <View style={styles.rowRight}>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </View>
  </TouchableOpacity>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Section title="General">
          <Row icon="notifications-outline" label="Notifications" onPress={() => {}} />
          <Row icon="card-outline" label="Subscription" onPress={() => {}} />
        </Section>

        <Section title="Community">
          <Row icon="swap-vertical-outline" label="Auto-publish" onPress={() => {}} />
          <Row icon="people-outline" label="Blocked users" onPress={() => {}} />
        </Section>

        <Section title="EduScan">
          <Row icon="help-circle-outline" label="FAQ" onPress={() => {}} />
          <Row icon="mail-outline" label="Contact us" onPress={() => {}} />
          <Row icon="information-circle-outline" label="About" onPress={() => {}} />
        </Section>

        <Section title="Account">
          <Row icon="globe-outline" label="Country" value="United States of America" onPress={() => {}} />
          <Row icon="log-out-outline" label="Log out" onPress={() => {}} />
          <Row icon="trash-outline" label="Delete account" destructive onPress={() => {}} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerIcon: {
    width: 28,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowLabel: {
    fontSize: 14,
    color: '#111827',
  },
  rowValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  rowDestructive: {
    color: '#EF4444',
    fontWeight: '600',
  },
});

export default SettingsScreen;


