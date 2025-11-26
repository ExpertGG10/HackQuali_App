import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View
} from 'react-native';
import { useAuth } from '../../../src/contexts/AuthContext';
import { styles } from '../../../src/styles/authStyles';
import { supabase } from '../../../src/supabase';
import { Appointment } from '../../../src/types';

export default function AppointmentsScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    try {
      if (!user?.id) return;

      // Fetch appointments for service requests of the resident
      const { data, error } = await supabase
        .from('appointments')
        .select(
          `
          *,
          service_requests(residentId)
        `
        )
        .eq('service_requests.residentId', user.id)
        .order('scheduledDate', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  const formatDate = (date: string, time: string) => {
    const d = new Date(date);
    return `${d.toLocaleDateString('pt-BR')} às ${time}`;
  };

  const renderAppointmentItem = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <FontAwesome name="calendar" size={16} color={styles.colors.primary} />
        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '600', color: styles.text }}>
          {formatDate(appointment.scheduledDate, appointment.scheduledTime)}
        </Text>
      </View>
      <Text style={{ fontSize: 12, color: styles.textSecondary, marginBottom: 8 }}>
        Duração: {appointment.duration} minutos
      </Text>
      {appointment.notes && (
        <Text style={{ fontSize: 12, color: styles.textSecondary }}>
          Notas: {appointment.notes}
        </Text>
      )}
      <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: styles.border }}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color:
              appointment.status === 'confirmed'
                ? styles.colors.success
                : styles.colors.secondary,
          }}
        >
          Status: {appointment.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
        </Text>
      </View>
    </View>
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
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={({ item }) => renderAppointmentItem(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
          <FontAwesome name="calendar-o" size={48} color={styles.textSecondary} />
          <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: styles.text }}>
            Nenhum agendamento
          </Text>
          <Text style={{ marginTop: 8, fontSize: 12, color: styles.textSecondary }}>
            Seus agendamentos aparecerão aqui
          </Text>
        </View>
      )}
    </View>
  );
}
