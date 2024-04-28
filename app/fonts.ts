/*import { Inter, Lusitana } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});*/

import localFont from "next/font/local";

const inter = localFont({
  src: [
    { path: "../fonts/inter/Inter-Black.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-BlackItalic.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-Bold.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-BoldItalic.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-ExtraBold.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-ExtraBoldItalic.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-ExtraLight-BETA.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-ExtraLightItalic-BETA.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-Italic.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-Light-BETA.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-LightItalic-BETA.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-Medium.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-MediumItalic.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-Regular.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-SemiBold.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-SemiBoldItalic.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-Thin-BETA.woff", style: 'normal' },
    { path: "../fonts/inter/Inter-ThinItalic-BETA.woff", style: 'normal' },
  ],
  display: 'swap',
});

const lusitana = localFont({
  src: [
    {
      path: "../fonts/lusitana/Lusitana-Regular.woff",
      style: 'normal'
    },
    {
      path: "../fonts/lusitana/Lusitana-Bold.woff",
      style: 'normal'
    }
  ],
  display: 'swap',    
});

export { inter, lusitana }