import React from 'react'
import MainContainer from '../../components/mainContainer/MainContainer'
import Navbar from '../../components/navbar/Navbar'
import SearchBar from '../../components/searchBar/SearchBar'
import './home.css'
export default function Home() {
    return (
        <div className="home">
            <Navbar/>
            <SearchBar/>
            <MainContainer/>
        </div>
    )
}
