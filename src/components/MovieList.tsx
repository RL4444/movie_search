import React, { FC, ReactElement, useState } from 'react';
import styled from 'styled-components';

import useApi from '../hooks/useApi';

import Spinner from './Spinner';
import Movie from './Movie';

import { IApiResponse } from '../types/movie';

interface IListProps {
    searchTerm: string;
}

const SearchTermText = styled.p`
    margin-top: 2em;
    margin-bottom: 1em;
    font-size: 22px;
    font-family: ${(p) => p.theme.fonts.title};
    color: ${(p) => p.theme.colors.white};
    text-align: left;
`;

const List: FC<IListProps> = ({ searchTerm }) => {
    const { response, error, loading }: IApiResponse = useApi(searchTerm);

    return (
        <>
            <SearchTermText>
                {error ? `We could not find anything that matched ${searchTerm}` : `Results for "${searchTerm}"`}
            </SearchTermText>
            {!error &&
                !loading &&
                response?.Search &&
                response.Search.map(({ Poster, Title, Type, Year, imdbID }) => {
                    return <Movie key={imdbID} Poster={Poster} Title={Title} Type={Type} Year={Year} imdbID={imdbID} />;
                })}
        </>
    );
};

export default List;