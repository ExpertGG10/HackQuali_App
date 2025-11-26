import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../../src/contexts/AuthContext';
import { colors, styles } from '../../../src/styles/authStyles';

export default function ContractorProfileScreen() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    Alert.alert('Desconectar', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
      {
        text: 'Desconectar',
        onPress: async () => {
          try {
            await logout();
            router.replace('/(auth)/login');
          } catch (err) {
            Alert.alert('Erro', 'Falha ao desconectar');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <FontAwesome name="building" size={24} color="white" />
        </View>
        <Text style={styles.headerTitle}>{user?.name}</Text>
        <Text style={styles.headerSubtitle}>{user?.email}</Text>
      </View>

      {/* Company Information */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: colors.text }}>
          Informações da Empresa
        </Text>
        <View style={styles.card}>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>Responsável</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
              {user?.name}
            </Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>Email</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
              {user?.email}
            </Text>
          </View>
          {user?.phone && (
            <View>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>Telefone</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {user.phone}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Actions */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <TouchableOpacity
          style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <FontAwesome name="lock" size={20} color={colors.primary} />
          <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '600', color: colors.text }}>
            Alterar Senha
          </Text>
          <FontAwesome
            name="chevron-right"
            size={16}
            color={colors.textSecondary}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <FontAwesome name="cog" size={20} color={colors.primary} />
          <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '600', color: colors.text }}>
            Configurações da Empresa
          </Text>
          <FontAwesome
            name="chevron-right"
            size={16}
            color={colors.textSecondary}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <FontAwesome name="question-circle" size={20} color={colors.primary} />
          <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '600', color: colors.text }}>
            Ajuda e Suporte
          </Text>
          <FontAwesome
            name="chevron-right"
            size={16}
            color={colors.textSecondary}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={{ paddingHorizontal: 16, marginBottom: 40 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.danger,
            padding: 14,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
              Desconectar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
