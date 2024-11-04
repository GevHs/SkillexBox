import './Price.css'
import {useEffect, useState} from 'react'
import {Slider, Typography, Box, Grid} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {filterItems, setPriceRange} from "../../redux/actions";
import {data} from "../../db/data";
import useDebounce from "../../Hooks/useDebounce";

function Price() {

    const dispatch = useDispatch()
    const {minPrice , maxPrice} = useSelector(state => state.search)
    const [priceRange, setPriceRangeLocal] = useState([minPrice, maxPrice]);

    const debouncedPriceRange = useDebounce(priceRange, 500)

    useEffect(() => {
        dispatch(setPriceRange(debouncedPriceRange[0], debouncedPriceRange[1]))
        dispatch(filterItems(data));
    }, [debouncedPriceRange, dispatch]);


    const handleChange = (event, newValue) => {
        setPriceRangeLocal(newValue);
        dispatch(setPriceRange(newValue[0], newValue[1]));
    };
    return (
        <Grid container mb={5} spacing={2} justifyContent="center">
            <Grid item xs={8} sm={8} md={8} lg={8}>
                <Box sx={{ width: '100%', margin: '0 auto' }}>
                    <Typography  sx={{ fontSize: { xs: '15px', md: '22px', lg: '15px' },
                                 fontWeight: 600 , textAlign: 'center'}}
                                 variant="h6" gutterBottom
                    >
                        Price Range
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        step={10}
                    />
                    <Typography  variant="body1"  sx={{ fontSize: '12px' }}>
                       Price: ${priceRange[0]} - ${priceRange[1]}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export  default  Price
