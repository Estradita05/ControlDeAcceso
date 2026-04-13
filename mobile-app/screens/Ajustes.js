import React from 'react';
import {
  View, Text, Switch, StyleSheet, TouchableOpacity,
  StatusBar, ScrollView, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { FONTS, SIZES, SHADOWS } from '../theme';
import Header from '../components/Header';

export default function SettingsScreen({ navigation }) {
  const { isDark, toggleTheme, COLORS } = useTheme();

  const st = makeStyles(COLORS);

  const rows = [
    {
      section: 'Apariencia',
      items: [
        {
          label: isDark ? 'Modo Oscuro' : 'Modo Claro',
          icon: isDark ? 'moon' : 'sunny',
          iconColor: isDark ? '#818CF8' : '#F59E0B',
          control: (
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
              thumbColor={isDark ? '#60A5FA' : '#FFFFFF'}
            />
          ),
        },
      ],
    },
    {
      section: 'Cuenta',
      items: [
        {
          label: 'Estado de la cuenta',
          icon: 'shield-checkmark-outline',
          iconColor: COLORS.success,
          control: (
            <View style={[st.badge, { backgroundColor: COLORS.successLight, borderColor: COLORS.success + '40' }]}>
              <Text style={[st.badgeText, { color: COLORS.success }]}>Activa</Text>
            </View>
          ),
        },
        {
          label: 'Historial de acceso',
          icon: 'time-outline',
          iconColor: COLORS.accent,
          control: (
            <View style={[st.badge, { backgroundColor: COLORS.accentGlow, borderColor: COLORS.inputBorder }]}>
              <Text style={[st.badgeText, { color: COLORS.accent }]}>Activo</Text>
            </View>
          ),
        },
      ],
    },
    {
      section: 'Idioma',
      items: [
        {
          label: 'Idioma de la app',
          icon: 'language-outline',
          iconColor: COLORS.textSecondary,
          control: (
            <View style={st.langBox}>
              <Text style={[st.langText, { color: COLORS.text }]}>Español</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
            </View>
          ),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={st.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />
      <Header title="Ajustes" navigation={navigation} />

      <ScrollView contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>
        {rows.map((section, si) => (
          <View key={si} style={st.sectionWrap}>
            <Text style={st.sectionLabel}>
              {section.section.toUpperCase()}
            </Text>
            <View style={st.card}>
              {section.items.map((item, ii) => (
                <View
                  key={ii}
                  style={[
                    st.row,
                    ii < section.items.length - 1 && st.rowBorder,
                  ]}
                >
                  <View style={[st.iconBox, { backgroundColor: item.iconColor + '20' }]}>
                    <Ionicons name={item.icon} size={18} color={item.iconColor} />
                  </View>
                  <Text style={[st.label, { color: COLORS.text }]}>{item.label}</Text>
                  <View style={st.control}>{item.control}</View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Versión */}
        <Text style={st.version}>
          Control de Acceso v1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 20, paddingBottom: 40 },

  sectionWrap: { marginBottom: 20 },
  sectionLabel: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconBox: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  label: { ...FONTS.bodyMedium, flex: 1 },
  control: { alignItems: 'flex-end' },

  badge: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1,
  },
  badgeText: { ...FONTS.caption, fontWeight: '700' },

  langBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  langText: { ...FONTS.subText, fontWeight: '500' },

  version: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 10,
  },
});