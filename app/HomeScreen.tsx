// app/index.tsx
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { 
  FlatList,
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';

// Types
interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}

interface TransactionGroup {
  title: string;
  date: string;
  data: Transaction[];
}

const transactions: Transaction[] = [
  { 
    id: '1', 
    type: 'Business', 
    description: 'Food Sales', 
    amount: 120000,
    date: '04 April 2024'
  },
  { 
    id: '2', 
    type: 'Vehicle', 
    description: 'Oil Change', 
    amount: -50000,
    date: '04 April 2024'
  },
];

const formatCurrency = (amount: number): string => {
  return `₦ ${Math.abs(amount).toLocaleString()}`;
};

const HomeScreen = () => {
  const router = useRouter();
  const { logout, walletBalance } = useAuth();

  const groupTransactionsByDate = (transactions: Transaction[]): TransactionGroup[] => {
    const today = new Date();
    const groups: { [key: string]: Transaction[] } = {};
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      let title = '';
      
      if (transactionDate.toDateString() === today.toDateString()) {
        title = 'Today';
      } else {
        title = 'Yesterday';
      }
      
      if (!groups[title]) {
        groups[title] = [];
      }
      groups[title].push(transaction);
    });

    return Object.keys(groups).map(title => ({
      title,
      date: groups[title][0].date,
      data: groups[title]
    }));
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.transactionTypeContainer,
          { backgroundColor: item.amount > 0 ? '#1E3329' : '#332020' }
        ]}>
          <Text style={styles.transactionType}>{item.type}</Text>
        </View>
        <Text style={styles.transactionDescription}>{item.description}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.amount > 0 ? '#4CAF50' : '#FF5252' }
      ]}>
        {item.amount > 0 ? '+' : ''}{formatCurrency(item.amount)}
      </Text>
    </View>
  );

  const renderTransactionGroup = ({ item }: { item: TransactionGroup }) => (
    <View style={styles.transactionGroup}>
      <View style={styles.transactionGroupHeader}>
        <Text style={styles.transactionGroupTitle}>{item.title}</Text>
        <Text style={styles.transactionGroupDate}>{item.date}</Text>
      </View>
      {item.data.map((transaction) => (
        <View key={transaction.id}>
          {renderTransaction({ item: transaction })}
        </View>
      ))}
    </View>
  );

  const handleLogout = () => {
    logout();
    router.push('/LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Net Balance</Text>
          <Text style={styles.balanceAmount}>
            {formatCurrency(walletBalance)}
          </Text>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity 
              onPress={() => router.push('/TransactionScreen')}
              style={styles.seeMoreButton}
            >
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
              </View>
              <Text 
                style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#4CAF50' : '#FF5252' }
                ]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
  },
  balanceCard: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  balanceLabel: {
    color: '#888',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    marginTop: 8,
  },
  transactionsContainer: {
    padding: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  seeMoreButton: {
    padding: 8,
  },
  seeMoreText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  transactionType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDesc: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;