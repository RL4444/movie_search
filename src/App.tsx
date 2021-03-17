import React, { useState, FC, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

import { Layout, Title } from './styled/index';

import MovieList from './components/MovieList';
import Searchbar from './components/Searchbar';
import Spinner from './components/Spinner';

const App: FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        // creates a boolean that will restrict api from being called too often
        if (isTyping) return;
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    };

    const clearSearchBar = () => setSearchTerm('');

    return (
        <Layout>
            <Title>MOVIEBOOK</Title>
            <Searchbar searchTerm={searchTerm} clear={clearSearchBar} change={handleChange} />
            {searchTerm.length > 0 && !isTyping && <MovieList searchTerm={searchTerm} />}
            {isTyping && searchTerm.length > 0 && (
                <div className='mt-2'>
                    <Spinner />
                </div>
            )}
        </Layout>
    );
};

export default App;
