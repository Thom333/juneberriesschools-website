import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { berry: { 50:'#f8f5fc',100:'#eee7f7',200:'#ddcfee',500:'#8052b5',600:'#693b9c',700:'#542d80',800:'#3d205f',900:'#291640' }, sunshine:'#f4c542', ink:'#211a2b' } } }, plugins: [] };
export default config;
