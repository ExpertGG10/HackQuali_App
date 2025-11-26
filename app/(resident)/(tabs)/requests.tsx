import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../../../src/contexts/AuthContext';
import { statusColors, styles } from '../../../src/styles/authStyles';
import { supabase } from '../../../src/supabase';
import { ServiceRequest } from '../../../src/types';

export default function RequestsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const fetchRequests = async () => {
    try {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('residentId', user.id)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
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

  const renderRequestItem = (request: ServiceRequest) => (
    <TouchableOpacity
      key={request.id}
      style={styles.card}
      onPress={() => router.push(`/(resident)/(tabs)/requests/${request.id}`)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4, color: styles.text }}>
            {request.title}
          </Text>
          <Text style={{ fontSize: 12, color: styles.textSecondary, marginBottom: 8 }}>
            {request.description?.substring(0, 60)}...
          </Text>
        </View>
        <View
          style={{
            backgroundColor: statusColors[request.status] || '#ccc',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            marginLeft: 8,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: '600', color: 'white' }}>
            {getStatusLabel(request.status)}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={{ fontSize: 11, color: styles.textSecondary }}>
          {new Date(request.createdAt).toLocaleDateString()}
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
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <TouchableOpacity
          style={{
            backgroundColor: styles.colors.primary,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => router.push('/(resident)/(tabs)/requests/new')}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
            + Nova Solicitação
          </Text>
        </TouchableOpacity>
      </View>

      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={({ item }) => renderRequestItem(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
          <FontAwesome name="inbox" size={48} color={styles.textSecondary} />
          <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: styles.text }}>
            Nenhuma solicitação
          </Text>
          <Text style={{ marginTop: 8, fontSize: 12, color: styles.textSecondary }}>
            Crie sua primeira solicitação de manutenção
          </Text>
        </View>
      )}
    </View>
  );
}
