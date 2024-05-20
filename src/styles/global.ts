import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
            background-color: ${({ theme }) => theme.foodExplorer.dark[400]};
            color: ${({ theme }) => theme.foodExplorer.light[100]};
            /* overflow: hidden; */

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            font-family: 'Roboto', 'Ubuntu', sans-serif;
            font-size: 16px;
            outline: none;
    }

    .SideBar {
        display: none;
    }
    
    footer {
        background-color: ${({ theme }) => theme.foodExplorer.dark[600]};
        color: ${({ theme }) => theme.foodExplorer.light[200]};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    button, a {
            cursor: pointer;
            transition: filter 0.2s;
    }
/* 
    button:hover, a:hover {
        filter: brightness(0.9);
    }     */

    button {
        background-color: ${({ theme }) => theme.foodExplorer.tints.tomato[100]};
        color: ${({ theme }) => theme.foodExplorer.light[100]};
    }

    input {
        background-color: ${({ theme }) => theme.foodExplorer.dark[900]};
        color: ${({ theme }) => theme.foodExplorer.light[100]};
    }

    @media screen and (min-width: 768px) {
        body {
            background-color: ${({ theme }) => theme.foodExplorer.dark[400]};
            color: ${({ theme }) => theme.foodExplorer.light[100]};
            /* overflow: hidden; */

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            font-family: 'Roboto', 'Ubuntu', sans-serif;
            font-size: 16px;
            outline: none;
        }
            
        a {
            text-decoration: none;
        }

        button, a {
            cursor: pointer;
            transition: filter 0.2s;
        }

        button:hover, a:hover {
            filter: brightness(0.9);
        }
            
        button {
            background-color: ${({ theme }) => theme.foodExplorer.tints.tomato[100]};
            color: ${({ theme }) => theme.foodExplorer.light[100]};
        }

        .SideBar {
            display: flex;
        }
        
        code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        }

        @font-face {
        font-family: 'Ubuntu';
        font-weight: 300;
        src: url('/fonts/Ubuntu-Light.woff2') format('woff2');
        }

        @font-face {
        font-family: 'Ubuntu';
        font-weight: 400;
        src: url('/fonts/Ubuntu-Regular.woff2') format('woff2');
        }
        
        @font-face {
        font-family: 'Ubuntu';
        font-weight: 500;
        src: url('/fonts/Ubuntu-Medium.woff2') format('woff2');
        }

        @font-face {
        font-family: 'Ubuntu';
        font-weight: 700;
        src: url('/fonts/Ubuntu-Bold.woff2') format('woff2');
        }

        ::-webkit-scrollbar {
            width: 12px;
        }

        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        ::-webkit-scrollbar-track {
            background: #ddd;
            border-radius: 6px;
        }
    }
`;
