//--

import React from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import MDBox from "components/MDBox";
import MDButton from 'components/MDButton';
import MDTypography from "components/MDTypography";

import CardList from 'Lists/CardList';
import CardForm from 'CardForm'


function CardView({collections, userId, useWishlist}) {
  const [cards, setCards] = React.useState([])
  //const [collections, setCollections] = React.useState(props.cols)
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState({});

  const onQueryChanged = (newQuery) => {
    fetchCards(newQuery, 1)
  }

  const fetchCards = async (currentQuery, page) => {
    const response = await fetch(`/api/cards?collection=${currentQuery.collection}&keywords=${currentQuery.keywords}`, 
    {
      headers: {
        Data: JSON.stringify({
          collection: currentQuery.collection,
          keywords: currentQuery.keywords,
          sort: currentQuery.sort,
          page,
          userId,
          useWishlist,
        })
      },
    });

    const data = await response.json();

    if(page == 1) {
      setCards(data.cards)
    }
    else {
      setCards([...cards, ...data.cards])
    }

    console.log(data.cards.length)
    setQuery(currentQuery)
    setPage(page)
  };

  return (
    <MDBox p={2}>
      <CardForm cols={collections} onQueryChanged={onQueryChanged}/>
      <CardList cards={cards} cols={collections}/>
      <MDBox p={2}></MDBox>
      <MDBox m={2} textAlign='center'>
        <Button onClick={() => fetchCards(query, page + 1)}>
          Load more
        </Button>
      </MDBox>
    </MDBox>
  )
}

export default CardView
