import { ItemsProvider } from '@/app/contexts/ItemsContext';
import { ControllerProvider } from '@/app/contexts/ControllerContext';
import { ShopProvider } from '@/app/contexts/ShopContext';
import { ExternalProductProvider } from '@/app/contexts/ExternalProductContext';
import { CartProvider } from '@/app/contexts/CartContext';
import { CheckoutProvider } from '@/app/contexts/CheckoutContext';
import { CheckoutAuthProvider } from '@/app/contexts/CheckoutAuthContext';
import { FetchProvider } from '@/app/contexts/FetcherContext';
import { SalesBotChatProvider } from '@/app/contexts/SalesBotChatContext';
import { PaymentGatewayProvider } from '@/app/contexts/PaymentGatewayContext';

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
                        <SalesBotChatProvider tenantUsername={tenant}>
                          <div className="relative w-full">{children}</div>
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
