import { useState } from 'react';
import {
  IconButton,
  Drawer,
  Menu,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { TagType } from '@/constants/tags';
import FilterContent from './filter';

export interface FilterValues {
  tags: TagType[];
  area: string;
  minRating: number;
}

interface AdvancedSearchProps {
  onFilterChange: (filters: FilterValues) => void;
}

const AdvancedSearch = ({ onFilterChange }: AdvancedSearchProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    tags: [],
    area: '',
    minRating: 0,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDesktop) {
      setAnchorEl(event.currentTarget);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleClose = () => {
    if (isDesktop) {
      setAnchorEl(null);
    } else {
      setIsDrawerOpen(false);
    }
  };

  const handleFilter = (data: Record<string, any>) => {
    setFilters({ ...filters, ...data });
  };


  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <TuneIcon />
      </IconButton>

      {isDesktop ? (
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <FilterContent
            filters={filters}
            handleFilter={handleFilter}
            onFilterChange={onFilterChange}
            handleClose={handleClose}
          />
        </Menu>
      ) : (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={handleClose}
        >
          <Box sx={{ mt: '64px' }}>
            <FilterContent
              filters={filters}
              handleFilter={handleFilter}
              onFilterChange={onFilterChange}
              handleClose={handleClose}
            />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default AdvancedSearch;
