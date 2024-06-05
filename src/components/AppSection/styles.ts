import styled from "styled-components";

export const Container = styled.section`
    margin: 28px 0;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    > h2 {
        padding-bottom: 16px;
        margin-bottom: 24px;

        color: ${({ theme }) => theme.gte_platform.light[100]};
        font-size: 20px;
        font-weight: 400;

    }
`;