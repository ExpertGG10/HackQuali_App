import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../../src/contexts/AuthContext';
import { statusColors, styles } from '../../../src/styles/authStyles';
import { supabase } from '../../../src/supabase';
import { ServiceRequest } from '../../../src/types';

export default function ContractorTicketsScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tickets, setTickets] = useState<ServiceRequest[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const fetchTickets = async () => {
    try {
      if (!user?.id) return;

      let query = supabase
        .from('service_requests')
        .select('*')
        .order('createdAt', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTickets(data || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user?.id, filter]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTickets();
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      open: 'Aberta',
      assigned: 'Atribuída',
      in_progress: 'Em Progresso',
      completed: 'Concluída',
      closed: 'Fechada',
      cancelled: 'Cancelada',
    };
    return labels[status] || status;
  };

  const filterButtons = [
    { label: 'Todos', value: 'all' },
    { label: 'Abertos', value: 'open' },
    { label: 'Em Progresso', value: 'in_progress' },
    { label: 'Concluídos', value: 'completed' },
  ];

  const renderTicketItem = (ticket: ServiceRequest) => (
    <TouchableOpacity key={ticket.id} style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4, color: styles.text }}>
            {ticket.title}
          </Text>
          <Text style={{ fontSize: 12, color: styles.textSecondary, marginBottom: 8 }}>
            {ticket.description?.substring(0, 60)}...
          </Text>
        </View>
        <View
          style={{
            backgroundColor: statusColors[ticket.status] || '#ccc',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            marginLeft: 8,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: '600', color: 'white' }}>
            {getStatusLabel(ticket.status)}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={{ fontSize: 11, color: styles.textSecondary }}>
          {new Date(ticket.createdAt).toLocaleDateString()}
        </Text>
        <FontAwesome name="chevron-right" size={14} color={styles.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={styles.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 16, paddingTop: 12, marginBottom: 12 }}
      >
        {filterButtons.map((btn) => (
          <TouchableOpacity
            key={btn.value}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: filter === btn.value ? styles.colors.primary : styles.border,
              marginRight: 8,
            }}
            onPress={() => setFilter(btn.value)}
          >
            <Text
              style={{
                color: filter === btn.value ? 'white' : styles.text,
                fontWeight: '600',
                fontSize: 12,
              }}
            >
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tickets List */}
      {tickets.length > 0 ? (
        <FlatList
          data={tickets}
          renderItem={({ item }) => renderTicketItem(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
          <FontAwesome name="inbox" size={48} color={styles.textSecondary} />
          <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: styles.text }}>
            Nenhum chamado
          </Text>
          <Text style={{ marginTop: 8, fontSize: 12, color: styles.textSecondary }}>
            Não há chamados com esse filtro
          </Text>
        </View>
      )}
    </View>
  );
}
