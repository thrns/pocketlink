import { GoogleGenerativeAI } from '@google/generative-ai';
import { createSupabaseClient } from '@/Clients/supabase/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userInput, tenantUsername, chatHistory, enhancedFormatting } = body;

    console.log('Sales bot API called with:', { userInput, tenantUsername });

    if (!userInput) {
      return new Response(
        JSON.stringify({ error: 'User input is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!tenantUsername) {
      return new Response(
        JSON.stringify({ error: 'Tenant username is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = await createSupabaseClient();

    // Fetch sales bot configuration
    const { data: salesBotData, error: salesBotError } = await supabase
      .from('sales_bot_data')
      .select('*')
      .eq('username', tenantUsername)
      .single();

    console.log('API - Sales bot data:', salesBotData);

    if (salesBotError && salesBotError.code !== 'PGRST116') {
      console.error('Error fetching sales bot data:', salesBotError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch sales bot configuration.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!salesBotData) {
      return new Response(
        JSON.stringify({
          error: 'Sales bot is not available for this tenant.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!salesBotData.is_active) {
      return new Response(
        JSON.stringify({
          error:
            'Sales bot is not activated. Please activate the bot in dashboard settings.',
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch all necessary data in parallel for better performance
    const [
      { data: tenantProfile, error: profileError },
      { data: tenantProducts, error: productsError },
      { data: tenantDiscounts, error: discountsError },
    ] = await Promise.all([
      supabase
        .from('items_data')
        .select('*')
        .eq('username', tenantUsername)
        .single(),
      supabase.from('products_data').select('*').eq('username', tenantUsername), // Remove .single() to get all products
      supabase
        .from('discounts_data')
        .select('*')
        .eq('username', tenantUsername), // Remove .single() to get all discounts
    ]);

    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Build comprehensive context
    let contextData = buildTenantContext(
      tenantProfile,
      tenantProducts,
      tenantDiscounts,
      profileError,
      productsError,
      discountsError
    );

    // Prepare sales bot persona
    let salesBotPersona = `You are a professional sales assistant for ${tenantUsername}.`;
    if (salesBotData.persona) {
      salesBotPersona += `\n\nPersonality: ${salesBotData.persona}`;
    }

    // Full context for the AI
    let fullContext = `
${salesBotPersona}

ROLE & RESPONSIBILITIES:
- Answer customer questions directly and concisely
- Provide specific information only when asked
- Be helpful and professional without being overly promotional
- Keep responses short and focused on the customer's actual question

RESPONSE GUIDELINES:
- Only answer what the customer specifically asks
- Don't list all products unless asked for a product catalog
- Don't mention contact information unless asked how to contact
- Don't provide detailed product specs unless asked for details
- Keep responses conversational and natural
- Use simple formatting - avoid excessive bold text and headers
- Be friendly but not overly enthusiastic or promotional

${contextData}

IMPORTANT INSTRUCTIONS:
- Answer ONLY the specific question asked
- Don't volunteer extra information unless directly relevant
- If asked about a specific product, provide only that product's info
- If asked about price, give just the price
- If asked "what do you sell", then list products briefly
- Only mention contact info if customer asks how to reach the owner
- Keep responses under 3-4 sentences unless more detail is specifically requested
`;

    // Include chat history if available
    if (chatHistory) {
      fullContext += `\n\nRECENT CONVERSATION HISTORY:\n${chatHistory}\n`;
    }

    try {
      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${fullContext}\n\nUser Input: ${userInput}\n\nRespond as the sales assistant with the personality specified, using the tenant information and product catalog provided.`,
              },
            ],
          },
        ],
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      });

      const responseText =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process your request at the moment.";

      console.log('🤖 Sales Bot Reply:', responseText);

      return new Response(JSON.stringify({ reply: responseText }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (aiError) {
      console.error('Error with AI model:', aiError);
      return new Response(
        JSON.stringify({
          reply:
            "I'm having trouble connecting right now. Please try again in a moment.",
          error: aiError.message,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('❌ Error in Sales Bot API:', error);
    return new Response(
      JSON.stringify({
        reply:
          'I apologize, but I encountered an error. Please try again later.',
        error: error.message,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function buildTenantContext(
  tenantProfile,
  tenantProducts,
  tenantDiscounts,
  profileError,
  productsError,
  discountsError
) {
  let context = '';

  // Build profile context
  if (!profileError && tenantProfile) {
    context += `\n## BUSINESS PROFILE\n`;
    context += `**Business Name:** ${tenantProfile.name || 'Not specified'}\n`;
    context += `**Description:** ${tenantProfile.description || 'Not specified'}\n`;

    // Extract profile data properly
    if (tenantProfile.profile) {
      const profile =
        typeof tenantProfile.profile === 'string'
          ? JSON.parse(tenantProfile.profile)
          : tenantProfile.profile;

      if (profile.description) {
        context += `**Bio:** ${profile.description}\n`;
      }

      // Extract contact information
      if (profile.component?.componentProps) {
        context += `**Contact Information:**\n`;
        profile.component.componentProps.forEach((component) => {
          if (component.type === 'email') {
            context += `- Email: ${component.link.replace('mailto:', '')}\n`;
          } else if (component.type === 'social') {
            const platform = extractPlatformName(component.link);
            context += `- ${platform}: ${component.link}\n`;
          }
        });
      }
    }
  }

  // Build products context
  if (!productsError && tenantProducts && tenantProducts.length > 0) {
    context += `\n## PRODUCT CATALOG\n`;

    tenantProducts.forEach((product, index) => {
      context += `\n### Product ${index + 1}: ${product.name || 'Unnamed Product'}\n`;
      context += `**Description:** ${product.description || 'No description available'}\n`;
      context += `**Type:** ${product.type || 'Not specified'}\n`;
      context += `**Price:** $${product.price || 0}\n`;

      if (product.access_url) {
        context += `**Access URL:** ${product.access_url}\n`;
      }

      if (product.images) {
        context += `**Images Available:** Yes\n`;
      }

      // Check if product has discount
      if (product.discount_id && tenantDiscounts) {
        const discount = tenantDiscounts.find(
          (d) => d.id === product.discount_id
        );
        if (discount) {
          context += `**Discount Applied:** ${discount.name}\n`;
          context += `**Discount Type:** ${discount.type}\n`;
          context += `**Discount Value:** ${discount.value}${discount.type === 'percentage' ? '%' : ''}\n`;

          // Calculate discounted price
          let discountedPrice = product.price;
          if (discount.type === 'percentage') {
            discountedPrice =
              product.price - (product.price * discount.value) / 100;
          } else if (discount.type === 'fixed') {
            discountedPrice = Math.max(0, product.price - discount.value);
          }
          context += `**Discounted Price:** $${discountedPrice.toFixed(2)}\n`;
        }
      }

      context += `---\n`;
    });
  } else {
    context += `\n## PRODUCT CATALOG\nNo products currently available in the catalog.\n`;
  }

  // Build discounts context (active discounts not tied to specific products)
  if (!discountsError && tenantDiscounts && tenantDiscounts.length > 0) {
    const generalDiscounts = tenantDiscounts.filter(
      (discount) =>
        !tenantProducts?.some((product) => product.discount_id === discount.id)
    );

    if (generalDiscounts.length > 0) {
      context += `\n## AVAILABLE DISCOUNTS\n`;
      generalDiscounts.forEach((discount) => {
        context += `- **${discount.name}:** ${discount.value}${discount.type === 'percentage' ? '%' : '$'} ${discount.type} discount\n`;
      });
    }
  }

  return context;
}

function extractPlatformName(url) {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    if (domain.includes('instagram')) return 'Instagram';
    if (domain.includes('twitter') || domain.includes('x.com'))
      return 'Twitter/X';
    if (domain.includes('linkedin')) return 'LinkedIn';
    if (domain.includes('facebook')) return 'Facebook';
    if (domain.includes('youtube')) return 'YouTube';
    return 'Social Media';
  } catch {
    return 'Social Media';
  }
}
