import React from 'react'
import { Outlet } from 'react-router-dom'
import { Section, Container } from './styles'
import NavBar from '../../components/NavBar'

const Layout = () => {
  return (
    <>
      <Container>
        <Section>
          <Outlet />
        </Section>
      </Container>
    </>
  )
}

export default Layout;
