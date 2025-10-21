/**
 * Utility functions for styling and formatting
 */

/**
 * Calculate if text should be light or dark based on background color
 * Uses the relative luminance formula
 */
export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Truncate text to a specific length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Sanitize HTML to remove or replace private GitHub image URLs
 * Private GitHub images require authentication and fail with 404
 * This function replaces them with a placeholder or removes them
 */
export function sanitizeGitHubHTML(html: string): string {
  if (!html) return html;
  
  // Replace private GitHub image URLs with a placeholder text
  const sanitized = html.replace(
    /<img[^>]+src="https:\/\/private-user-images\.githubusercontent\.com[^"]*"[^>]*>/gi,
    '<p style="padding: 12px; background: #f6f8fa; border: 1px dashed #d0d7de; border-radius: 6px; color: #57606a; font-style: italic;">🖼️ [Private image - requires GitHub authentication]</p>'
  );
  
  return sanitized;
}
