import { Card, CardProps, useMantineTheme } from '@mantine/core';

interface CardContainerProps extends CardProps {
    children: React.ReactNode
}

const CardContainer = ({ children, ...cardProps }: CardContainerProps) => {
    const theme = useMantineTheme();
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
            maxWidth: 400,
            margin: 'auto',
            backgroundColor: theme.colors.dark[1],
            }}
            {...cardProps}
        >
            {children}
        </Card>
    );
};

export default CardContainer;