# Required Image Files

## Missing Images to Create

### 1. og-image.png (HIGH PRIORITY)
- **Location:** `/og-image.png` (root directory)
- **Dimensions:** 1200 x 630 pixels
- **Format:** PNG
- **Purpose:** Open Graph image for social media sharing (Facebook, LinkedIn, Twitter)
- **Current Issue:** HTML references `og-image.png` but only `og-image.svg` exists at `/assets/images/`
- **Action:** Export or convert the SVG to PNG at 1200x630px

### 2. apple-touch-icon.png (MEDIUM PRIORITY)
- **Location:** `/apple-touch-icon.png` (root directory)
- **Dimensions:** 180 x 180 pixels
- **Format:** PNG
- **Purpose:** iOS home screen icon when users save the site
- **Current Issue:** Referenced in HTML but file doesn't exist
- **Action:** Create a 180x180px PNG version of the Datacendia logo

## Existing Image Assets
- `/assets/favicon.svg` - Browser favicon (SVG format)
- `/assets/images/og-image.svg` - Source file for OG image

## After Creating Images

1. Place `og-image.png` in the root directory (`/`)
2. Place `apple-touch-icon.png` in the root directory (`/`)
3. Test social sharing on:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Notes
- All HTML pages already reference these files at the correct paths
- No code changes needed after creating the image files
