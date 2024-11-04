import './Rating.css'
import {useEffect, useState} from 'react'
import {Slider, Typography, Box, Grid} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {filterItems,  setRatingRange} from "../../redux/actions";
import {data} from "../../db/data";
import useDebounce from "../../Hooks/useDebounce";

function Rating () {
    const dispatch = useDispatch()
    const {minRating , maxRating} = useSelector(state => state.search)
    const [changeRating, setRatingRangeLocale] = useState([minRating, maxRating]);
    const debouncedRatingRange = useDebounce(changeRating, 500)

    useEffect(() => {
        dispatch(setRatingRange(debouncedRatingRange[0], debouncedRatingRange[1]))
        dispatch(filterItems(data));
    }, [debouncedRatingRange, dispatch]);

    const handleChange = (event, newValue) => {
        setRatingRangeLocale(newValue);
        dispatch(setRatingRange(newValue[0], newValue[1]));
    };
    return (
        <Grid container mb={5} spacing={2} justifyContent="center">
            <Grid item xs={8} sm={8} md={8} lg={8}>
                <Box sx={{ width: '100%', margin: '0 auto' }}>
                    <Typography  sx={{ fontSize: { xs: '15px', md: '22px', lg: '15px' }, fontWeight: 600 , textAlign: 'center' }}
                                 variant="h6" gutterBottom
                    >
                        Rating Range
                    </Typography>
                    <Slider
                        value={changeRating}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={1}
                        max={5}
                        step={0.1}
                    />
                    <Typography  variant="body1"  sx={{ fontSize: '12px' }}>
                        Rating: ${changeRating[0]} - ${changeRating[1]}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export  default  Rating
