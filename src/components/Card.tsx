/** @jsxImportSource @emotion/react */
import { css, useTheme, SerializedStyles } from "@emotion/react";

const Card = ({
  children,
  styleProp,
}: {
  children: React.ReactNode;
  styleProp?: SerializedStyles;
}) => {
  const theme = useTheme();

  const cardStyle = css`
  padding: 1rem;
  background: ${theme.bgComponent};
  color: ${theme.text};
  border-radius: 0.5rem;
  border: ${theme.border};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

  return <div css={[cardStyle, styleProp]}>{children}</div>;
};

export default Card;
