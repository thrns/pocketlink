import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { topics } = await request.json();

    console.log('Topics:', topics); // Debugging: Check if topics are correct

    if (!topics || topics.length === 0) {
      return Response.json({ error: 'No topics provided' }, { status: 400 });
    }

    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const topicsString = topics.join(', ');

    // Create prompt for the movie quote
    const prompt = `Generate an inspiring movie quote related to the following topics: ${topicsString}. 
    The quote should be thought-provoking and suitable for a user profile bio. 
    Please return the response in plain text without quotations or the author's name. 
    If there are multiple topics in ${topicsString}, choose the first one. 
    The quote should be less than 300 characters.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const quote = response.text().trim();

    // Return the generated quote
    return Response.json({ quote }, { status: 200 });
  } catch (error) {
    console.error('Error generating quote:', error);
    return Response.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    );
  }
}
