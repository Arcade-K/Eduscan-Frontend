import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('general');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [focusPoint, setFocusPoint] = useState(null);
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleCloseCamera = () => {
    navigation.goBack();
  };

  const handleCapture = async () => {
    if (!permission?.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return;
    }

    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not ready. Please try again.');
      return;
    }

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });
      
      if (photo && photo.uri) {
        setCapturedImage(photo.uri);
        setShowPreview(true);
      } else {
        throw new Error('No photo data received');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required', 
          'Please grant access to your photo library to select images',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => console.log('Open settings') }
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        if (selectedImage.uri) {
          setCapturedImage(selectedImage.uri);
          setShowPreview(true);
        } else {
          throw new Error('No image URI received');
        }
      }
    } catch (error) {
      console.error('Error accessing gallery:', error);
      Alert.alert('Error', 'Failed to access gallery. Please try again.');
    }
  };

  const handleFocus = () => {
    // Show focus indicator at center of camera view
    setFocusPoint({ x: 0.5, y: 0.5 });
    setShowFocusIndicator(true);
    
    // Hide focus indicator after 2 seconds
    setTimeout(() => {
      setShowFocusIndicator(false);
    }, 2000);
  };

  const handleCameraTap = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const { width: cameraWidth, height: cameraHeight } = event.nativeEvent.target.getBoundingClientRect();
    
    // Calculate normalized coordinates (0-1)
    const x = locationX / cameraWidth;
    const y = locationY / cameraHeight;
    
    setFocusPoint({ x, y });
    setShowFocusIndicator(true);
    
    // Hide focus indicator after 2 seconds
    setTimeout(() => {
      setShowFocusIndicator(false);
    }, 2000);
  };

  const handleDocumentType = () => {
    Alert.alert(
      'Document Type',
      `Current type: ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}\n\nSelect the type of document you want to scan:`,
      [
        { 
          text: 'General', 
          onPress: () => setSelectedType('general'),
          style: selectedType === 'general' ? 'default' : 'cancel'
        },
        { 
          text: 'Math', 
          onPress: () => setSelectedType('math'),
          style: selectedType === 'math' ? 'default' : 'cancel'
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowPreview(false);
  };

  const handleUsePhoto = async () => {
    try {
      if (!capturedImage) {
        Alert.alert('Error', 'No image to process');
        return;
      }

      // Here you would typically process the image or save it
      // For now, we'll just show a success message
      Alert.alert(
        'Photo Captured Successfully!',
        `Document type: ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}\n\nImage has been processed and saved.`,
        [
          { 
            text: 'OK', 
            onPress: () => {
              setShowPreview(false);
              setCapturedImage(null);
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error processing photo:', error);
      Alert.alert('Error', 'Failed to process photo. Please try again.');
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setCapturedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCloseCamera} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Document</Text>
        <TouchableOpacity style={styles.muteButton}>
          <Ionicons name="volume-mute" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Document Type Selector */}
      <View style={styles.documentTypeSelector}>
        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'general' && styles.typeButtonActive]}
          onPress={() => setSelectedType('general')}
        >
          <Text style={[styles.typeButtonText, selectedType === 'general' && styles.typeButtonTextActive]}>
            General
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'math' && styles.typeButtonActive]}
          onPress={() => setSelectedType('math')}
        >
          <Text style={[styles.typeButtonText, selectedType === 'math' && styles.typeButtonTextActive]}>
            Math
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        {permission?.granted ? (
          <TouchableOpacity 
            style={styles.cameraPreview} 
            onPress={handleCameraTap}
            activeOpacity={1}
          >
            <CameraView ref={cameraRef} style={styles.cameraPreview} facing="back" />
          </TouchableOpacity>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraText}>Camera Live View</Text>
            <Text style={styles.cameraSubtext}>Position document within the frame.</Text>
            <TouchableOpacity style={styles.enableButton} onPress={requestPermission}>
              <Text style={styles.enableButtonText}>Enable camera</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Focus Indicator Overlay */}
        <View style={styles.focusIndicatorOverlay}>
          <View style={styles.focusFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.centerDot} />
        </View>
        
        {/* Dynamic Focus Indicator */}
        {showFocusIndicator && focusPoint && (
          <View 
            style={[
              styles.dynamicFocusIndicator,
              {
                left: `${focusPoint.x * 100}%`,
                top: `${focusPoint.y * 100}%`,
                transform: [
                  { translateX: -15 },
                  { translateY: -15 }
                ]
              }
            ]}
          >
            <View style={styles.focusRing} />
          </View>
        )}
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleGallery}>
          <Ionicons name="image" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]} 
          onPress={handleCapture}
          disabled={isCapturing}
        >
          <View style={styles.captureButtonInner}>
            {isCapturing ? (
              <View style={styles.loadingSpinner}>
                <Ionicons name="refresh" size={20} color="#FFFFFF" />
              </View>
            ) : (
              <View style={styles.captureIcon}>
                <Ionicons name="camera" size={24} color="#FFFFFF" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleFocus}>
          <Ionicons name="scan" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Photo Preview Modal */}
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClosePreview}
      >
        <View style={styles.previewOverlay}>
          <View style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <TouchableOpacity onPress={handleClosePreview} style={styles.previewCloseButton}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.previewTitle}>Preview</Text>
              <View style={styles.previewPlaceholder} />
            </View>
            
            <View style={styles.previewImageContainer}>
              <Image source={{ uri: capturedImage }} style={styles.previewImage} />
            </View>
            
            <View style={styles.previewControls}>
              <TouchableOpacity style={styles.previewButton} onPress={handleRetake}>
                <Ionicons name="camera" size={20} color="#FFFFFF" />
                <Text style={styles.previewButtonText}>Retake</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.previewButton} onPress={handleUsePhoto}>
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.previewButtonText}>Use Photo</Text>
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
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#000000',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  muteButton: {
    padding: 8,
  },
  documentTypeSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#1E40AF',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  cameraText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cameraSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  enableButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  enableButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  focusIndicatorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  focusFrame: {
    width: 250,
    height: 200,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#22C55E',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  centerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    top: '50%',
    left: '50%',
    marginTop: -4,
    marginLeft: -4,
  },
  dynamicFocusIndicator: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#22C55E',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#000000',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  loadingSpinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#000000',
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
  },
  previewCloseButton: {
    padding: 8,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  previewPlaceholder: {
    width: 40,
  },
  previewImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#1A1A1A',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;



