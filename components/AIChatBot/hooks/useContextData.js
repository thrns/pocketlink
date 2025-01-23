import { useItems } from '@/app/contexts/ItemsContext';
import { useShop } from '@/app/contexts/ShopContext';
import { useExternalProduct } from '@/app/contexts/ExternalProductContext';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';
import { useAudience } from '@/app/contexts/AudienceContext';
import { useAgent } from '@/app/contexts/AgentContext';
import { useAIBuilder } from '@/app/contexts/AIBuilderContext';
import { useTemplates } from '@/app/contexts/TemplatesContext';
import { useCalendar } from '@/app/contexts/CalendarContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useController } from '@/app/contexts/ControllerContext';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * Custom hook to safely access all required context data in a single place
 */
export const useContextData = () => {
  // Initialize all context data
  let items = [];
  let shopProducts = [];
  let externalProducts = [];
  let analyticsData = {};
  let audiences = [];
  let calendarEvents = [];
  let bookings = [];
  let templates = [];
  let agents = [];
  let user = null;
  let currentItemId = null;

  // Safely access each context
  try {
    const itemsData = useItems() || {};
    items = itemsData.items || [];
    currentItemId = itemsData.currentItemId;
  } catch (e) {
    console.error('Error accessing Items context:', e);
  }

  try {
    const shopData = useShop() || {};
    shopProducts = shopData.products || [];
  } catch (e) {
    console.error('Error accessing Shop context:', e);
  }

  try {
    const externalData = useExternalProduct() || {};
    externalProducts = externalData.externalProducts || [];
  } catch (e) {
    console.error('Error accessing External Product context:', e);
  }

  try {
    const analytics = useAnalytics() || {};
    analyticsData = analytics.analyticsData || {};
  } catch (e) {
    console.error('Error accessing Analytics context:', e);
  }

  try {
    const audienceData = useAudience() || {};
    audiences = audienceData.audiences || [];
  } catch (e) {
    console.error('Error accessing Audience context:', e);
  }

  try {
    const calendarData = useCalendar() || {};
    calendarEvents = calendarData.events || [];
    bookings = calendarData.bookings || [];
  } catch (e) {
    console.error('Error accessing Calendar context:', e);
  }

  try {
    const templatesData = useTemplates() || {};
    templates = templatesData.templates || [];
  } catch (e) {
    console.error('Error accessing Templates context:', e);
  }

  try {
    const agentData = useAgent() || {};
    agents = agentData.agents || [];
  } catch (e) {
    console.error('Error accessing Agent context:', e);
  }

  try {
    const authData = useAuth() || {};
    user = authData.user;
  } catch (e) {
    console.error('Error accessing Auth context:', e);
  }

  return {
    items,
    shopProducts,
    externalProducts,
    analyticsData,
    audiences,
    calendarEvents,
    bookings,
    templates,
    agents,
    user,
    currentItemId,
  };
};

export default useContextData;
