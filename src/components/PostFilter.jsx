import React from 'react';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

function PostFilter({ filter, setFilter }) {
    return (
        <div>
        <MyInput 
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder="Search..."
        />
        <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Sorting"
            options={[
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By content'}
            ]}
        />
    </div>
    );
}

export default PostFilter;
