import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
//import { useDispatch } from 'react-redux'
//import { FILTER_PRODUCTS } from '../redux/features/Filter/filterSlice'

const Search = ({ value, onChange}) => {

  
  return (
    <>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel >Search</InputLabel>
                <OutlinedInput
                  onChange={onChange}
                  value={value}
                  endAdornment={
                    <InputAdornment position="end">
                        
                        <IconButton>
                            <FaSearch />
                        </IconButton>
                    </InputAdornment>
                  }
                  label="Search"
                />
              </FormControl>
    </>
  )
}

export default Search
