import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Colours } from "../../constants/Colours";

type InputVariant = "rounded" | "flat" | "bottom-border";

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  type?: "text" | "email" | "tel" | "password";
  variant?: InputVariant;
}

const getKeyboardType = (type?: string): KeyboardTypeOptions => {
  switch (type) {
    case "email":
      return "email-address";
    case "tel":
      return "phone-pad";
    default:
      return "default";
  }
};

const getAutoCapitalize = (
  type?: string
): "none" | "sentences" | "words" | "characters" | undefined => {
  switch (type) {
    case "email":
    case "password":
    case "tel":
      return "none";
    default:
      return "sentences";
  }
};

const getInputStyle = (
  variant: InputVariant,
  isFocused: boolean,
  error: boolean | string | undefined,
  isPassword: boolean,
  style: StyleProp<TextStyle>
) => {
  let baseStyle: TextStyle = {};
  if (variant === "rounded") {
    baseStyle = {
      ...styles.input,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: Colours.purple[2],
      backgroundColor: "transparent",
    };
  } else if (variant === "flat") {
    baseStyle = {
      ...styles.input,
      borderRadius: 0,
      borderWidth: 1.5,
      borderColor: Colours.purple[2],
      backgroundColor: "transparent",
    };
  } else if (variant === "bottom-border") {
    baseStyle = {
      ...styles.input,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: Colours.purple[7], // darker purple
      backgroundColor: "transparent",
    };
  }

  // Focused state
  if (isFocused) {
    if (variant === "bottom-border") {
      baseStyle.borderColor = Colours.purple[8];
    } else {
      baseStyle.borderColor = Colours.purple[5];
    }
  }

  // Error state
  if (error) {
    baseStyle.borderColor = Colours.red[1];
  }

  // Password icon space
  if (isPassword) {
    baseStyle.paddingRight = 40;
  }

  // Merge with custom style
  if (style) {
    baseStyle = {
      ...baseStyle,
      ...(Array.isArray(style) ? Object.assign({}, ...style) : style),
    };
  }

  return baseStyle;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  style,
  type = "text",
  secureTextEntry,
  variant = "rounded",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputSecureTextEntry = isPassword ? !showPassword : secureTextEntry;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={isPassword ? styles.inputWrapper : undefined}>
        <TextInput
          style={getInputStyle(variant, isFocused, !!error, isPassword, style)}
          placeholderTextColor={Colours.purple[3]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={getKeyboardType(type)}
          autoCapitalize={getAutoCapitalize(type)}
          autoCorrect={
            type === "email" || type === "password" || type === "tel"
              ? false
              : true
          }
          secureTextEntry={inputSecureTextEntry}
          textContentType={
            type === "email"
              ? "emailAddress"
              : type === "password"
                ? "password"
                : type === "tel"
                  ? "telephoneNumber"
                  : "none"
          }
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={Colours.purple[4]}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 6,
    color: Colours.purple[7],
    fontSize: 14,
    fontWeight: "600",
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colours.purple[8],
    backgroundColor: "transparent",
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: 0,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  error: {
    marginTop: 4,
    color: Colours.red[1],
    fontSize: 12,
  },
});

export default FormInput;
