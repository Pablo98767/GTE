import { Container as MuiContainer } from '@mui/material';
import styled from "styled-components";

export const Container = styled(MuiContainer).attrs({
    maxWidth: 'xl'
    })`
    margin: 0;
    padding: 0;

    width: 100%;
`;

export const Content = styled.div`
    display: flex;

    margin: 0;
    padding: 0;

    width: 100%;

    position: relative;
`;

export const Rectangle = styled.div`

    width: 35%;
    height: 120px;
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    border-radius: 4px;
    margin-left: -160px;
    

    position: absolute;
    top: 44px;
    left: 20px;
    z-index: -1;

    @media screen and (min-width: 768px) {
        height: max(120px, 11vw);
    }
`;

export const RectangleCard1 = styled.div`

    width: 35%;
    height: 120px;
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    border-radius: 4px;
    margin-left: 280px;
    
    

    position: absolute;
    top: 44px;
    left: 20px;
    z-index: -1;

    @media screen and (min-width: 768px) {
        height: max(120px, 11vw);
    }
`;

export const RectangleCard2 = styled.div`

    width: 35%;
    height: 120px;
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    border-radius: 4px;
    margin-top: 280px;
    margin-left:-158px;
    
    

    position: absolute;
    top: 44px;
    left: 20px;
    z-index: -1;

    @media screen and (min-width: 768px) {
        height: max(120px, 11vw);
    }
`;


export const RectangleCard3 = styled.div`

    width: 35%;
    height: 120px;
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    border-radius: 4px;
    margin-top: 280px;
    margin-left: 280px;
    
    

    position: absolute;
    top: 44px;
    left: 20px;
    z-index: -1;

    @media screen and (min-width: 768px) {
        height: max(120px, 11vw);
    }
`;



export const RectangleCard4 = styled.div`

    width:43%;
    height: 120px;
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    border-radius: 4px;
    margin-top: 3px;
    margin-left: 780px;
    
    

    position: absolute;
    top: 44px;
    left: 20px;
    z-index: -1;

    @media screen and (min-width: 768px) {
        height: max(120px, 11vw);
    }
`;

export const RectangleCard5 = styled.div`

    width:43%;
    height: 120px;
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    border-radius: 4px;
    margin-top: 280px;
    margin-left: 780px;
    
    

    position: absolute;
    top: 44px;
    left: 20px;
    z-index: -1;

    @media screen and (min-width: 768px) {
        height: max(120px, 11vw);
    }
`;




export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    margin: 0;
    padding: 80px 0 0;

    width: 100%;
    height: 100%;
`;

export const Title = styled.h1`
    margin: 0;
    padding-bottom: 5px;

    font-size: 3.8vw;
    font-weight: 600;

    color: ${({ theme }) => theme.foodExplorer.light[300]};

    @media screen and (min-width: 768px) {
        font-size: 18px;
    }
    
    @media screen and (min-width: 1024px) {
        font-size: max(3.1vw, 24px);
    }
`;

export const Description = styled.p`
    margin: 0;
    padding: 0;

    font-weight: 400;
    font-size: 2.4vw;

    color: ${({ theme }) => theme.foodExplorer.light[300]};

    @media screen and (min-width: 768px) {
        font-size: 14px;
    }

    @media screen and (min-width: 1024px) {
        font-size: 1.1vw;
    }
`;