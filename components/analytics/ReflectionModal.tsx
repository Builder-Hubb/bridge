import Button from "@/components/Button";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

interface ReflectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (reflection: string) => void;
}

const ReflectionModal: React.FC<ReflectionModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [reflection, setReflection] = useState("");
  const [showSuccessState, setShowSuccessState] = useState(false);

  const handleSave = () => {
    onSave(reflection);
    setShowSuccessState(true);

    setTimeout(() => {
      setReflection("");
      setShowSuccessState(false);
      onClose();
    }, 15000);
  };

  const handleOverlayPress = () => {
    if (!showSuccessState) {
      onClose();
    }
  };

  const handleCloseSuccess = () => {
    setReflection("");
    setShowSuccessState(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <ModalOverlay>
          <TouchableWithoutFeedback onPress={() => {}}>
            {showSuccessState ? (
              <SuccessContainer>
                <SuccessHeader>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color="#17DF71"
                  />
                  <SuccessTitle>Saved</SuccessTitle>
                </SuccessHeader>
                <SuccessMessage>
                  Your reflection has been saved to the Home Screen.
                </SuccessMessage>
                <CloseButton onPress={handleCloseSuccess}>
                  <MaterialIcons name="cancel" size={32} color="#CACACA" />
                </CloseButton>
              </SuccessContainer>
            ) : (
              <ModalContainer>
                <>
                  <ModalTitle>Time to Reflect!</ModalTitle>
                  <ReflectionInput
                    placeholder="Take your time to reflect on how you responded to your messages this week. Did you feel relieved, relaxed or anxious?"
                    multiline
                    value={reflection}
                    onChangeText={setReflection}
                    textAlignVertical="top"
                    placeholderTextColor="#999999"
                  />
                  <Button
                    label="Save my Reflection"
                    onPress={handleSave}
                    disabled={!reflection}
                  />
                </>
              </ModalContainer>
            )}
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReflectionModal;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled.View`
  width: 100%;
  max-width: 334px;
  background-color: #f5f5f7;
  border-radius: 24px;
  padding: 24px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #1a1a1a;
  margin-bottom: 20px;
  text-align: center;
`;

const ReflectionInput = styled.TextInput`
  width: 100%;
  height: 158px;
  background-color: #f7f8fe;
  border: 1px solid #b5d3d8;
  border-radius: 20px;
  padding: 16px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #1a1a1a;
  margin-bottom: 24px;
`;

const SuccessContainer = styled.View`
  width: 100%;
  max-width: 334px;
  background-color: #f5f5f7;
  border-radius: 24px;
  padding: 24px;
  align-items: center;
`;

const SuccessHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #1a1a1a;
  font-weight: 600;
  margin-left: 8px;
`;

const SuccessMessage = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #2c2c2c;
  text-align: center;
  font-weight: 400;
  margin-bottom: 20px;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 4px;
  align-items: center;
  justify-content: center;
`;
