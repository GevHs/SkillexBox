import { brand } from '../../constat/brand';
import './Brand.css';
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { filterItems, handleChangeRadio } from "../../redux/actions";
import {useCallback, useEffect} from "react";
import { data } from "../../db/data";
import useDebounce from "../../Hooks/useDebounce";

function Brand() {
    const dispatch = useDispatch();
    const { selectedBrands } = useSelector((state) => state.search);
    const debouncedBrands = useDebounce(selectedBrands, 500);

    const updateItems = useCallback(() => {
        dispatch(filterItems(data));
    }, [dispatch]);

    useEffect(() => {
        updateItems();
    }, [debouncedBrands, selectedBrands]);


    const handleRadioChange = (e, type) => {
        dispatch(handleChangeRadio(e, type));
    };

    return (
        <div className='brand-container'>
            <h4 className='brand-container-title'>Brand</h4>
            {brand.map((item) => (
                <Input
                    key={item.id}
                    labelId={item.id}
                    name={item.brand}
                    value={item.brand}
                    handleChangeRadio={handleRadioChange}
                    checked={selectedBrands.includes(item.brand)}
                    all={selectedBrands.length === 0 && item.brand === 'All'}
                    type={'brand'}
                />
            ))}
        </div>
    );
}

export default Brand;
