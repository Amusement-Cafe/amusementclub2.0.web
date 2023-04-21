import React from 'react'

import { 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

import MDBox from "components/MDBox";
import MDInput from 'components/MDInput';
import MDTypography from "components/MDTypography";

const CardForm = ({cols, onQueryChanged}) => {
    const [collection, setCol] = React.useState('')
    const [sort, setSort] = React.useState('obtained-desc')
    const [keywords, setSearchKeywords] = React.useState('')

    React.useEffect(() => {
      onQueryChanged({collection, keywords, sort});
    }, [collection, keywords, sort]);
  
    const handleColChange = event => {
      setCol(event.target.value)
    }

    const handleSearchChange = event => {
      setSearchKeywords(event.target.value);
    };
  
    const handleSortChange = event => {
      setSort(event.target.value)
    }

    if (!cols) return (
      <MDBox sx={{ alignItems: 'stretch' }}>
        <MDBox m={2}/>
        <CircularProgress />
      </MDBox>
    )

    return (
      <MDBox sx={{ alignItems: 'stretch' }}>
        <MDBox m={2}/>
          <form>
            <MDInput
                sx={{ m: 2, minWidth: '250px' }}
                label="Keywords and tags"
                value={keywords}
                onChange={handleSearchChange}
            />
            <FormControl sx={{ m: 2, minWidth: '250px' }}>
              <InputLabel id="collection-select-label">
                <MDTypography variant="text">Collection</MDTypography>
              </InputLabel>
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
            <FormControl sx={{ m: 2, minWidth: '250px' }}>
              <InputLabel id="sort-label">
                <MDTypography variant="text">Sort by</MDTypography>
              </InputLabel>
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
          <MDBox m={2}/>
      </MDBox>
    )
  }
  
  export default CardForm