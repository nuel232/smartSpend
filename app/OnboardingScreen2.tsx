import React from 'react';
import { Image } from 'react-native';
import OnboardingScreen from './OnboardingScreen';

const OnboardingScreen2 = ({ onNext }) => {
  return (
    <OnboardingScreen
      title="Onboarding 2"
      description="Budgeting Made Simple"
      imageSource={require('../assets/images/Screenshot 2025-01-28 140006.png')}
      onNext={onNext}
    />
  );
};

export default OnboardingScreen2; 