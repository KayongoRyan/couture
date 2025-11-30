# CoutureLaFleur

CoutureLaFleur is a premium Rwandan luxury fashion brand inspired by French couture and African aesthetics, featuring an immersive story-driven shopping experience.

## Project Structure

- **Frontend**: React 18, Tailwind CSS, Framer Motion (via standard CSS animations for this demo)
- **State Management**: React Context API (Cart & Theme)
- **Styling**: Utility-first CSS with a custom luxury configuration
- **Build Tool**: Vite

## How to Push to GitHub

To push this project to your repository (couture), run these commands in your terminal:

1. **Initialize & Commit**
   ```bash
   git init
   git add .
   git commit -m "Initial launch of CoutureLaFleur"
   ```

2. **Connect to Repository**
   ```bash
   git branch -M main
   git remote remove origin
   git remote add origin https://github.com/KayongoRyan/couture.git
   ```

3. **Push Code**
   ```bash
   git push -u origin main
   ```

## Development

To run this project locally:

1. `npm install`
2. `npm run dev`

## Deployment

To deploy to Vercel or Netlify:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
