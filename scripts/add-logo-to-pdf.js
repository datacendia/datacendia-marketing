/**
 * add-logo-to-pdf.js
 * Adds the Datacendia logo to DCII-Framework-White-Paper-2026-02-19.pdf
 * - Cover page: large centered logo near top
 * - All other pages: small logo in top-right header
 */
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const PDF_IN  = 'C:\\Users\\User\\Downloads\\git\\DCII-Framework-White-Paper-2026-02-19.pdf';
const PDF_OUT = 'C:\\Users\\User\\Downloads\\git\\DCII-Framework-White-Paper-2026-02-19.pdf';

async function run() {
  const pdfBytes = fs.readFileSync(PDF_IN);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  console.log(`Loaded PDF: ${pages.length} pages`);

  // Embed a font for drawing the logo text
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();

    if (i === 0) {
      // ── Cover page: large logo centered near top ──────────────────────
      const logoText = 'D A T A C E N D I A';
      const fontSize = 28;
      const textWidth = font.widthOfTextAtSize(logoText, fontSize);
      const x = (width - textWidth) / 2;
      const y = height - 72; // ~1 inch from top

      // Black background bar
      page.drawRectangle({
        x: x - 20,
        y: y - 10,
        width: textWidth + 40,
        height: fontSize + 18,
        color: rgb(0.039, 0.039, 0.039), // #0a0a0a
      });

      // Gold text
      page.drawText(logoText, {
        x,
        y: y + 4,
        size: fontSize,
        font,
        color: rgb(0.788, 0.635, 0.153), // #C9A227
      });

    } else {
      // ── All other pages: small logo top-right header ──────────────────
      const logoText = 'D A T A C E N D I A';
      const fontSize = 9;
      const textWidth = font.widthOfTextAtSize(logoText, fontSize);
      const x = width - textWidth - 28;
      const y = height - 22;

      // Black background pill
      page.drawRectangle({
        x: x - 6,
        y: y - 4,
        width: textWidth + 12,
        height: fontSize + 8,
        color: rgb(0.039, 0.039, 0.039),
      });

      // Gold text
      page.drawText(logoText, {
        x,
        y: y + 1,
        size: fontSize,
        font,
        color: rgb(0.788, 0.635, 0.153),
      });
    }
  }

  const outBytes = await pdfDoc.save();
  fs.writeFileSync(PDF_OUT, outBytes);
  console.log(`Done — saved to: ${PDF_OUT}`);
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
