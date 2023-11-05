import styled from "styled-components/native";
import { commonTheme } from "../../theme/commonTheme";

export const TextInput = styled.TextInput`
  background-color: ${commonTheme.grey00};
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
