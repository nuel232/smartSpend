// app/transaction.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  icon: string;
  color: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'Business',
    description: 'Store Checked',
    amount: -444500,
    icon: '🏪',
    color: '#4CAF50'
  },
  {
    id: '2',
    type: 'Food',
    description: 'A Piece of Burger',
    amount: -45000,
    icon: '🍔',
    color: '#FFA726'
  },
  {
    id: '3',
    type: 'Service',
    description: 'Oil Change',
    amount: -374450,
    icon: '🔧',
    color: '#29B6F6'
  }
];

const TransactionScreen = () => {
  const router = useRouter();
  const netBalance = 313500;
  
  const renderDateFilter = () => {
    const dates = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dateFilter}
      >
        {dates.map((date, index) => (
          <TouchableOpacity 
            key={date}
            style={[
              styles.dateItem,
              index === 0 && styles.activeDateItem
            ]}
          >
            <Text style={[
              styles.dateText,
              index === 0 && styles.activeDateText
            ]}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderTransaction = (transaction: Transaction) => (
    <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: transaction.color }]}>
        <Text style={styles.icon}>{transaction.icon}</Text>
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
        <Text style={styles.transactionAmount}>
          {transaction.amount.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Transaction Recap</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Text>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderDateFilter()}
      </View>

      <ScrollView>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Net Balance</Text>
          <Text style={styles.balance}>
            ₦ {netBalance.toLocaleString()}
          </Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={styles.balanceButtonText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={styles.balanceButtonText}>Expense</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transactionList}>
          <Text style={styles.listTitle}>Transaction List</Text>
          {transactions.map(renderTransaction)}
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.chartContainer}>
            <View style={styles.placeholderChart} />
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.legendText}>Business</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FFA726' }]} />
                <Text style={styles.legendText}>Food</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#29B6F6' }]} />
                <Text style={styles.legendText}>Service</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.addButton]}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>💰</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
    header: {
      paddingTop: 20,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    backButton: {
      color: '#fff',
      fontSize: 24,
    },
    title: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 15,
    },
    headerButton: {
      padding: 5,
    },
    dateFilter: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    dateItem: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginRight: 10,
      borderRadius: 20,
      backgroundColor: '#1A1A1A',
    },
    activeDateItem: {
      backgroundColor: '#4CAF50',
    },
    dateText: {
      color: '#fff',
      fontSize: 14,
    },
    activeDateText: {
      fontWeight: 'bold',
    },
    balanceCard: {
      margin: 20,
      padding: 20,
      backgroundColor: '#1A1A1A',
      borderRadius: 15,
    },
    balanceLabel: {
      color: '#666',
      marginBottom: 5,
    },
    balance: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    balanceActions: {
      flexDirection: 'row',
      gap: 10,
    },
    balanceButton: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: '#333',
      borderRadius: 8,
      alignItems: 'center',
    },
    balanceButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    transactionList: {
      paddingHorizontal: 20,
    },
    listTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#1A1A1A',
      borderRadius: 12,
      marginBottom: 10,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    icon: {
      fontSize: 20,
    },
    transactionInfo: {
      flex: 1,
    },
    transactionDescription: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 4,
    },
    transactionAmount: {
      color: '#FF5252',
      fontSize: 14,
    },
    categoriesSection: {
      padding: 20,
    },
    categoriesTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    chartContainer: {
      backgroundColor: '#1A1A1A',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
    },
    placeholderChart: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#4CAF50',
      marginBottom: 20,
    },
    legend: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 5,
    },
    legendText: {
      color: '#fff',
      fontSize: 12,
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#1A1A1A',
      paddingVertical: 15,
      paddingBottom: 30,
    },
    tabItem: {
      alignItems: 'center',
    },
    tabIcon: {
      fontSize: 24,
    },
    addButton: {
      backgroundColor: '#4CAF50',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -25,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
  
  export default TransactionScreen;