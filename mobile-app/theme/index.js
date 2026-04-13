

export const DARK_COLORS = {
  background: '#0A0F1E',
  backgroundLight: '#111827',
  surface: '#151D2E',
  cardBg: '#1A2540',
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  accent: '#60A5FA',
  accentGlow: 'rgba(96, 165, 250, 0.3)',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
  success: '#10B981',
  successLight: 'rgba(16, 185, 129, 0.15)',
  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.15)',
  warning: '#F59E0B',
  inputBg: '#0F172A',
  inputBorder: '#1E3A5F',
  inputBorderFocus: '#3B82F6',
  white: '#FFFFFF',
  black: '#000000',
  border: '#1E293B',
  secondary: '#1E293B', // Agregado para compatibilidad
  overlay: 'rgba(0,0,0,0.5)',
  gradientPrimary: ['#1D4ED8', '#2563EB', '#3B82F6'],
  gradientDark: ['#0A0F1E', '#111827'],
  gradientCard: ['#1A2540', '#0F172A'],
  gradientHeader: ['#0F172A', '#1A2540'],
  gradientSuccess: ['#059669', '#10B981'],
  gradientDanger: ['#B91C1C', '#EF4444'],
  isDark: true,
};

export const LIGHT_COLORS = {
  background: '#F0F6FA',
  backgroundLight: '#FFFFFF',
  surface: '#FFFFFF',
  cardBg: '#EAF3F8',
  primary: '#1D4ED8',
  primaryLight: '#2563EB',
  primaryDark: '#1e40af',
  accent: '#1D4ED8',
  accentGlow: 'rgba(29, 78, 216, 0.15)',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  success: '#059669',
  successLight: 'rgba(5, 150, 105, 0.1)',
  error: '#DC2626',
  errorLight: 'rgba(220, 38, 38, 0.1)',
  warning: '#D97706',
  inputBg: '#FFFFFF',
  inputBorder: '#CBD5E1',
  inputBorderFocus: '#2563EB',
  white: '#FFFFFF',
  black: '#000000',
  border: '#E2E8F0',
  secondary: '#E2E8F0', // Agregado para compatibilidad
  overlay: 'rgba(0,0,0,0.4)',
  gradientPrimary: ['#1D4ED8', '#2563EB', '#3B82F6'],
  gradientDark: ['#DBEAFE', '#EFF6FF'],
  gradientCard: ['#FFFFFF', '#EAF3F8'],
  gradientHeader: ['#1D4ED8', '#2563EB'],
  gradientSuccess: ['#059669', '#10B981'],
  gradientDanger: ['#B91C1C', '#EF4444'],
  isDark: false,
};

export const SIZES = {
  padding: 20,
  borderRadius: 14,
  borderRadiusLg: 22,
  borderRadiusXl: 30,
  logoHeader: 70,
  logoLogin: 110,
  logoSplash: 400,
  headerHeight: 56,
};

export const FONTS = {
  h1: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 16, fontWeight: '400' },
  bodyMedium: { fontSize: 16, fontWeight: '600' },
  subText: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '500' },
  button: { fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
  label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 12,
  },
  glow: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
};

// Exportar colores oscuros como default para compatibilidad con imports existentes
export const COLORS = DARK_COLORS;
