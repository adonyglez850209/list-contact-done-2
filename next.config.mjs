/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '/**',
        }, {
            protocol: 'https',
            hostname: 'randomuser.me',
            port: '',
            pathname: '/**',
        }                         
        ],
    },
    experimental: {
		serverActions: {
			allowedOrigins: [process.env.NEXTAUTH_URL, "localhost:3000"]
		},
	}      
};

export default nextConfig;
