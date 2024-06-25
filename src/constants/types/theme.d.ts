export interface ThemeColors {
  background: string;
  border: string;
  button: string;
  buttonText: string;
  card: string;
  headerBackground: string;
  headerText: string;
  notification: string;
  placeHolder: string;
  primary: string;
  secondary: string;
  tabBarBackground: string;
  tabBarIcon: string;
  text: string;
  errorText: string;
  linearStart: string;
  linearEnd: string;
}

export interface Theme {
  colors: ThemeColors;
  dark: boolean;
}
