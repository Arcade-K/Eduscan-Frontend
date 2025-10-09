import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [showTipsModal, setShowTipsModal] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleGotIt = () => {
    setShowTipsModal(false);
  };

  const handleCloseCamera = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scanning Tips</Text>
      </View>

      {/* Camera Viewfinder */}
      <View style={styles.cameraViewfinder}>
        {permission?.granted ? (
          <CameraView ref={cameraRef} style={styles.cameraPreview} facing="back" />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Ionicons name="camera" size={60} color="#6B7280" />
            <Text style={styles.cameraText}>Waiting for camera permission…</Text>
            <TouchableOpacity style={styles.gotItButton} onPress={requestPermission}>
              <Text style={styles.gotItButtonText}>Enable camera</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Shutter button */}
        <View style={styles.shutterContainer}>
          <View style={styles.shutterButton} />
        </View>
      </View>

      {/* Scanning Tips Modal */}
      <Modal
        visible={showTipsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTipsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Handle */}
            <View style={styles.modalHandle} />
            
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTipsModal(false)}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.personIllustration}>
                <View style={styles.personBody}>
                  <Ionicons name="person" size={40} color="#4F46E5" />
                </View>
                <View style={styles.magnifyingGlass}>
                  <Ionicons name="add" size={20} color="#fff" />
                </View>
              </View>
              <View style={styles.shapesContainer}>
                <View style={[styles.shape, styles.shape1]} />
                <View style={[styles.shape, styles.shape2]} />
                <View style={[styles.shape, styles.shape3]} />
                <View style={[styles.shape, styles.shape4]} />
              </View>
            </View>

            {/* Content */}
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Tips for scanning</Text>
              
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>Keep text inside frame</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>Ensure text isn't blurry</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>Keep it level and flat</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.gotItButton} onPress={handleGotIt}>
                <Text style={styles.gotItButtonText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  cameraViewfinder: {
    flex: 1,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cameraPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    minHeight: height * 0.6,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  personIllustration: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  personBody: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  magnifyingGlass: {
    position: 'absolute',
    right: -20,
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapesContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
    flexDirection: 'row',
    gap: 8,
  },
  shape: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  shape1: {
    backgroundColor: '#F59E0B',
  },
  shape2: {
    backgroundColor: '#8B5CF6',
  },
  shape3: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  shape4: {
    backgroundColor: '#000',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  tipsList: {
    width: '100%',
    marginBottom: 32,
  },
  tipItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tipText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
  },
  gotItButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  gotItButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#22C55E',
    borderWidth: 4,
    borderColor: '#fff',
  },
});

export default CameraScreen;



