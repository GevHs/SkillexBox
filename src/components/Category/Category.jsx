import { categories } from '../../constat/category';
import './Category.css';
import Input from "../Input/Input";
import {filterItems, handleChangeRadio} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {data} from "../../db/data";
import useDebounce from "../../Hooks/useDebounce";

function Category() {
    const dispatch = useDispatch()
    const {selectedCategories} = useSelector((state) => state.search);
    const debouncedCategories= useDebounce(selectedCategories, 500)

    useEffect(() => {
        dispatch(filterItems(data));
    }, [ debouncedCategories, selectedCategories ,dispatch]);

    const handleRadioChange = (e, type) => {
        dispatch(handleChangeRadio(e, type));
    };

    return (
        <div className='categories-container'>
            <h4 className='categories-container-title'>categories</h4>
            {categories.map((item) => (
                <Input
                    handleChangeRadio={handleRadioChange}
                    key={item.id}
                    labelId={item.id}
                    name={item.name}
                    value={item.name}
                    checked={selectedCategories.includes(item.name)}
                    all={selectedCategories.length === 0 && item.name === 'All'}
                    type={'category'}
                />
            ))}
        </div>
    );
}

export default Category;
