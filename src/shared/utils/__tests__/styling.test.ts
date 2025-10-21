import { describe, it, expect } from 'vitest';
import { sanitizeGitHubHTML } from '@/shared/utils/styling';

describe('sanitizeGitHubHTML', () => {
  it('should return the original html when no private images are present', () => {
    const html = '<p>This is a regular paragraph</p>';
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toBe(html);
  });

  it('should replace private GitHub image URLs with placeholder text', () => {
    const html = '<img src="https://private-user-images.githubusercontent.com/123456/image.png" alt="private image">';
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toContain('🖼️ [Private image - requires GitHub authentication]');
    expect(result).not.toContain('private-user-images.githubusercontent.com');
  });

  it('should preserve other HTML while replacing private images', () => {
    const html = `
      <h1>Title</h1>
      <p>Some text</p>
      <img src="https://private-user-images.githubusercontent.com/123456/image.png">
      <p>More text</p>
    `;
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toContain('<h1>Title</h1>');
    expect(result).toContain('<p>Some text</p>');
    expect(result).toContain('<p>More text</p>');
    expect(result).toContain('🖼️ [Private image - requires GitHub authentication]');
    expect(result).not.toContain('private-user-images.githubusercontent.com');
  });

  it('should handle multiple private images', () => {
    const html = `
      <img src="https://private-user-images.githubusercontent.com/123/img1.png">
      <p>Text between images</p>
      <img src="https://private-user-images.githubusercontent.com/456/img2.jpg">
    `;
    const result = sanitizeGitHubHTML(html);
    
    // Count occurrences of the placeholder
    const placeholderCount = (result.match(/🖼️ \[Private image - requires GitHub authentication\]/g) || []).length;
    expect(placeholderCount).toBe(2);
    expect(result).not.toContain('private-user-images.githubusercontent.com');
  });

  it('should preserve public image URLs', () => {
    const html = '<img src="https://github.com/user/repo/assets/image.png" alt="public image">';
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toBe(html);
    expect(result).toContain('github.com/user/repo/assets/image.png');
  });

  it('should handle empty or falsy input', () => {
    expect(sanitizeGitHubHTML('')).toBe('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(sanitizeGitHubHTML(null as any)).toBe(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(sanitizeGitHubHTML(undefined as any)).toBe(undefined);
  });

  it('should be case-insensitive when matching private image URLs', () => {
    const html = '<IMG SRC="HTTPS://PRIVATE-USER-IMAGES.GITHUBUSERCONTENT.COM/123/image.png">';
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toContain('🖼️ [Private image - requires GitHub authentication]');
    expect(result).not.toContain('PRIVATE-USER-IMAGES.GITHUBUSERCONTENT.COM');
  });

  it('should handle images with additional attributes', () => {
    const html = '<img class="image" src="https://private-user-images.githubusercontent.com/123/img.png" alt="test" width="500" height="300">';
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toContain('🖼️ [Private image - requires GitHub authentication]');
    expect(result).not.toContain('private-user-images.githubusercontent.com');
  });

  it('should handle complex HTML with mixed content', () => {
    const html = `
      <div>
        <h2>Section Title</h2>
        <p>Paragraph with <strong>bold</strong> and <em>italic</em> text</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <img src="https://private-user-images.githubusercontent.com/789/screenshot.png">
        <pre><code>console.log('code block');</code></pre>
        <a href="https://example.com">Link</a>
      </div>
    `;
    const result = sanitizeGitHubHTML(html);
    
    expect(result).toContain('<h2>Section Title</h2>');
    expect(result).toContain('<strong>bold</strong>');
    expect(result).toContain('<em>italic</em>');
    expect(result).toContain('<li>Item 1</li>');
    expect(result).toContain('<pre><code>');
    expect(result).toContain('<a href="https://example.com">');
    expect(result).toContain('🖼️ [Private image - requires GitHub authentication]');
    expect(result).not.toContain('private-user-images.githubusercontent.com');
  });
});
