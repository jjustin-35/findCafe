import { useState } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  Menu,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const tags = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];

interface FilterValues {
  tags: string[];
  location: string;
  minRating: number;
}

interface AdvancedSearchProps {
  onFilterChange: (filters: FilterValues) => void;
}

const AdvancedSearch = ({ onFilterChange }: AdvancedSearchProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    tags: [],
    location: '',
    minRating: 0,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDesktop) {
      setAnchorEl(event.currentTarget);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleClose = () => {
    if (isDesktop) {
      setAnchorEl(null);
    } else {
      setDrawerOpen(false);
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
    handleClose();
  };

  const FilterContent = () => (
    <Box sx={{ p: 2, minWidth: 300 }}>
      <Typography variant="h6" gutterBottom>進階搜尋</Typography>
      
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>標籤</InputLabel>
        <Select
          multiple
          value={filters.tags}
          onChange={(e) => setFilters({ ...filters, tags: e.target.value as string[] })}
          renderValue={(selected) => selected.join(', ')}
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>地區</InputLabel>
        <Select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value as string })}
        >
          <MenuItem value="taipei">台北</MenuItem>
          <MenuItem value="newTaipei">新北</MenuItem>
          <MenuItem value="taoyuan">桃園</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>最低評分</Typography>
        <Slider
          value={filters.minRating}
          onChange={(_, value) => setFilters({ ...filters, minRating: value as number })}
          min={0}
          max={5}
          step={0.5}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Button 
        fullWidth 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={handleApplyFilters}
      >
        套用篩選
      </Button>
    </Box>
  );

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <TuneIcon />
      </IconButton>

      {isDesktop ? (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
          <FilterContent />
        </Menu>
      ) : (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleClose}
        >
          <FilterContent />
        </Drawer>
      )}
    </>
  );
};

export default AdvancedSearch;
