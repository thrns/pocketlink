# 📝 PocketLink AI Onboarding Layout Generation

## Overview

The PocketLink AI Onboarding Layout Generation system creates personalized onboarding experiences by extracting, organizing, and structuring content from user inputs and selected categories. The system uses AI agents to process user information, extract URLs, fetch HTML content, and organize that content chronologically to create a cohesive and personalized onboarding flow.

## Architecture

The system uses a streamlined multi-agent approach:

1. **Resource Provider** - Responsible for:
   - Extracting URLs from user categories and profile information
   - Fetching HTML content from extracted URLs
   - Processing and organizing images, links, and content blocks chronologically
   - Preparing structured resources for the Researcher

2. **Researcher** - Responsible for:
   - Analyzing the chronologically organized content from the Resource Provider
   - Creating a structured narrative based on user categories
   - Validating and enhancing extracted data
   - Maintaining chronological relevance where appropriate
   - Preparing organized data for the Builder

3. **Builder** - Responsible for:
   - Designing the onboarding layout based on categories and organized data
   - Creating a flow that respects chronological order when meaningful
   - Arranging sections in a logical and engaging way
   - Generating the final layout specifications

## Workflow Process

1. **Input Processing**:
   - The system receives user categories and profile information
   - URLs are extracted from this information using regex patterns
2. **Content Fetching & Processing**:
   - HTML content is fetched from extracted URLs
   - Content is timestamped for chronological ordering
   - Metadata, images, links, and content blocks are extracted
3. **Chronological Organization**:
   - All extracted content (images, links, text) is organized by timestamp
   - This creates a natural narrative flow that reflects when content was discovered
   - Resources maintain their temporal relationship to each other
4. **Category-Based Structure**:
   - The chronologically organized content is analyzed within category contexts
   - Each category receives relevant content while maintaining appropriate ordering
   - The result is a coherent narrative structure for onboarding
5. **Layout Generation**:
   - The final layout is assembled based on the structured data
   - Resources are positioned to create a natural progression through the onboarding
   - The system generates specifications for rendering the complete layout

## API Usage

### Request Body

```json
{
  "categories": ["Category1", "Category2", "Category3"],
  "profile": {
    "name": "User Name",
    "title": "Professional Title",
    "bio": "Brief biography",
    "industry": "User's Industry",
    "experience": ["Experience 1", "Experience 2"],
    "education": ["Education 1", "Education 2"],
    "skills": ["Skill 1", "Skill 2"]
  }
}
```

### Response

```json
{
  "layout": {
    "profileSummary": {
      "title": "Generated profile title",
      "description": "Generated profile summary",
      "keywords": ["Keyword1", "Keyword2"]
    },
    "theme": {
      "primaryColor": "#HexColor",
      "secondaryColor": "#HexColor",
      "styleNotes": "Theme style description"
    },
    "sections": [
      {
        "category": "Category name",
        "title": "Section title",
        "content": "Section content",
        "resources": [
          {
            "type": "image/link",
            "url": "Resource URL",
            "description": "Resource description"
          }
        ]
      }
    ],
    "uniqueSellingPoints": [
      {
        "title": "USP title",
        "description": "USP description"
      }
    ]
  }
}
```

## Key Features

1. **Category-Based Organization**: Content is structured around user-selected categories for personalized onboarding.

2. **Chronological Content Processing**: All content is extracted, timestamped, and organized in chronological order to maintain narrative flow.

3. **HTML Content Extraction**: Fetches and processes HTML content to extract relevant information for the onboarding process.

4. **Real Link and Image Validation**: Ensures all resources used in the layout are real and accessible.

5. **Profile-Optimized Layout**: Creates layouts specifically tailored to onboarding new users based on their profile information.

## Directory Structure

```
/app/api/ai/generate-onboarding-layout/
├── route.js                  # API endpoint
├── agents/                   # Agent implementations
│   ├── resource-provider.js  # Extracts URLs and processes content
│   ├── researcher.js         # Organizes and validates data
│   └── builder.js            # Generates layout specifications
├── logs/                     # Logging and debugging
└── README.md                 # This file
```

## Error Handling

The system includes comprehensive error handling for:

1. **Input Validation**: Ensures categories and profile information are properly formatted.
2. **HTML Fetching Errors**: Handles network issues and invalid HTML responses.
3. **Content Parsing Failures**: Provides fallback mechanisms for content extraction issues.
4. **Logging**: Detailed logging at each step for debugging and monitoring.

## How to Extend

1. **Add New Categories**: Extend the system to handle new types of categories.
2. **Enhance HTML Parsing**: Improve metadata extraction from different types of web pages.
3. **Optimize Chronological Processing**: Refine the timestamp-based ordering for specific content types.
4. **Add Custom Layout Templates**: Create templates optimized for particular category combinations.

## Best Practices

1. Provide comprehensive profile information for better results
2. Select relevant categories that reflect the user's needs
3. Ensure profile information contains meaningful details
4. For optimal chronological organization, provide information in a logical sequence
