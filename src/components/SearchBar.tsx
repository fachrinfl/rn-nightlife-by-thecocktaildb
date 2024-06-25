/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacityProps,
  TextInputProps,
} from 'react-native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {Theme} from '../constants/types/theme';

interface SearchBarProps {
  placeholder?: string;
  containerStyle?: TouchableOpacityProps['style'];
  onChangeText?: TextInputProps['onChangeText'];
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  containerStyle,
  onChangeText,
}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.placeHolder}
        />
        <SvgXml
          xml={ICONS.icnSearch(theme.colors.primary)}
          width={16}
          height={16}
          style={{
            marginLeft: 10,
          }}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: SIZES.width,
      backgroundColor: theme.colors.card,
    },
    textInputContainer: {
      flexDirection: 'row',
      borderRadius: 4,
      marginVertical: 10,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      alignItems: 'center',
      backgroundColor: theme.colors.border,
      borderWidth: 0.4,
      borderColor: theme.colors.placeHolder,
    },
    textInput: {
      flex: 1,
      paddingVertical: 8,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.interMedium,
      height: 40,
      color: theme.colors.text,
    },
  });

export default SearchBar;
