import { useEffect } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Typography,
    Button,
} from '@mui/material';
import tagData, { TagType } from '@/constants/tags';
import { getAreas } from '@/redux/search';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { FilterValues } from './index';

const tags = Object.keys(tagData) as TagType[];

const FilterContent = ({
    filters,
    handleFilter,
    onFilterChange,
    handleClose,
}: {
    filters: FilterValues;
    handleFilter: (data: Record<string, any>) => void;
    onFilterChange: (filters: FilterValues) => void;
    handleClose: () => void;
}) => {
    const { areas } = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!areas.length) dispatch(getAreas());
    }, [areas]);

    const handleApplyFilters = () => {
        onFilterChange(filters);
        handleClose();
    };

    const renderValue = (selected: TagType[]) => selected.map((item) => tagData[item]).join(', ');

    return (
        <Box sx={{ p: 2, width: 300 }}>
            <Typography variant="h6" gutterBottom>進階搜尋</Typography>

            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="select-multiple-tags-label" sx={{ px: 1, bgcolor: 'white' }}>標籤</InputLabel>
                <Select
                    multiple
                    value={filters.tags}
                    onChange={(e) => handleFilter({ tags: e.target.value })}
                    renderValue={renderValue}
                    labelId="select-multiple-tags-label"
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tagData[tag]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="select-location-label" sx={{ px: 1, bgcolor: 'white' }}>地區</InputLabel>
                <Select
                    labelId="select-location-label"
                    value={filters.location}
                    onChange={(e) => handleFilter({ location: e.target.value })}
                >
                    {areas.map((area) => (
                        <MenuItem key={area.id} value={area.id}>
                            {area.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>評分</Typography>
                <Slider
                    value={filters.minRating}
                    onChange={(_, value) => handleFilter({ minRating: value })}
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
    )
};

export default FilterContent;