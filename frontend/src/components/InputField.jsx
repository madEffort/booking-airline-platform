import styled from '@emotion/styled';

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 10px 20px;
  text-align: center; // 이 줄을 추가하여 텍스트를 가운데 정렬
  cursor: pointer;
  user-select: none;
`;

const InputLabel = styled.label`
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
`;

const InputValue = styled.div`
  font-size: 16px;
  color: #333;
`;

const InputField = ({ label, value, onClick, placeholder, readOnly }) => (
  <InputFieldWrapper onClick={onClick}>
    <InputLabel>{label}</InputLabel>
    <InputValue>{value || placeholder}</InputValue>
  </InputFieldWrapper>
);

export default InputField;
