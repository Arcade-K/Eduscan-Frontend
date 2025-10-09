import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalizeFont, scale } from '../utils/responsive';

const SubscriptionScreen = ({ navigation }) => {
  const handleSubscribe = () => {
    // TODO: hook into purchases / payments
    navigation.goBack();
  };

  const handleNoThanks = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Subscribe for EduScan Plus. Cancel anytime.</Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.featureText}>Unlimited Expert-Verified answers</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.featureText}>Full access to AI-powered Math Solver</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.featureText}>No ads or interruptions</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.featureText}>Priority support and enhanced features</Text>
        </View>
      </View>

      <View style={styles.plansContainer}>
        <View style={[styles.planCard, styles.selectedPlan]}>
          <Text style={styles.planLabel}>Annual</Text>
          <Text style={styles.planPrice}>R$84.00</Text>
          <Text style={styles.planBilling}>billed every 12 months</Text>
          <Text style={styles.planHint}>Save 70%</Text>
        </View>

        <View style={styles.planCard}>
          <Text style={styles.planLabel}>Semi-annual</Text>
          <Text style={styles.planPrice}>R$66.00</Text>
          <Text style={styles.planBilling}>billed every 6 months</Text>
        </View>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeText}>Subscribe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.noThanks} onPress={handleNoThanks}>
          <Text style={styles.noThanksText}>No thanks</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  features: { paddingHorizontal: 20, marginTop: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: scale(8) },
  featureText: { color: '#374151', fontSize: normalizeFont(14), marginLeft: scale(8) },
  plansContainer: { padding: 20, marginTop: 12 },
  planCard: { backgroundColor: '#fff', borderRadius: scale(12), padding: scale(16), marginBottom: scale(12), borderWidth: 1, borderColor: '#E5E7EB' },
  selectedPlan: { borderColor: '#059669', backgroundColor: '#ECFDF5' },
  planLabel: { fontSize: normalizeFont(14), fontWeight: '600', color: '#065F46' },
  planPrice: { fontSize: normalizeFont(20), fontWeight: '700', color: '#065F46', marginTop: scale(6) },
  planBilling: { fontSize: normalizeFont(12), color: '#6B7280', marginTop: scale(2) },
  planHint: { fontSize: normalizeFont(12), color: '#059669', marginTop: scale(6) },
  subscribeButton: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  subscribeText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  noThanks: { alignItems: 'center', marginTop: 12 },
  noThanksText: { color: '#2563EB', fontWeight: '600' },
});

export default SubscriptionScreen;
