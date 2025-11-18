import { createTheme } from "@mui/material/styles";

const VIKTOR_COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#373530",
  bodyText: "#373530",
  lightGray: "#F1F1EF",
  accentPink: "#B35488",
  accentPinkHover: "#9A4A75",
  metaText: '#787774',
};

export const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: VIKTOR_COLORS.black,
      secondary: VIKTOR_COLORS.darkGray,
    },
    divider: VIKTOR_COLORS.lightGray,
  },
  typography: {
    fontFamily: "sans-serif",
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${VIKTOR_COLORS.lightGray}`,
          backgroundColor: VIKTOR_COLORS.white,
          transition: "box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
          fontWeight: 500,
          padding: "8px 16px",
          minHeight: "44px",
        },
        contained: {
          backgroundColor: VIKTOR_COLORS.accentPink,
          color: VIKTOR_COLORS.white,
          "&:hover": {
            backgroundColor: VIKTOR_COLORS.accentPinkHover,
          },
        },
        text: {
          color: VIKTOR_COLORS.black,
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: VIKTOR_COLORS.black,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          height: "24px",
          borderRadius: "4px",
        },
        outlined: {
          borderColor: VIKTOR_COLORS.lightGray,
          color: VIKTOR_COLORS.darkGray,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
            "& fieldset": {
              borderColor: VIKTOR_COLORS.lightGray,
            },
            "&:hover fieldset": {
              borderColor: VIKTOR_COLORS.darkGray,
            },
          },
        },
      },
    },
  },
});

export { VIKTOR_COLORS };
