import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SuccessScreen = () => {
  const router = useRouter();
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const buttonFadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Scale and fade in checkmark
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 5,
          friction: 2,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Fade in button after checkmark animation
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleContinue = () => {
    // Fade out animation before navigation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/HomeScreen');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Link href=".." style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Link>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.moneyIcon}>💰</Text>
        <Text style={styles.title}>Wallet Created Successfully!</Text>
        <Text style={styles.subtitle}>Your digital wallet is ready to use</Text>
      </Animated.View>

      <Animated.View style={{ opacity: buttonFadeAnim }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  icon: {
    fontSize: 80,
    marginBottom: 10,
  },
  moneyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});

export default SuccessScreen;