import React from 'react'

import { useSession } from 'next-auth/react';

import { 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
  Box,
  TextField,
} from '@mui/material';

const CardForm = ({cols, session, onCardsChanged}) => {
    const [collection, setCol] = React.useState('')
    const [sort, setSort] = React.useState('obtained-desc')
    const [keywords, setSearchKeywords] = React.useState('')

    React.useEffect(() => {
      fetchCards(collection, keywords, sort);
    }, [collection, keywords, sort]);

    const fetchCards = async (collection, keywords, sort) => {
      const response = await fetch(`/api/cards?collection=${collection}&keywords=${keywords}`, 
      {
        headers: {
          Data: JSON.stringify({
            collection,
            keywords,
            sort,
            userId: session.user.id,
          })
        },
      });

      const data = await response.json();
      onCardsChanged(data);
    };
  
    const handleColChange = event => {
      setCol(event.target.value)
    }

    const handleSearchChange = event => {
      setSearchKeywords(event.target.value);
    };
  
    const handleSortChange = event => {
      setSort(event.target.value)
    }

    return (
      <Box sx={{ m: 3 }}>
          <form>
            <TextField
                sx={{ m: 2 }}
                label="Keywords and tags"
                value={keywords}
                onChange={handleSearchChange}
            />
            <FormControl sx={{ m: 2, minWidth: '200px' }}>
              <InputLabel id="collection-select-label">Collection</InputLabel>
              <Select
                labelId="collection-select-label"
                id="collection-select"
                value={collection}
                label="Collection"
                onChange={handleColChange}
              >
                {cols.sort((a, b) => a.id.localeCompare(b.id)).map(col => (<MenuItem value={col.id}>{col.name}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: '200px' }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sort}
                label="Sort by"
                onChange={handleSortChange}
              >
                <MenuItem value={'obtained-desc'}>{'Obtained (newest first)'}</MenuItem>
                <MenuItem value={'obtained-asc'}>{'Obtained (oldest first)'}</MenuItem>
                <MenuItem value={'name-asc'}>{'Name (A->Z)'}</MenuItem>
                <MenuItem value={'name-desc'}>{'Name (Z->A)'}</MenuItem>
                <MenuItem value={'stars-desc'}>{'Rarity (5->1)'}</MenuItem>
                <MenuItem value={'stars-asc'}>{'Rarity (1->5)'}</MenuItem>
                <MenuItem value={'amount-desc'}>{'Amount Owned (Bigger first)'}</MenuItem>
                <MenuItem value={'amount-asc'}>{'Amount Owned (Lower first)'}</MenuItem>
                {/* <MenuItem value={'evalDesc'}>{'Price (Higher first)'}</MenuItem>
                <MenuItem value={'evalAsc'}>{'Price (Lower first)'}</MenuItem> */}
                <MenuItem value={'rating-desc'}>{'Rating (Higher first)'}</MenuItem>
                <MenuItem value={'rating-asc'}>{'Rating (Lower first)'}</MenuItem>
              </Select>
            </FormControl>
          </form>
      </Box>
    )
  }
  
  export default CardForm