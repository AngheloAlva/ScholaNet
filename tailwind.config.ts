import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'primary-100': '#4CAF50', /* Verde principal más oscuro para elementos destacados */
        'primary-200': '#81C784', /* Verde más claro para hover y elementos secundarios */
        'primary-300': '#C8E6C9', /* Verde muy claro para fondos y acentos sutiles */

        'accent-100': '#FFC107', /* Amarillo como color de acento para botones o iconos */
        'accent-200': '#FFECB3', /* Amarillo claro para fondos de elementos de acento */

        'text-100': '#333333', /* Gris oscuro para texto principal */
        'text-200': '#757575', /* Gris medio para texto secundario o descriptivo */

        'bg-100': '#FFFFFF', /* Blanco para el fondo principal */
        'bg-200': '#F5F5F5', /* Gris muy claro para fondos secundarios o para diferenciar secciones */
        'bg-300': '#EEEEEE' /* Gris aún más claro para variar entre fondos y crear profundidad */
      }
    }
  },
  plugins: []
}
export default config
