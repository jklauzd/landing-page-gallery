import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  compiler: {
    // Enable styled-components SSR support (Primer React uses styled-components)
    styledComponents: true,
  },
  transpilePackages: ['@primer/react', '@primer/octicons-react'],
}

export default nextConfig
