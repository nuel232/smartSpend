// app/wallet-balance.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  Platform,
  StatusBar
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

interface WalletBalanceScreenProps {
  currency: string;
  symbol: string;
}

const WalletBalanceScreen = ({ currency, symbol }: WalletBalanceScreenProps) => {
  const router = useRouter();
  const { setWalletBalance } = useAuth();
  const [balance, setBalance] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNumberPress = (number: string) => {
    setBalance((prev) => {
      if (prev.length >= 10) return prev;
      
      if (number === '.') {
        if (!prev.includes('.')) return prev + number;
        return prev;
      }
      
      if (prev.includes('.')) {
        const [, decimal] = prev.split('.');
        if (decimal?.length >= 2) return prev;
      }
      
      return prev + number;
    });
  };

  const handleDelete = () => {
    setBalance(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const numBalance = parseFloat(balance);
    if (balance && numBalance > 0) {
      setWalletBalance(numBalance);
      router.push('/SuccessScreen');
    }
  };

  const formatBalance = (value: string) => {
    return `₦${parseInt(value).toLocaleString()}`;
  };

  const numberPadButtons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', 'del'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Link href=".." style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Link>
      
      <View style={styles.content}>
        <Text style={styles.title}>Enter Your Wallet Balance</Text>
        <Text style={styles.label}>{currency}</Text>
        
        <TouchableOpacity 
          style={[styles.input, balance && styles.inputActive]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.inputText,
            !balance && styles.inputTextPlaceholder
          ]}>
            {balance ? formatBalance(balance) : 'Tap to enter balance'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalBalance}>
                {formatBalance(balance) || `${symbol}0`}
              </Text>
            </View>
            
            <View style={styles.numberPad}>
              {numberPadButtons.map((btn) => (
                <TouchableOpacity
                  key={btn}
                  style={[
                    styles.numberButton,
                    btn === 'del' && styles.deleteButton
                  ]}
                  onPress={() => btn === 'del' ? handleDelete() : handleNumberPress(btn)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.numberText,
                    btn === 'del' && styles.deleteButtonText
                  ]}>
                    {btn === 'del' ? '⌫' : btn}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !balance && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!balance}
              activeOpacity={0.8}
            >
              <Text style={styles.submitText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  inputActive: {
    borderColor: '#4CAF50',
  },
  inputText: {
    color: '#fff',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalBalance: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  numberButton: {
    width: '30%',
    height: 70,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 35,
  },
  deleteButton: {
    backgroundColor: '#333',
  },
  numberText: {
    color: '#fff',
    fontSize: 24,
  },
  submitButton: {
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#1a1a1a',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: Platform.OS === 'ios' ? '#1a1a1a' : '#fff',
    color: Platform.OS === 'ios' ? '#fff' : '#000',
  },
  pickerIOS: {
    height: 150,
  },
  backButton: {
    padding: 20,
    paddingBottom: 0,
  },
});

export default WalletBalanceScreen;