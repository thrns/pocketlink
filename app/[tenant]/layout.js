import { ItemsProvider } from '@/app/contexts/ItemsContext';
import { ControllerProvider } from '@/app/contexts/ControllerContext';
import { ShopProvider } from '../contexts/ShopContext';
import { ExternalProductProvider } from '../contexts/ExternalProductContext';
import { CartProvider } from '../contexts/CartContext';
import { CheckoutProvider } from '../contexts/CheckoutContext';
import Cart from './components/Cart';
import { CheckoutAuthProvider } from '../contexts/CheckoutAuthContext';
import { FetchProvider } from '../contexts/FetcherContext';
import { SalesBotChatProvider } from '../contexts/SalesBotChatContext';
import SalesBot from './components/SalesBot/SalesBot';
import { PaymentGatewayProvider } from '../contexts/PaymentGatewayContext';

export default async function TenantLayout({ children, params }) {
  const { tenant } = await params;

  return (
    <>
      <ControllerProvider>
        <ItemsProvider>
          <FetchProvider>
            <PaymentGatewayProvider>
              <ShopProvider>
                <ExternalProductProvider>
                  <CartProvider>
                    <CheckoutAuthProvider>
                      <CheckoutProvider>
                        {/* Force tenantUsername to a string value for testing if needed */}
                        <SalesBotChatProvider tenantUsername={tenant}>
                          <div className="relative w-full">
                            <Cart />
                            {children}
                            {/* Add key prop to force re-render */}

                            <SalesBot key={`sales-bot-${tenant}`} />
                          </div>
                        </SalesBotChatProvider>
                      </CheckoutProvider>
                    </CheckoutAuthProvider>
                  </CartProvider>
                </ExternalProductProvider>
              </ShopProvider>
            </PaymentGatewayProvider>
          </FetchProvider>
        </ItemsProvider>
      </ControllerProvider>
    </>
  );
}
