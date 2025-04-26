'use client';

import { useState, useEffect } from 'react';
import { Box, Switch, Typography, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleAI, queryWithAI } from '@/redux/cafes';
import { AIExplanation } from './styled';

interface AIToggleProps {
  searchData?: any;
}

const AIToggle = ({ searchData }: AIToggleProps) => {
  const dispatch = useAppDispatch();
  const { useAI, aiExplanation, cafes } = useAppSelector((state) => state.cafes);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleToggle = () => {
    dispatch(toggleAI());
  };

  // when useAI is true and there are cafes, automatically query AI analysis
  useEffect(() => {
    if (useAI && cafes.length > 0 && searchData) {
      dispatch(queryWithAI(searchData));
    }
  }, [useAI, cafes, searchData, dispatch]);

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          AI 搜尋
        </Typography>
        <Switch size="small" checked={useAI} onChange={handleToggle} color="primary" />
        <SmartToyIcon fontSize="small" sx={{ ml: 0.5, color: useAI ? 'primary.main' : 'text.disabled' }} />

        {aiExplanation && (
          <Tooltip title="查看 AI 分析結果">
            <IconButton size="small" onClick={handleShowExplanation}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {showExplanation && aiExplanation && (
        <AIExplanation>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {aiExplanation}
          </Typography>
        </AIExplanation>
      )}
    </Box>
  );
};

export default AIToggle;
