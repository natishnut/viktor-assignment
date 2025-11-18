import { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { VIKTOR_COLORS } from '@/config/theme';
import { LAYOUT_CONFIG, UI_TEXT } from '@/config/constants';
import { ViktorLogo } from '@/components/ViktorLogo';
import { SearchBar } from '@/components/SearchBar';
import type { BlogCategory } from '@/types';

interface SidebarProps {
  children: React.ReactNode;
  categories: BlogCategory[];
  selectedCategory?: number;
  onCategoryChange: (categoryId: number | undefined) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Sidebar({ 
  children, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (categoryId: number | undefined) => {
    onCategoryChange(categoryId);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: LAYOUT_CONFIG.SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: VIKTOR_COLORS.white,
        borderRight: `1px solid ${VIKTOR_COLORS.lightGray}`,
        overflow: 'hidden', 
      }}
    >
      <Box sx={{ p: 3, borderBottom: `1px solid ${VIKTOR_COLORS.lightGray}` }}>
        <ViktorLogo variant="light" width={76} height={64} />
      </Box>

      <Box sx={{ px: 3, py: 3, borderBottom: `1px solid ${VIKTOR_COLORS.lightGray}` }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: VIKTOR_COLORS.black,
            mb: 1.5,
          }}
        >
          {UI_TEXT.BLOG_TITLE}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            lineHeight: 1.5,
            color: VIKTOR_COLORS.darkGray,
          }}
        >
          {UI_TEXT.BLOG_DESCRIPTION}
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${VIKTOR_COLORS.lightGray}` }}>
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
        />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 2, px: 2 }}>
        <Card
          sx={{
            backgroundColor: VIKTOR_COLORS.white,
            border: `1px solid ${VIKTOR_COLORS.lightGray}`,
            boxShadow: 'none',
            borderRadius: '8px',
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleCategoryClick(undefined)}
                  selected={selectedCategory === undefined}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: '4px',
                    '&.Mui-selected': {
                      backgroundColor: VIKTOR_COLORS.lightGray,
                      '& .MuiListItemText-primary': {
                        color: VIKTOR_COLORS.black,
                        fontWeight: 600,
                      },
                    },
                    '&:hover': {
                      backgroundColor: VIKTOR_COLORS.lightGray,
                    },
                  }}
                >
                  <ListItemText
                    primary={UI_TEXT.LATEST}
                    primaryTypographyProps={{
                      fontSize: '14px',
                      color: selectedCategory === undefined ? VIKTOR_COLORS.black : VIKTOR_COLORS.darkGray,
                      fontWeight: selectedCategory === undefined ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>

              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <ListItem key={category.id} disablePadding>
                    <ListItemButton
                      onClick={() => handleCategoryClick(category.id)}
                      selected={isSelected}
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: '4px',
                        mt: 0.5,
                        '&.Mui-selected': {
                          backgroundColor: VIKTOR_COLORS.lightGray,
                          '& .MuiListItemText-primary': {
                            color: VIKTOR_COLORS.black,
                            fontWeight: 600,
                          },
                        },
                        '&:hover': {
                          backgroundColor: VIKTOR_COLORS.lightGray,
                        },
                      }}
                    >
                      <ListItemText
                        primary={category.name}
                        primaryTypographyProps={{
                          fontSize: '14px',
                          color: isSelected ? VIKTOR_COLORS.black : VIKTOR_COLORS.darkGray,
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && !mobileOpen && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: VIKTOR_COLORS.white,
            border: `1px solid ${VIKTOR_COLORS.lightGray}`,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              backgroundColor: VIKTOR_COLORS.lightGray,
            },
          }}
        >
          <MenuIcon sx={{ color: VIKTOR_COLORS.black }} />
        </IconButton>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: LAYOUT_CONFIG.SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: LAYOUT_CONFIG.SIDEBAR_WIDTH,
              borderRight: `1px solid ${VIKTOR_COLORS.lightGray}`,
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: LAYOUT_CONFIG.SIDEBAR_WIDTH_MOBILE,
              overflowX: 'hidden',
            },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            {drawerContent}
          </Box>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${LAYOUT_CONFIG.SIDEBAR_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: VIKTOR_COLORS.white,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
