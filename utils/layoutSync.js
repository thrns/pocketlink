/**
 * Efficient Mobile to Desktop Layout Synchronization
 * 
 * This module provides utilities for syncing mobile layout changes to desktop
 * using a 2-column mobile to 12-column desktop mapping with upper/lower half division.
 * 
 * Layout Structure:
 * - Mobile: 2 columns (split into upper/lower halves based on y-position)
 * - Desktop: 12 columns (divided into two 6-column sections)
 * - Upper half items → Desktop columns 1-6
 * - Lower half items → Desktop columns 7-12
 */

/**
 * Sorts mobile items by their y-position and divides them into upper and lower halves
 * @param {Array} mobileItems - Array of mobile items
 * @returns {Object} Object containing upperHalf and lowerHalf arrays
 */
export const divideMobileItemsByPosition = (mobileItems) => {
  if (!mobileItems || mobileItems.length === 0) {
    return { upperHalf: [], lowerHalf: [] };
  }

  // Sort items by y-position (ascending)
  const sortedItems = [...mobileItems].sort((a, b) => a.y - b.y);
  
  // Find the midpoint y-position
  const minY = Math.min(...sortedItems.map(item => item.y));
  const maxY = Math.max(...sortedItems.map(item => item.y + item.h));
  const midY = minY + (maxY - minY) / 2;
  
  // Divide items based on their center y-position
  const upperHalf = [];
  const lowerHalf = [];
  
  sortedItems.forEach(item => {
    const itemCenterY = item.y + (item.h / 2);
    if (itemCenterY < midY) {
      upperHalf.push(item);
    } else {
      lowerHalf.push(item);
    }
  });
  
  return { upperHalf, lowerHalf };
};

/**
 * Maps mobile item position to desktop position based on upper/lower half division
 * @param {Object} mobileItem - The mobile item to map
 * @param {boolean} isLowerHalf - Whether the item is in the lower half
 * @returns {Object} Desktop position object {x, y}
 */
export const mapMobileToDesktopPosition = (mobileItem, isLowerHalf = false) => {
  if (!mobileItem) return { x: 0, y: 0 };
  
  const baseX = isLowerHalf ? 6 : 0; // Lower half starts at column 6, upper half at column 0
  
  return {
    x: baseX + (mobileItem.x * 3), // Scale x within the 6-column section (2-col → 6-col = 3x)
    y: mobileItem.y // Keep y-position unchanged
  };
};

/**
 * Efficiently syncs mobile layout changes to desktop layout
 * Only processes items that have actually changed positions
 * @param {Array} changedMobileItems - Array of mobile items that changed
 * @param {Array} allMobileItems - Complete array of mobile items for context
 * @param {Array} desktopItems - Array of desktop items to update
 * @returns {Array} Updated desktop items array
 */
export const syncMobileChangesToDesktop = (changedMobileItems, allMobileItems, desktopItems) => {
  if (!changedMobileItems || changedMobileItems.length === 0) {
    return desktopItems;
  }

  // Divide all mobile items to determine which section each item belongs to
  const { upperHalf, lowerHalf } = divideMobileItemsByPosition(allMobileItems);
  
  // Create lookup maps for efficient processing
  const upperHalfIds = new Set(upperHalf.map(item => item.i));
  const lowerHalfIds = new Set(lowerHalf.map(item => item.i));
  const changedItemIds = new Set(changedMobileItems.map(item => item.i));
  
  // Update only the desktop items that correspond to changed mobile items
  return desktopItems.map(desktopItem => {
    // Only process items that actually changed
    if (!changedItemIds.has(desktopItem.i)) {
      return desktopItem;
    }
    
    // Find the corresponding mobile item
    const mobileItem = changedMobileItems.find(mobile => mobile.i === desktopItem.i);
    if (!mobileItem) {
      return desktopItem;
    }
    
    // Determine if item is in lower half
    const isLowerHalf = lowerHalfIds.has(mobileItem.i);
    
    // Map position (preserve h and w values)
    const newPosition = mapMobileToDesktopPosition(mobileItem, isLowerHalf);
    
    return {
      ...desktopItem,
      x: newPosition.x,
      y: newPosition.y,
      // Preserve existing h and w values - only update positions
    };
  });
};

/**
 * Syncs a single mobile item to its corresponding desktop item
 * @param {Object} mobileItem - The mobile item to sync from
 * @param {Object} desktopItem - The desktop item to sync to
 * @param {Array} allMobileItems - Complete array of mobile items for context
 * @returns {Object} Updated desktop item with synced position
 */
export const syncSingleMobileItemToDesktop = (mobileItem, desktopItem, allMobileItems) => {
  if (!mobileItem || !desktopItem) return desktopItem;
  
  // Divide all mobile items to determine positioning context
  const { upperHalf, lowerHalf } = divideMobileItemsByPosition(allMobileItems);
  
  // Determine if this item is in the lower half
  const isLowerHalf = lowerHalf.some(item => item.i === mobileItem.i);
  
  // Map position (preserve h and w values)
  const newPosition = mapMobileToDesktopPosition(mobileItem, isLowerHalf);
  
  return {
    ...desktopItem,
    x: newPosition.x,
    y: newPosition.y,
    // Preserve existing h and w values - only update positions
  };
};

/**
 * Validates if synchronization should occur based on mobile items changes
 * @param {Array} previousMobileItems - Previous state of mobile items
 * @param {Array} currentMobileItems - Current state of mobile items
 * @returns {Array} Array of items that actually changed positions
 */
export const getChangedMobileItems = (previousMobileItems, currentMobileItems) => {
  if (!previousMobileItems || !currentMobileItems) {
    return [];
  }
  
  const changedItems = [];
  
  currentMobileItems.forEach(currentItem => {
    const previousItem = previousMobileItems.find(prev => prev.i === currentItem.i);
    
    if (!previousItem) {
      // New item
      changedItems.push(currentItem);
    } else if (
      previousItem.x !== currentItem.x ||
      previousItem.y !== currentItem.y
    ) {
      // Position changed (we only care about position changes, not size)
      changedItems.push(currentItem);
    }
  });
  
  return changedItems;
};

/**
 * Debug utility to log sync operations
 * @param {string} operation - The sync operation being performed
 * @param {Object} data - Data related to the sync operation
 */
export const logSyncOperation = (operation, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Efficient Layout Sync] ${operation}:`, data);
  }
};

/**
 * Legacy support - maps mobile size to desktop size (kept for backward compatibility)
 * @param {string} mobileSizeKey - The mobile shape preset key
 * @returns {string} The same size key (no mapping needed in new approach)
 */
export const mapMobileToDesktopSize = (mobileSizeKey) => {
  // In the new approach, we preserve size keys and only modify positions
  return mobileSizeKey;
};