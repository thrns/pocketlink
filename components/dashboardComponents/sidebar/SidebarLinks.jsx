import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPeopleGroup } from 'react-icons/fa6';
import { CiDiscount1 } from 'react-icons/ci';
import { useController } from '@/app/contexts/ControllerContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { FEATURES } from '@/constants/features';
import {
  ChevronRight,
  File,
  LayoutDashboard,
  PieChart,
  ShoppingCart,
  Settings,
  Home,
  Edit2Icon,
  Link2,
  Globe,
  BicepsFlexed,
  ShoppingBag,
  Ticket,
  Megaphone,
  RadioTower,
  Workflow,
  Calendar1,
  CalendarCheck,
  CalendarDays,
  ContainerIcon,
  WorkflowIcon,
  Instagram,
  Youtube,
  Mail,
  Link2Off,
  Bot,
  Cog,
  UserCog,
  CreditCard,
  Crown,
  EyeIcon,
  List,
  MessageSquare,
  FileText,
  Cable,
  Palette,
} from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import {
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const premiumFeatures = ['Sales Bot', 'Analytics', 'Traffic Analytics'];

export function SidebarLinks() {
  const pathname = usePathname();
  const { setOpen } = useController();
  const { user } = useAuth();
  const { canAccessFeature } = useSubscription();
  const isMobile = useIsMobile();
  const [openGroup, setOpenGroup] = useState('');
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  // Function to check if a path is active
  const isActive = useCallback((path) => path === pathname, [pathname]);

  // Function to handle link clicks and close sidebar on mobile only
  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // Toggle submenu with animation
  const toggleGroup = (groupName) => {
    setOpenGroup((prev) => (prev === groupName ? '' : groupName));
  };

  // Update submenu heights when opened
  useEffect(() => {
    if (openGroup !== '') {
      const key = openGroup;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openGroup]);

  // Set initial open group based on current path
  useEffect(() => {
    if (pathname === '/dashboard' || pathname.startsWith('/dashboard/theme') || pathname.startsWith('/dashboard/templates')) {
      setOpenGroup('home');
    } else if (pathname.startsWith('/dashboard/analytics')) {
      setOpenGroup('analytics');
    } else if (pathname.startsWith('/dashboard/marketing')) {
      setOpenGroup('marketing');
    } else if (pathname.startsWith('/dashboard/automation')) {
      setOpenGroup('automation');
    } else if (pathname.startsWith('/dashboard/social-analytics')) {
      setOpenGroup('social-analytics');
    } else if (pathname.startsWith('/dashboard/shop')) {
      setOpenGroup('shop');
    } else if (pathname.startsWith('/dashboard/calendar')) {
      setOpenGroup('calendar');
    } else if (pathname.startsWith('/dashboard/settings')) {
      setOpenGroup('settings');
    }
  }, [pathname]);

  // Parent menu item classes - adapted from first snippet's sizing
  const menuItemBaseClass =
    'flex items-center w-full px-4 py-2.5 rounded-md transition-all duration-200 ease-in-out text-sm';
  const menuItemActiveClass = 'bg-white text-bento-violet  font-medium';
  const menuItemInactiveClass = 'text-gray-700';

  // Submenu item classes - adapted with spacing from first snippet
  const submenuItemClass = 'pl-9 py-2 text-sm '; // Adjusted to match first snippet spacing
  const submenuActiveClass = 'bg-white text-bento-violet font-medium';
  const submenuInactiveClass = 'text-gray-700 bg-gray-50';

  // Submenu container class for animation
  const submenuContainerClass =
    'overflow-hidden transition-all duration-300 ease-in-out';

  // Badge styles - adapted from first snippet
  const proBadgeClass =
    'ml-auto text-xs font-semibold text-bento-violet bg-bento-white px-2 py-1 rounded';
  const comingSoonBadgeClass =
    'ml-auto text-[10px] font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-1.5 py-0.5 rounded-full';
  const betaBadgeClass =
    'ml-auto text-xs font-semibold text-bento-violet bg-bento-white border rounded-lg  px-2 py-1 rounded';
  const newBadgeClass =
    'text-xs font-semibold text-bento-violet bg-bento-white px-2 py-1 rounded mr-1';

  return (
    <SidebarMenu className="space-y-2 px-2 text-gray-700">
      {/* Home Group - Contains Edit, Theme, Templates */}
      <div className="mb-3">
        <div className="menu-item">
          <button
            onClick={() => toggleGroup('home')}
            className={`${menuItemBaseClass} ${
              openGroup === 'home'
                ? menuItemActiveClass
                : menuItemInactiveClass
            } group justify-between`}
          >
            <span className="flex items-center">
              <Home className="mr-3 h-5 w-5" />
              <span>Home</span>
            </span>
            <div className="flex items-center">
              <ChevronRight
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                  openGroup === 'home' ? 'rotate-90 text-bento-violet' : ''
                }`}
              />
            </div>
          </button>
        </div>
        <div
          ref={(el) => {
            subMenuRefs.current['home'] = el;
          }}
          className={submenuContainerClass}
          style={{
            height:
              openGroup === 'home'
                ? `${subMenuHeight['home']}px`
                : '0px',
          }}
        >
          <div className="space-y-2 py-1 pl-2">
            <Link
              href="/dashboard"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <Edit2Icon size={16} className="mr-3" />
              <span>Edit</span>
            </Link>

            <Link
              href="/dashboard/theme"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/theme')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <Palette size={16} className="mr-3" />
              <span>Theme</span>
            </Link>

            <Link
              href="/dashboard/templates"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/templates')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <FileText size={16} className="mr-3" />
              <span>Templates</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="mb-3">
        <div className="menu-item tour-sidebar-analytics">
          <button
            onClick={() => toggleGroup('analytics')}
            className={`${menuItemBaseClass} ${
              openGroup === 'analytics'
                ? menuItemActiveClass
                : menuItemInactiveClass
            } tour-menu-analytics group justify-between`}
          >
            <span className="flex items-center">
              <PieChart className="mr-3 h-5 w-5" />
              <span>Analytics</span>
            </span>
            <div className="flex items-center">
              <ChevronRight
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                  openGroup === 'analytics' ? 'rotate-90 text-bento-violet' : ''
                }`}
              />
            </div>
          </button>
        </div>
        <div
          ref={(el) => {
            subMenuRefs.current['analytics'] = el;
          }}
          className={submenuContainerClass}
          style={{
            height:
              openGroup === 'analytics'
                ? `${subMenuHeight['analytics']}px`
                : '0px',
          }}
        >
          <div className="space-y-2 py-1">
            <Link
              href="/dashboard/analytics?preview=true"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/analytics')
                  ? submenuActiveClass
                  : submenuInactiveClass
              } tour-menu-analytics-traffic`}
            >
              <Globe size={16} className="mr-3" />
              <span>Traffic</span>
              {!canAccessFeature(FEATURES.ADVANCED_ANALYTICS) && (
                <Crown className="ml-auto h-3 w-3 fill-purple-400 text-purple-400" />
              )}
            </Link>

            <Link
              href="/dashboard/analytics/performance?preview=true"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/analytics/performance')
                  ? submenuActiveClass
                  : submenuInactiveClass
              } tour-sidebar-performance`}
            >
              <BicepsFlexed size={16} className="mr-3" />
              <span>Performance</span>
              {!canAccessFeature(FEATURES.ADVANCED_ANALYTICS) && (
                <Crown className="ml-auto h-3 w-3 fill-purple-400 text-purple-400" />
              )}
            </Link>

            <button
              disabled
              className={`${menuItemBaseClass} ${submenuItemClass} cursor-not-allowed opacity-60`}
            >
              <ShoppingBag size={16} className="mr-3" />
              <span>Sales</span>
              <span className={comingSoonBadgeClass}>Soon</span>
            </button>
          </div>
        </div>
      </div>



      {/* Subscribers - New standalone menu item */}
      <div className="mb-3">
        <Link
          href="/dashboard/subscriptions"
          passHref
          onClick={handleLinkClick}
          className={`${menuItemBaseClass} ${
            isActive('/dashboard/subscriptions')
              ? menuItemActiveClass
              : menuItemInactiveClass
          }`}
        >
          <FaPeopleGroup className="mr-3 h-5 w-5" />
          <span>Subscriptions</span>
          <div className="ml-auto flex items-center">
            {!canAccessFeature(FEATURES.PAID_SUBSCRIPTIONS) && (
              <Crown className="mr-1 h-3 w-3 fill-purple-400 text-purple-400" />
            )}
          </div>
        </Link>
      </div>

      {/* Marketing / Audience */}
      <div className="mb-3">
        <div className="menu-item">
          <button
            onClick={() => toggleGroup('marketing')}
            className={`${menuItemBaseClass} ${
              openGroup === 'marketing'
                ? menuItemActiveClass
                : menuItemInactiveClass
            } group justify-between`}
          >
            <span className="flex items-center">
              <Megaphone className="mr-3 h-5 w-5" />
              <span>Marketing</span>
            </span>
            <div className="flex items-center">
              <ChevronRight
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                  openGroup === 'marketing' ? 'rotate-90 text-bento-violet' : ''
                }`}
              />
            </div>
          </button>
        </div>
        <div
          ref={(el) => {
            subMenuRefs.current['marketing'] = el;
          }}
          className={submenuContainerClass}
          style={{
            height:
              openGroup === 'marketing'
                ? `${subMenuHeight['marketing']}px`
                : '0px',
          }}
        >
          <div className="space-y-2 py-1 pl-2">
            <Link
              href="/dashboard/marketing"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/marketing')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <EyeIcon size={16} className="mr-3" />
              <span>Overview</span>
              {!canAccessFeature(FEATURES.EMAIL_MARKETING) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>

            <Link
              href="/dashboard/marketing/lists"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/marketing/lists')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <List size={16} className="mr-3" />
              <span>Lists</span>
              {!canAccessFeature(FEATURES.EMAIL_MARKETING) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>

            <Link
              href="/dashboard/marketing/campaigns"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/marketing/campaigns')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <MessageSquare size={16} className="mr-3" />
              <span>Campaigns</span>
              {!canAccessFeature(FEATURES.EMAIL_MARKETING) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>

            <Link
              href="/dashboard/marketing/templates"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/marketing/templates')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <FileText size={16} className="mr-3" />
              <span>Templates</span>
              {!canAccessFeature(FEATURES.EMAIL_MARKETING) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Automation */}
      <div className="mb-3">
        <div className="menu-item">
          <button
            onClick={() => toggleGroup('automation')}
            className={`${menuItemBaseClass} ${
              openGroup === 'automation'
                ? menuItemActiveClass
                : menuItemInactiveClass
            } group justify-between`}
          >
            <span className="flex items-center">
              <Workflow className="mr-3 h-5 w-5" />
              <span>Automation</span>
            </span>
            <div className="flex items-center">
              <ChevronRight
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                  openGroup === 'automation' ? 'rotate-90 text-bento-violet' : ''
                }`}
              />
            </div>
          </button>
        </div>
        <div
          ref={(el) => {
            subMenuRefs.current['automation'] = el;
          }}
          className={submenuContainerClass}
          style={{
            height:
              openGroup === 'automation'
                ? `${subMenuHeight['automation']}px`
                : '0px',
          }}
        >
          <div className="space-y-2 py-1 pl-2">
            <Link
              href="/dashboard/sales-bot"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                pathname.startsWith('/dashboard/sales-bot')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <Bot size={16} className="mr-3" />
              <span>Chatbot</span>
              {!canAccessFeature(FEATURES.SALES_BOT) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>

            <button
              disabled
              className={`${menuItemBaseClass} ${submenuItemClass} cursor-not-allowed opacity-60`}
            >
              <MessageSquare size={16} className="mr-3" />
              <span className='text-left'>Auto DMs</span>
              <span className={comingSoonBadgeClass}>Soon</span>
            </button>

            <button
              disabled
              className={`${menuItemBaseClass} ${submenuItemClass} cursor-not-allowed opacity-60`}
            >
              <MessageSquare size={16} className="mr-3" />
              <span className='text-left'>Auto Comments</span>
              <span className={comingSoonBadgeClass}>Soon</span>
            </button>

            <button
              disabled
              className={`${menuItemBaseClass} ${submenuItemClass} cursor-not-allowed opacity-60`}
            >
              <Megaphone size={16} className="mr-3" />
              <span className='text-left'>Lead Magnets</span>
              <span className={comingSoonBadgeClass}>Soon</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Gateway */}
      {/* <div className="mb-3">
        <Link
          href="/dashboard/payment-gateway"
          passHref
          className={`${menuItemBaseClass} ${
            pathname.startsWith("/dashboard/payment-gateway")
              ? menuItemActiveClass
              : menuItemInactiveClass
          }`}
        >
          <Bot className="mr-3 h-5 w-5" />
          <span>Payment Gateway</span>
          <span className={comingSoonBadgeClass}>Soon</span>
        </Link>
      </div> */}

      {/* Products / Shop */}
      <div className="tour-sidebar-products mb-3">
        <div className="menu-item">
          <button
            onClick={() => toggleGroup('shop')}
            className={`${menuItemBaseClass} ${
              openGroup === 'shop' ? menuItemActiveClass : menuItemInactiveClass
            } group justify-between`}
          >
            <span className="flex items-center">
              <ShoppingCart className="mr-3 h-5 w-5" />
              <span>Shop</span>
            </span>
            <ChevronRight
              className={`h-5 w-5 transition-transform duration-200 ${
                openGroup === 'shop' ? 'rotate-90 text-bento-violet' : ''
              }`}
            />
          </button>
        </div>
        <div
          ref={(el) => {
            subMenuRefs.current['shop'] = el;
          }}
          className={submenuContainerClass}
          style={{
            height: openGroup === 'shop' ? `${subMenuHeight['shop']}px` : '0px',
          }}
        >
          <div className="space-y-2 py-1 pl-2">
            <Link
              href="/dashboard/shop"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/shop')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <ShoppingBag size={16} className="mr-3" />
              <span>Purchases</span>
              {!canAccessFeature(FEATURES.ECOMMERCE_SHOP) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>

            <Link
              href="/dashboard/shop/inventory"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/shop/inventory')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <ContainerIcon size={16} className="mr-3" />
              <span>Inventory</span>
              {!canAccessFeature(FEATURES.ECOMMERCE_SHOP) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>

            <Link
              href="/dashboard/shop/discounts"
              passHref
              onClick={handleLinkClick}
              className={`${menuItemBaseClass} ${submenuItemClass} ${
                isActive('/dashboard/shop/discounts')
                  ? submenuActiveClass
                  : submenuInactiveClass
              }`}
            >
              <CiDiscount1 size={16} className="mr-3" />
              <span>Discounts</span>
              {!canAccessFeature(FEATURES.ECOMMERCE_SHOP) && (
                <Crown className="ml-auto h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Integrations - New standalone menu item */}
      <div className="tour-sidebar-integrations mb-3">
        <Link
          href="/dashboard/integrations"
          passHref
          onClick={handleLinkClick}
          className={`${menuItemBaseClass} ${
            isActive('/dashboard/integrations')
              ? menuItemActiveClass
              : menuItemInactiveClass
          }`}
        >
          <Cable className="mr-3 h-5 w-5" />
          <span>Integrations</span>
        </Link>
      </div>

    
    </SidebarMenu>
  );
}
